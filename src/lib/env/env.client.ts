// @/lib/env/env.client.ts
import * as z from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().url(), // Fixed: z.string().url() is more robust
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
  NEXT_PUBLIC_REACT_MAPBOX_ACCESS_TOKEN: z.string().min(1),
});

// Use safeParse to avoid crashing the build if variables aren't injected yet
const _clientEnv = clientEnvSchema.safeParse({
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_REACT_MAPBOX_ACCESS_TOKEN:
    process.env.NEXT_PUBLIC_REACT_MAPBOX_ACCESS_TOKEN,
});

if (!_clientEnv.success) {
  console.error(
    '❌ Invalid Client Environment Variables:',
    _clientEnv.error.format(),
  );
  throw new Error('Invalid Client Environment Variables');
}

export const env = _clientEnv.data;
