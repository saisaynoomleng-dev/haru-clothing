import * as z from 'zod';

// sanity product webhook
export const sanityProductWebhookPayload = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1),
  sku: z.string().min(1),
  slug: z.string().min(1),
  basePrice: z.coerce.number().min(1),
  imageUrl: z.url().startsWith('https://cdn.sanity.io/images/').min(1),
  stock: z.coerce.number().min(1),
  status: z.enum(['published', 'draft']),
  variants: z
    .array(
      z.object({
        sku: z.string().min(1),
        color: z.string().min(1),
        stock: z.coerce.number().min(1),
        priceOverride: z.coerce.number().min(1).nullable(),
        fit: z.string().nullable(),
        imageUrl: z.url().startsWith('https://cdn.sanity.io/images/').min(1),
        size: z.string().nullable(),
      }),
    )
    .nullable(),
});

// sanity career webhook
export const sanityCareerWebhookPayload = z.object({
  name: z.string().min(1),
  _id: z.string().min(1),
  slug: z.string().min(1),
});

// contact form schema
export const contactFormSchema = z.object({
  fullname: z.string().min(1, 'Full name should have at least 1 character'),
  email: z.email().min(1, 'Must be a valid email address'),
  subject: z.enum(['franchise', 'supplier']),
  message: z
    .string()
    .min(10, 'Message should contain at least 10 characters')
    .max(3000, 'Message character limit is 3000.'),
  phone: z.string().min(1, 'Phone Number must have at least 1 character'),
});
