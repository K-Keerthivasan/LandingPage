'use client';

import { useEffect, useState } from 'react';
import { getUserSession } from '@/components/backend/auth';
import { getAllContactMessages, deleteContactMessage } from '@/components/backend/ContactClient';
import Link from 'next/link';

type ContactMessage = {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at?: string;
};

export default function ContactMessagesAdmin() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletingMessageId, setDeletingMessageId] = useState<number | null>(null);

    useEffect(() => {
        const init = async () => {
            const user = await getUserSession();
            if (!user) {
                window.location.href = '/login';
                return;
            }
            const { data } = await getAllContactMessages();
            if (data) setMessages(data);
            setLoading(false);
        };
        init();
    }, []);

    const fetchData = async () => {
        const { data } = await getAllContactMessages();
        if (data) setMessages(data);
    };

    const handleDeleteConfirm = async () => {
        if (deletingMessageId === null) return;
        await deleteContactMessage(deletingMessageId);
        setShowDeleteConfirm(false);
        setDeletingMessageId(null);
        setSelectedMessage(null);
        fetchData();
    };

    const promptDelete = (id: number) => {
        setDeletingMessageId(id);
        setShowDeleteConfirm(true);
    };

    if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;

    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-20 transition-colors">
            <div className="max-w-7xl mx-auto ml-0 md:ml-[100px] transition-all">
                <Link href="/dashboard">
                    <button className="mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded shadow">
                        ← Back to Dashboard
                    </button>
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-300 mb-4">Contact Messages</h1>
                <div className="w-12 h-1 bg-gray-400 mb-8" />

                <div className="overflow-x-auto mb-10">
                    <table className="min-w-full text-left text-sm border rounded dark:border-gray-700">
                        <thead className="bg-gray-200 dark:bg-gray-800">
                        <tr>
                            <th className="px-4 py-2 font-semibold">Name</th>
                            <th className="px-4 py-2 font-semibold">Email</th>
                            <th className="px-4 py-2 font-semibold">Phone</th>
                            <th className="px-4 py-2 font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {messages.map(msg => (
                            <tr key={msg.id} className="border-t dark:border-gray-700">
                                <td className="px-4 py-2 cursor-pointer hover:underline" onClick={() => setSelectedMessage(msg)}>{msg.name}</td>
                                <td className="px-4 py-2">{msg.email}</td>
                                <td className="px-4 py-2">{msg.phone}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="text-red-600 dark:text-red-400 hover:underline"
                                        onClick={() => promptDelete(msg.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {selectedMessage && (
                    <div className="mb-10 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-md">
                        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-2">Selected Message</h2>
                        <p><strong>Name:</strong> {selectedMessage.name}</p>
                        <p><strong>Email:</strong> {selectedMessage.email}</p>
                        <p><strong>Phone:</strong> {selectedMessage.phone}</p>
                        <p><strong>Message:</strong> {selectedMessage.message}</p>
                        <button
                            onClick={() => setSelectedMessage(null)}
                            className="mt-4 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                        >
                            Close
                        </button>
                    </div>
                )}

                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm">
                            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                                Are you sure you want to delete this message?
                            </h3>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
