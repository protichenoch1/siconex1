import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Siconex",
  description: "Modern Online Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
