import Head from 'next/head';

export type FluentEmojiImageProps = Omit<
  React.ComponentPropsWithoutRef<'img'>,
  'src'
> & {
  emoji: string;
};

export const FluentEmojiImage: React.FC<FluentEmojiImageProps> = ({
  emoji,
  ...props
}) => {
  const codePoints = [...emoji]
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((cp) => cp.codePointAt(0)!.toString(16))
    .join('-');

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://fluent-emoji.ciffelia.com"
          key="FluentEmojiImage_preconnect"
        />
      </Head>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://fluent-emoji.ciffelia.com/${codePoints}_color.svg`}
        alt={emoji}
        {...props}
      />
    </>
  );
};
