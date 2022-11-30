import Link from 'next/link';
import Image from 'next/legacy/image';
import { SITE_NAME } from '@/constants';
import ciffeliaIcon from '@/images/ciffelia.png';
import homeIcon from '@/images/home.svg';
import twitterIcon from '@/images/twitter.svg';
import githubIcon from '@/images/github.svg';
import zennIcon from '@/images/zenn.svg';
import SocialLink from './SocialLink';

const Header: React.VFC = () => (
  <header className="flex flex-col lg:flex-row items-center justify-between gap-y-4 px-16 py-6">
    <Link href="/" className="flex items-center gap-2 sm:gap-4">
      <div className="inline-block relative w-12 h-12 sm:w-20 sm:h-20">
        <Image
          src={ciffeliaIcon}
          alt=""
          layout="fill"
          sizes="5rem"
          className="rounded-full"
          priority
        />
      </div>
      <span className="font-quicksand text-4xl sm:text-5xl text-gray-50">
        {SITE_NAME}
      </span>
    </Link>
    <ul className="flex gap-x-4">
      <li>
        <SocialLink url="https://ciffelia.com/" color="#3585ff">
          <Image src={homeIcon} alt="Home Page" layout="fill" priority />
        </SocialLink>
      </li>
      <li>
        <SocialLink url="https://twitter.com/ciffelia" color="#1da1f2">
          <Image src={twitterIcon} alt="Twitter" layout="fill" priority />
        </SocialLink>
      </li>
      <li>
        <SocialLink url="https://github.com/ciffelia" color="#231f20">
          <Image src={githubIcon} alt="GitHub" layout="fill" priority />
        </SocialLink>
      </li>
      <li>
        <SocialLink url="https://zenn.dev/ciffelia" color="#ffffff">
          <Image src={zennIcon} alt="Zenn" layout="fill" priority />
        </SocialLink>
      </li>
    </ul>
  </header>
);

export default Header;
