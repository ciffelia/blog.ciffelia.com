import { NextSeo } from 'next-seo';
import { PRODUCTION_SITE_URL_BASE } from '@/config';

export const HomeHead: React.FC = () => (
  <NextSeo canonical={PRODUCTION_SITE_URL_BASE} />
);
