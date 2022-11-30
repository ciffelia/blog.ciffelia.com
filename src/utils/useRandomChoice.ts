import { useEffect, useState } from 'react';

function useRandomChoice<T>(candidate: readonly T[]): T | undefined {
  const [random, setRandom] = useState<number>();

  useEffect(() => {
    setRandom(Math.random());
  }, []);

  return random === undefined
    ? undefined
    : candidate[Math.floor(random * candidate.length)];
}

export { useRandomChoice };
