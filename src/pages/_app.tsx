import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="font-serif">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
