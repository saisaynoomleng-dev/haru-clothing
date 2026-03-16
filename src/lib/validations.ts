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
