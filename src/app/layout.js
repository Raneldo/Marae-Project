import "./globals.css";

import Navbar from "@/components/nav/Navbar";
import FooterWrapper from "@/components/footer/FooterWrapper";
export const metadata = {
  title: "Marae Car Parks",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="__next">
          <Navbar />
          <main>{children}</main>
          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}
