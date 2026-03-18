import {
  Html,
  Head,
  Body,
  Container,
  Tailwind,
  Text,
  Heading,
  Preview,
} from '@react-email/components';

export const NewsletterEmailTemplate = () => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                pink: '#f28482',
              },
            },
          },
        }}
      >
        <Body>
          <Preview>You&apos;ll be updated with our latest news!</Preview>

          <Container className="flex flex-col justify-center items-center">
            <Heading className="font-semibold">haru.</Heading>
            <Text>Thank you for your Subscription!</Text>
            <Text>Sai Sai Love Haru Forever!</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
