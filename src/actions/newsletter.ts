'use server';

import { NewsletterEmailTemplate } from '@/components/email-templates/NewsletterEmail';
import db from '@/db';
import { NewsletterSubscriptionTable } from '@/db/schema';
import resend from '@/lib/email';
import { PreviousFormProps } from '@/lib/types';
import { newsletterFormSchema } from '@/lib/validations';

export const handleNewsletter = async (
  prevState: PreviousFormProps,
  formData: FormData,
): Promise<PreviousFormProps> => {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const result = newsletterFormSchema.safeParse(rawData);

    if (!result.success) {
      const firstError = result.error.issues[0];

      return {
        success: false,
        message: firstError.message,
      };
    }

    const { email } = result.data;

    await db
      .insert(NewsletterSubscriptionTable)
      .values({ email })
      .onConflictDoNothing({ target: NewsletterSubscriptionTable.email });

    const emailRes = await resend.emails.send({
      from: `Haru Clothing <noreply@contact.snoomleng.com>`,
      to: [email],
      subject: `Newsletter Subscription!`,
      react: NewsletterEmailTemplate(),
    });

    if (emailRes.error) {
      console.log(`Email not sent`);
    } else {
      console.log(`Email sent`);
    }

    return {
      success: true,
      message: 'Thank you for your Subscription!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong! Try again later!',
    };
  }
};
