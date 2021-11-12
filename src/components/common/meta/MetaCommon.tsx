import Head from 'next/head';

export interface Props {
  title: string;
  description: string;
  path: string;
  modifiedAt?: Date;
  tags?: string[];
}

const MetaCommon: React.FC<Props> = ({
  title,
  description,
  path,
  modifiedAt,
  tags,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`https://blog.ciffelia.com${path}`} />
    {modifiedAt !== undefined && (
      <meta name="date" content={modifiedAt.toISOString()} />
    )}
    {tags !== undefined && <meta name="keywords" content={tags.join(',')} />}
  </Head>
);

export default MetaCommon;
