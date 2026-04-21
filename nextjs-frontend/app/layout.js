import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import Link from 'next/link';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="vh-100 gradient-custom">
        {children}
      </body>
    </html>
  );
}



