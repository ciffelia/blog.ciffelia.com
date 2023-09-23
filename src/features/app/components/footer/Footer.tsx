import { Quicksand } from '@next/font/google';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
});

export const Footer: React.FC = () => (
  <footer
    className={`p-10 text-center ${quicksand.className} text-2xl text-gray-50 opacity-80`}
  >
    <p>Copyright (c) 2021-2023 Ciffelia</p>
  </footer>
);
