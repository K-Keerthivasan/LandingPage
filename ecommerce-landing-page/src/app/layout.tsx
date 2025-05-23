import './globals.css';
import { ThemeProvider } from '@/components/Shared/ThemeProvider';
import Footer from '@/components/Shared/Footer';
import ClientSidebarWrapper from '@/components/Shared/ClientSidebarWrapper';
import Script from 'next/script';
import '@fontsource/poppins';
import '@fontsource/inter';
import '@fontsource/roboto';
import "@fontsource/cascadia-code/500-italic.css";

export const metadata = {
    metadataBase: new URL('https://k2digitalmedia.ca'),
    title: {
        default: 'K2Digital Media',
        template: '%s | K2Digital Media',
    },
    description: 'Creative Web Design and Digital Media.',
    icons: {
        icon: '/Logo.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* ✅ Add Structured Data for Google to show logo */}
            <Script
                id="structured-data"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "K2Digital Media",
                        "url": "https://k2digitalmedia.ca",
                        "logo": "https://k2digitalmedia.ca/Logo.png"
                    }),
                }}
            />
            <meta property="og:image" content="https://k2digitalmedia.ca/Logo.png" />
            <meta name="twitter:image" content="https://k2digitalmedia.ca/Logo.png" />
        </head>
        <body className="bg-white dark:bg-black text-black dark:text-white">
        <ThemeProvider>
            <div className="flex min-h-screen w-full">
                <ClientSidebarWrapper />
                <div className="flex flex-col flex-1">
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
