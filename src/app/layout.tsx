import "./globals.css";
import { DM_Sans } from 'next/font/google';

export const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-dm-sans', 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], 
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <html lang="en" className={dm_sans.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
