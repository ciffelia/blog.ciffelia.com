import { Quicksand } from '@next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME } from '@/config';
import ciffeliaIcon from '@/assets/ciffelia.png';
import homeIcon from '@/assets/home.svg';
import twitterIcon from '@/assets/twitter.svg';
import githubIcon from '@/assets/github.svg';
import zennIcon from '@/assets/zenn.svg';
import { SocialLink } from './SocialLink';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
});

export const Header: React.FC = () => (
  <header className="flex flex-col lg:flex-row items-center justify-between gap-y-4 px-16 py-6">
    <Link href="/" className="flex items-center gap-2 sm:gap-4">
      <Image
        src={ciffeliaIcon}
        alt=""
        className="w-12 h-12 sm:w-20 sm:h-20 max-w-none rounded-full"
        sizes="(min-width: 640px) 5rem, 3rem"
        priority
      />
      <span
        className={`${quicksand.className} text-4xl sm:text-5xl text-gray-50`}
      >
        {SITE_NAME}
      </span>
    </Link>
    <ul className="flex gap-x-4">
      <li>
        <SocialLink
          name="Home Page"
          url="https://ciffelia.com/"
          color="#3585ff"
          icon={homeIcon}
        />
      </li>
      <li>
        <SocialLink
          name="Twitter"
          url="https://twitter.com/ciffelia"
          color="#1da1f2"
          icon={twitterIcon}
        />
      </li>
      <li>
        <SocialLink
          name="GitHub"
          url="https://github.com/ciffelia"
          color="#231f20"
          icon={githubIcon}
        />
      </li>
      <li>
        <SocialLink
          name="Zenn"
          url="https://zenn.dev/ciffelia"
          color="#ffffff"
          icon={zennIcon}
        />
      </li>
    </ul>
  </header>
);
