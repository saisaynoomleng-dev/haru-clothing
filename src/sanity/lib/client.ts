import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';
import { env } from '@/lib/env/env.server';

const token = env.SANITY_READ_WRITE_TOKEN;

if (!token) {
  throw new Error('MISSING READ WRITE TOKEN');
}

export const client = createClient({
  projectId,
  token,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
