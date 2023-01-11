// The config cannot be re-exported from other files.
export const config = {
  runtime: 'experimental-edge',
};

export { handler as default } from '@/features/opengraph/api/article';
