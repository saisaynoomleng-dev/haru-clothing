import {
  Html,
  Head,
  Preview,
  Container,
  Body,
  Section,
  Text,
  Heading,
  Tailwind,
} from '@react-email/components';

export const ContactUsEmailTemplate = (fullName: string, email: string) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                blue: '#84a59d',
              },
            },
          },
        }}
      >
        <Body>
          <Preview>Your message has reached us!</Preview>
          <Container className="max-w-120 mx-auto pt-5 pb-12 px-0">
            <Heading className="font-caveat font-semibold">haru.</Heading>
            <Section>
              <Text className="font-semibold">
                We&apos;s recevied your message {fullName}!{' '}
              </Text>
              <Text>We&apos;ll be in touch with your email {email}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
