import Navigation from "@/components/Navigation";
import "./globals.css";

/*
  Global layout for all pages.
  Logic:
  - layout.tsx wraps all page.tsx files in the app router.
  - Navigation is placed here so every museum page shares the same tabs.
  Responsible: Your name here
*/

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                ></script>
            </head>
            <body>
                <Navigation />
                {children}
            </body>
        </html>
    );
}
