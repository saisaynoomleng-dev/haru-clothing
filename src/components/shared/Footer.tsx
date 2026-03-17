import {
  CiFacebook,
  CiInstagram,
  CiLinkedin,
  CiTwitter,
  CiYoutube,
} from 'react-icons/ci';
import BrandLogo from './BrandLogo';
import Link from 'next/link';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com',
    element: <CiFacebook />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com',
    element: <CiInstagram />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com',
    element: <CiLinkedin />,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com',
    element: <CiYoutube />,
  },
  {
    name: 'Twitter',
    url: 'https://www.twitter.com',
    element: <CiTwitter />,
  },
];

const COMPANY_LINKS = [
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/about-us' },
  { name: 'Blog', url: '/blog' },
  { name: 'Contact Us', url: '/contact-us' },
];

const USEFUL_LINKS = [
  { name: 'Career', url: '/career' },
  { name: 'FAQs', url: '/faq' },
  { name: 'Stores', url: '/stores' },
  { name: 'Author', url: '/author' },
];

const INFORMATION_LINKS = [
  { name: 'Accessibility', url: '/accessibility-accessment' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
  { name: 'Return Policy', url: '/return-policy' },
  { name: 'Terms & Conditions', url: '/terms-and-conditions' },
];

const Footer = () => {
  return (
    <footer className="grid md:grid-cols-2 lg:grid-cols-4 gap-3  bg-brand-pink-100 p-5 text-fs-300">
      <div className="flex flex-col gap-y-3">
        <div>
          <BrandLogo />
        </div>
        <p>
          Premium apparel defined by Japanese textile heritage and functional
          utility. Quality without compromise.
        </p>
        <div className="flex gap-x-2">
          {SOCIAL_LINKS.map((s) => (
            <Link
              href={s.url}
              key={s.name}
              className="p-1 border border-brand-black rounded-full group  hover:bg-brand-black"
            >
              <span className="group-hover:text-brand-white">{s.element}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        <p className="font-semibold text-fs-400">Company</p>
        <div className="flex flex-col gap-y-2">
          {COMPANY_LINKS.map((l) => (
            <Link
              href={l.url}
              key={l.url}
              className="hover:underline underline-offset-4"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        <p className="font-semibold text-fs-400">Useful Links</p>
        <div className="flex flex-col gap-y-2">
          {USEFUL_LINKS.map((l) => (
            <Link
              href={l.url}
              key={l.url}
              className="hover:underline underline-offset-4"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        <p className="font-semibold text-fs-400">Our Information</p>
        <div className="flex flex-col gap-y-2">
          {INFORMATION_LINKS.map((l) => (
            <Link
              href={l.url}
              key={l.url}
              className="hover:underline underline-offset-4"
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="divider col-span-full" />

      <div className="col-span-full flex flex-col place-self-end md:place-self-auto md:flex-row md:justify-between">
        <p>
          Copyright&copy;{new Date().getFullYear()} Haru Clothing. All right
          reserved.
        </p>
        <p>Designed & developed by Sai Say Noom Leng</p>
      </div>
    </footer>
  );
};

export default Footer;
