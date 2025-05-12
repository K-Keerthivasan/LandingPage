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
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white px-4 sm:px-6 py-8 transition-colors">
            <div className="ml-[100px] max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Contact Messages</h1>
                        <p className="text-gray-600 dark:text-gray-400">Total Messages: {messages.length}</p>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white flex-grow sm:flex-grow-0 sm:w-64"
                        />
                        <Link href="/dashboard">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg shadow transition-colors whitespace-nowrap">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Dashboard
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Messages Table */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredMessages.map(msg => (
                                <tr
                                    key={msg.id}
                                    className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${selectedMessage?.id === msg.id ? 'bg-blue-50 dark:bg-gray-800' : ''}`}
                                    onClick={() => setSelectedMessage(msg)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900 dark:text-white">{msg.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                                        {msg.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                                        {msg.phone || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                                        {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDeletingMessageId(msg.id);
                                                setShowDeleteConfirm(true);
                                            }}
                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Message Detail Panel */}
                {selectedMessage && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Message Details</h2>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                                <p className="mt-1 text-gray-900 dark:text-white">{selectedMessage.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                                <p className="mt-1 text-gray-900 dark:text-white">{selectedMessage.email}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                                <p className="mt-1 text-gray-900 dark:text-white">{selectedMessage.phone || '-'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</h3>
                                <p className="mt-1 text-gray-900 dark:text-white">
                                    {selectedMessage.created_at ? new Date(selectedMessage.created_at).toLocaleString() : '-'}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Message</h3>
                            <div className="mt-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{selectedMessage.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {messages.length === 0 && !loading && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No messages yet</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">All contact form submissions will appear here.</p>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Deletion</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this message? This action cannot be undone.</p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}