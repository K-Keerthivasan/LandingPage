// app/fonts.ts
import { Poppins, Inter, Roboto } from 'next/font/google';

export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-poppins' });
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
