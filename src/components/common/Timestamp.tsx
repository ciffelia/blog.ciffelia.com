import { format } from 'date-fns';

interface Props {
  value: Date;
  dateOnly: boolean;
}

const Timestamp: React.VFC<Props> = ({ value, dateOnly }) => (
  <time dateTime={value.toISOString()}>
    {format(value, dateOnly ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm')}
  </time>
);

export default Timestamp;
