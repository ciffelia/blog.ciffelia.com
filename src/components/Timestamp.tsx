import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export interface TimestampProps {
  value: Date;
  dateOnly: boolean;
}

export const Timestamp: React.FC<TimestampProps> = ({ value, dateOnly }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  // Force "Asia/Tokyo" timezone on initial render
  const zonedDate = isInitialRender
    ? utcToZonedTime(value, 'Asia/Tokyo')
    : value;

  return (
    <time dateTime={value.toISOString()}>
      {format(zonedDate, dateOnly ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm')}
    </time>
  );
};
