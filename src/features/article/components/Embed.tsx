import { EmbedData } from '../types/EmbedData';

export interface EmbedProps {
  data: EmbedData;
}

export const Embed: React.FC<EmbedProps> = ({ data }) => (
  <span>{JSON.stringify(data, null, '  ')}</span>
);
