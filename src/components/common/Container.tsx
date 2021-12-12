import React from 'react';

export interface Props {
  children: React.ReactNode;
}

const Container: React.VFC<Props> = ({ children }) => {
  return (
    <div className="w-screen max-w-screen-md md:mx-auto md:rounded-2xl p-7 md:p-10 bg-gray-50 shadow-lg shadow-white/10">
      {children}
    </div>
  );
};

export default Container;
