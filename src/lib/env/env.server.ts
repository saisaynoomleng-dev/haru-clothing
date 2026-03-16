import * as z from 'zod';

export const env = z
  .object({
    SANITY_STUDIO_DATASET: z.string().min(1),
    SANITY_STUDIO_PROJECT_ID: z.string().min(1),
    SANITY_READ_WRITE_TOKEN: z.string().min(1).startsWith('sk'),
    CLERK_SECRET_KEY: z.string().startsWith('sk_'),
    DATABASE_URL: z.string().startsWith('postgresql://'),
    SANITY_PRODUCT_WEBHOOK_SECRET: z.string().min(32),
    SANITY_CAREER_WEBHOOK_SECRET: z.string().min(32),
  })
  .parse(process.env);
