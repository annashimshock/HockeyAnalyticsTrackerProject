import "./globals.css";

export const metadata = {
  title: "Hockey Live Analytics Hub",
  description: "Real-time NHL analytics dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}