import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NZ Private Pilot Journey',
  description: 'Gamified progress tracking for your Private Pilot Licence journey in New Zealand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}