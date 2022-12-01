import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const BackgroundInner = dynamic(async () => await import('./BackgroundInner'), {
  suspense: true,
});

const Background: React.FC = () => (
  <div className="-z-10 fixed inset-0 bg-blue-900">
    <Suspense>
      <FadeIn>
        <BackgroundInner />
      </FadeIn>
    </Suspense>
  </div>
);

const FadeIn: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

export default Background;
