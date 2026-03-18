import { Resend } from 'resend';
import { env } from '../env/env.server';

const resend = new Resend(env.RESEND_API_KEY);

export default resend;
