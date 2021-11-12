import React from 'react';

export interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen max-w-screen-md lg:mx-auto p-10 lg:rounded-2xl bg-gray-50 filter drop-shadow-2xl">
      {children}
    </div>
  );
};

export default Container;
