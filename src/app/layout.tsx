import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";

// Brand accent font is "Zuume Cut Bold" (licensed, not available on this
// machine). Anton is used as a bold condensed stand-in with a similar
// impact-headline feel. Swap in the real font file under /public/fonts and
// update this import once it's available.
const accentFont = Anton({
  variable: "--font-accent",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lanka Rowing League | Sri Lanka's Premier Franchise Rowing Competition",
  description:
    "The Lanka Rowing League (LRL) is Sri Lanka's first franchise-based rowing competition. Six franchises. Elite athletes. One championship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${accentFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-navy-950 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
