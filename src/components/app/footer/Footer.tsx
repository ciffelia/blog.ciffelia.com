import { Quicksand } from '@next/font/google';

const quicksand = Quicksand({
  weight: '500',
});

const Footer: React.FC = () => (
  <footer
    className={`p-10 text-center ${quicksand.className} text-2xl text-gray-50 opacity-80`}
  >
    <p>Copyright (c) 2021 Ciffelia</p>
  </footer>
);

export default Footer;
