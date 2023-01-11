import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="w-screen max-w-screen-md md:mx-auto md:rounded-2xl p-7 md:p-10 bg-gray-50 shadow-lg shadow-white/10">
    {children}
  </div>
);
