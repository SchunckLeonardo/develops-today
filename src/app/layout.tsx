import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevelopsToday',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-50 bg-background-car bg-cover bg-center bg-no-repeat">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
