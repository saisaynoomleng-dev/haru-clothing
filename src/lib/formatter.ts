import { randomBytes } from 'crypto';

export const formatTitle = (title: string) => {
  return title
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

export const skuGenerator = () => {
  const random = randomBytes(3).toString('hex').toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();

  return `SKU-${timestamp}-${random}`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
  }).format(price);
};
