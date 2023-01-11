import { format } from 'date-fns';

export interface TimestampProps {
  value: Date;
  dateOnly: boolean;
}

export const Timestamp: React.FC<TimestampProps> = ({ value, dateOnly }) => (
  <time dateTime={value.toISOString()}>
    {format(value, dateOnly ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm')}
  </time>
);
