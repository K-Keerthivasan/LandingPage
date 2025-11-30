'use client';

import { useRouter } from 'next/navigation';
import { signOutUser } from '@/components/backend/auth';
import Link from 'next/link';

export default function DashboardClient() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOutUser();
        router.push('/login');
    };

    return (
        <main className="min-h-screen px-6 py-20 bg-white dark:bg-black text-black dark:text-white">
            <div className="relative ml-0 md:ml-[100px] max-w-7xl mx-auto">
                <button
                    onClick={handleLogout}
                    className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

                <h1 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-300 mb-4">
                    Dashboard
                </h1>
                <div className="w-12 h-1 bg-gray-400 mb-6" />

                <p className="text-lg mb-10">
                    This dashboard allows you to edit and manage your portfolio site.
                </p>

                <div className="space-y-4">
                    <Link href="/dashboard/our-works">
                        <button className="w-full text-left p-6 bg-gray-100 dark:bg-gray-800 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <h2 className="text-xl font-semibold mb-2">OurWorks Manager</h2>
                            <p>Add, edit, and delete project cards.</p>
                        </button>
                    </Link>

                    <Link href="/dashboard/services">
                        <button className="w-full text-left p-6 bg-gray-100 dark:bg-gray-800 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <h2 className="text-xl font-semibold mb-2">Services Editor</h2>
                            <p>Update services dynamically.</p>
                        </button>
                    </Link>

                    <Link href="/dashboard/contact">
                        <button className="w-full text-left p-6 bg-gray-100 dark:bg-gray-800 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
                            <p>Control and update contact info.</p>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
