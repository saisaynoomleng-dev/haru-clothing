import { PiHeadphonesThin, PiPackageThin, PiWalletThin } from 'react-icons/pi';

const Banners = [
  {
    title: 'Free Shipping',
    text: 'Free shipping for order above $250',
    element: <PiPackageThin />,
  },
  {
    title: 'Flexible Payment',
    text: 'Multiple secure payment options',
    element: <PiWalletThin />,
  },
  {
    title: '24x7 Support',
    text: 'We Support online all days',
    element: <PiHeadphonesThin />,
  },
];

const Banner = () => {
  return (
    <div className="grid md:grid-cols-3 md:gap-x-3 gap-y-4 text-fs-300 items-center justify-center md:justify-start">
      {Banners.map((b) => (
        <div className="flex gap-x-2 items-center" key={b.title}>
          <div>
            <span className="text-fs-700">{b.element}</span>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">{b.title}</p>
            <p className="text-brand-black/50">{b.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
