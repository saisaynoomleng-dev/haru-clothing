import localFont from 'next/font/local';

export const caveat = localFont({
  src: [
    {
      path: '../app/fonts/caveat/Caveat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/caveat/Caveat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../app/fonts/caveat/Caveat-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../app/fonts/caveat/Caveat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-caveat',
});

export const nunito = localFont({
  src: [
    {
      path: '../app/fonts/nunito/Nunito-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../app/fonts/nunito/Nunito-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../app/fonts/nunito/Nunito-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/nunito/Nunito-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../app/fonts/nunito/Nunito-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../app/fonts/nunito/Nunito-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../app/fonts/nunito/Nunito-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../app/fonts/nunito/Nunito-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-nunito',
});

export const playfair = localFont({
  src: [
    {
      path: '../app/fonts/playfair/Playfair_9pt-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../app/fonts/playfair/Playfair_9pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../app/fonts/playfair/Playfair_9pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../app/fonts/playfair/Playfair_9pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../app/fonts/playfair/Playfair_9pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../app/fonts/playfair/Playfair_9pt-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../app/fonts/playfair/Playfair_9pt-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-playfair',
});
