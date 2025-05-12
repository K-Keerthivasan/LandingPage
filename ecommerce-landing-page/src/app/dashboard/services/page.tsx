'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/components/backend/auth';
import { getAllServices, addService, updateService, deleteService } from '@/components/backend/service/servicesClient';
import ContentEditor, { ServicesContentEditorRef } from '@/components/backend/ContentEditor';
import Link from 'next/link';

type Service = {
    id: number;
    title: string;
    description: string;
    thumbnailURL: string;
    videoURL: string;
    route: string;
    type: 'image' | 'video';
    category: string;
    created_at?: string;
    content: string;
};

const CATEGORIES = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'video-production', label: 'Video Production' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'seo', label: 'SEO' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'marketing', label: 'Marketing' },
];

export default function ServicesWriteOnly() {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletingServiceId, setDeletingServiceId] = useState<number | null>(null);
    const editorRef = useRef<ServicesContentEditorRef>(null);

    const [form, setForm] = useState<Omit<Service, 'id' | 'created_at'>>({
        title: '',
        description: '',
        thumbnailURL: '',
        videoURL: '',
        route: '',
        type: 'image',
        category: 'web-development',
        content: '',
    });

    const handleDeleteConfirm = async () => {
        if (deletingServiceId === null) return;
        await deleteService(deletingServiceId);
        setShowDeleteConfirm(false);
        setDeletingServiceId(null);
        fetchData();
    };

    useEffect(() => {
        const init = async () => {
            const user = await getUserSession();
            if (!user) {
                router.push('/login');
                return;
            }

            const { data } = await getAllServices();
            if (data) setServices(data);
            setLoading(false);
        };
        init();
    }, [router]);

    const fetchData = async () => {
        const { data } = await getAllServices();
        if (data) setServices(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.description || !form.thumbnailURL || !form.category) {
            alert('Please fill all required fields.');
            return;
        }

        const html = editorRef.current?.getContent() || '';

        if (editingId) {
            await updateService(editingId, { ...form, content: html });
        } else {
            await addService({ ...form, content: html });
        }

        editorRef.current?.clearContent();
        setForm({
            title: '',
            description: '',
            thumbnailURL: '',
            videoURL: '',
            route: '',
            type: 'image',
            category: 'web-development',
            content: '',
        });
        setEditingId(null);
        fetchData();
    };

    const handleSelect = (id: number) => {
        const selected = services.find(s => s.id === id);
        if (selected) {
            setEditingId(id);
            setForm({
                title: selected.title,
                description: selected.description,
                thumbnailURL: selected.thumbnailURL,
                videoURL: selected.videoURL,
                route: selected.route,
                type: selected.type,
                category: selected.category || 'web-development',
                content: selected.content,
            });
        }
    };

    if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white px-6 py-8 transition-colors">
            <div className="ml-[100px] max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Services</h1>
                        <p className="text-gray-600 dark:text-gray-400">Total Services: {services.length}</p>
                    </div>
                    <Link href="/dashboard">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg shadow transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </button>
                    </Link>
                </div>

                {/* Services List */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {services.map(service => (
                                <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {service.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {CATEGORIES.find(cat => cat.value === service.category)?.label || service.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {service.type.charAt(0).toUpperCase() + service.type.slice(1)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleSelect(service.id)}
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                                title="Edit"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeletingServiceId(service.id);
                                                    setShowDeleteConfirm(true);
                                                }}
                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                                                title="Delete"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add/Edit Form */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                        {editingId ? 'Edit Service' : 'Add New Service'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                                <input
                                    type="text"
                                    placeholder="Service title"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                                <select
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    required
                                >
                                    {CATEGORIES.map(category => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thumbnail URL *</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    value={form.thumbnailURL}
                                    onChange={e => setForm({ ...form, thumbnailURL: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video URL (optional)</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/video.mp4"
                                    value={form.videoURL}
                                    onChange={e => setForm({ ...form, videoURL: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Route *</label>
                                <input
                                    type="text"
                                    placeholder="/services/service-name"
                                    value={form.route}
                                    onChange={e => setForm({ ...form, route: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
                                <select
                                    value={form.type}
                                    onChange={e => setForm({ ...form, type: e.target.value as 'image' | 'video' })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                    required
                                >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                            <textarea
                                placeholder="Brief service description"
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                rows={3}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
                            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                                <ContentEditor
                                    ref={editorRef}
                                    content={form.content || ''}
                                    key={editingId || 'new'}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <div>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForm({
                                                title: '',
                                                description: '',
                                                thumbnailURL: '',
                                                videoURL: '',
                                                route: '',
                                                type: 'image',
                                                category: 'web-development',
                                                content: '',
                                            });
                                            setEditingId(null);
                                            editorRef.current?.clearContent();
                                        }}
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors"
                            >
                                {editingId ? 'Update Service' : 'Add Service'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Deletion</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this service? This action cannot be undone.</p>
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
        </main>
    );
}