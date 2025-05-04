import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

import '@fontsource/poppins'; // Defaults to weight 400
import '@fontsource/inter';   // Defaults to weight 400
import '@fontsource/roboto';  // Defaults to weight 400
import "@fontsource/cascadia-code/500-italic.css";


export const metadata = {
    title: 'Your App',
    description: 'Description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="bg-white dark:bg-black text-black dark:text-white">
        <ThemeProvider>
            {/* Full-height layout */}
            <div className="flex min-h-screen w-full">
                {/* Sidebar */}
                <Sidebar />

                {/* Main content area with footer */}
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
