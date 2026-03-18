'use server';

import { ContactUsEmailTemplate } from '@/components/email-templates/ContactUsEmail';
import db from '@/db';
import { ContactTable } from '@/db/schema';
import resend from '@/lib/email';
import { PreviousFormProps } from '@/lib/types';
import { contactFormSchema } from '@/lib/validations';

export const handleContactForm = async (
  prevState: PreviousFormProps,
  formData: FormData,
): Promise<PreviousFormProps> => {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const result = contactFormSchema.safeParse(rawData);

    if (!result.success) {
      const firstError = result.error.issues[0];

      return {
        success: false,
        message: firstError.message,
        field: firstError.path[0] as string,
      };
    }

    const { fullname, email, subject, message, phone } = result.data;

    await db.insert(ContactTable).values({
      fullName: fullname,
      email,
      subject,
      message,
      phone,
    });

    const emailRes = await resend.emails.send({
      from: 'Haru Clothing <noreply@contact.snoomleng.com>',
      to: [email],
      subject: `Reply to Haru Clothing: ${subject}`,
      react: ContactUsEmailTemplate(fullname, email),
    });

    if (emailRes.error) {
      console.log(`Email not Sent`);
    } else {
      console.log(`Email sent`);
    }

    return {
      success: true,
      message: "Thank you for contacting us! We'll be in touch shortly!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong! Try again!',
    };
  }
};
