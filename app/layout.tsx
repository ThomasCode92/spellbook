import './globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}