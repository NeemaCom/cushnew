export const metadata = {
  title: "Global Payment Platform",
  description: "A global payment solution",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
