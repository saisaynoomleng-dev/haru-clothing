export const formatTitle = (title: string) => {
  return title
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

export const skuGenerator = () => {
  return Math.random().toString(36).slice(2).toUpperCase();
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
  }).format(price);
};
