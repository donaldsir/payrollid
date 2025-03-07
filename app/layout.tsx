// app/layout.tsx
import { Providers } from './providers'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payroll ID',
  description: 'Payroll Tax Indonesia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}