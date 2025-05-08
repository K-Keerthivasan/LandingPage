'use client';

import { useProtectRoute } from '@/components/backend/protectRoute';
import { signOutUser } from '@/components/backend/auth';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function DashboardPage() {
    const { loading } = useProtectRoute();
    const router = useRouter();

    const handleLogout = async () => {
        await signOutUser();
        router.push('/login');
    };

    if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;

    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-20 transition-colors">
            <div className="max-w-7xl mx-auto relative ml-0 md:ml-[100px] transition-all">
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                    Logout
                </button>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-300 mb-4">Dashboard</h1>
                <div className="w-12 h-1 bg-gray-400 mb-6" />

                {/* Placeholder for Admin Actions */}
                <p className="text-lg leading-relaxed mb-10">
                    This dashboard allows you to edit and manage the content of your portfolio site. You’ll be able to add, edit, or
                    remove project cards, service sections, and more.
                </p>

                {/* Sections go here */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Link href="/dashboard/ourworks">
                            <button className="w-full text-left p-6 bg-gray-100 dark:bg-gray-800 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                <h2 className="text-xl font-semibold mb-2">OurWorks Manager</h2>
                                <p>Here you’ll be able to add, edit, and delete project cards.</p>
                            </button>
                        </Link>

                        <Link href="/dashboard/services">
                            <button className="w-full text-left p-6 bg-gray-100 dark:bg-gray-800 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                <h2 className="text-xl font-semibold mb-2">Services Editor</h2>
                                <p>Control and update your offered services dynamically.</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
