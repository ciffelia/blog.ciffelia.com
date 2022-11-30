import React from 'react';
import dynamic from 'next/dynamic';

const BackgroundInner = dynamic(async () => await import('./BackgroundInner'));

const Background: React.FC = () => (
  <div className="fixed inset-0 bg-blue-900" style={{ zIndex: -1 }}>
    <BackgroundInner />
  </div>
);

export default Background;
