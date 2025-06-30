import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Josh Ellman - Web Developer',
  description: 'Professional web developer creating exceptional digital experiences. Specializing in modern web technologies and user-focused design.',
  keywords: 'web developer, frontend developer, React, Next.js, TypeScript, web design',
  authors: [{ name: 'Josh Ellman' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Josh Ellman - Web Developer',
    description: 'Professional web developer creating exceptional digital experiences.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}