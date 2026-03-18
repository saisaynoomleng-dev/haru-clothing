'use client';

import Link from 'next/link';
import BrandLogo from './BrandLogo';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import SearchForm from './SearchForm';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';

const NAV_LINKS = [
  { name: 'Home', url: '/' },
  { name: 'Shop', url: '/shop' },
  { name: 'About Us', url: '/about-us' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contact Us', url: '/contact-us' },
  { name: 'Stores', url: '/stores' },
];

const Header = () => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <header className="px-3 py-4 md:px-5 lg:px-8 font-playfair shadow">
      {/* desktop view */}
      <div className="hidden md:flex flex-col gap-y-5">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <BrandLogo />
            </Link>
          </div>

          <SearchForm />
        </div>

        <div className="flex justify-between items-center">
          <nav
            className="flex gap-x-3 items-center"
            role="navigation"
            aria-label="Main Menu"
          >
            {NAV_LINKS.map((l) => (
              <Link
                href={l.url}
                key={l.url}
                className={clsx(
                  'hover:text-brand-pink-200/80',
                  l.url === pathname && 'font-bold text-brand-pink-200',
                )}
              >
                {l.name}
              </Link>
            ))}
          </nav>

          <div className="flex gap-x-3 items-center">{/* user detail */}</div>
        </div>
      </div>

      {/* mobile view */}
      <div className="md:hidden flex flex-col gap-y-5 relative">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <BrandLogo />
            </Link>
          </div>

          <button
            aria-label="Toggle Main Menu"
            onClick={() => setNavOpen((prevOpen) => !prevOpen)}
            className="cursor-pointer z-50"
          >
            <span>{navOpen ? <IoClose /> : <RxHamburgerMenu />}</span>
          </button>

          <nav
            className={clsx(
              'flex flex-col gap-x-3 items-center fixed inset-0 bg-brand-white z-30 transition-transform duration-200 pt-[10vh]',
              navOpen ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            {NAV_LINKS.map((l) => (
              <Link
                href={l.url}
                key={l.url}
                className={clsx(
                  'hover:text-brand-pink-200/80',
                  l.url === pathname && 'font-bold text-brand-pink-200',
                )}
              >
                {l.name}
              </Link>
            ))}

            <div className="flex justify-between items-center">
              <div className="flex gap-x-3 items-center">
                {/* user detail */}
              </div>
            </div>
          </nav>
        </div>

        <SearchForm />
      </div>
    </header>
  );
};

export default Header;
