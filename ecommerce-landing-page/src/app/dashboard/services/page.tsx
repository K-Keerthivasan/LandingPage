'use client';

import {useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import {getUserSession} from '@/components/backend/auth';
import {getAllServices, addService, updateService, deleteService} from '@/components/backend/services';

import ServicesContentEditor, { ServicesContentEditorRef } from "@/components/backend/service/ServicesContentEditor";
import Link from "next/link";


type Service = {
    id: number;
    title: string;
    description: string;
    thumbnailURL: string;
    videoURL: string;
    route: string;
    type: 'image' | 'video';
    created_at?: string;
    content: string;
};

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
        content: '',
    });


    const handleDeleteConfirm = async () => {
        if (deletingServiceId === null) return;
        await deleteService(deletingServiceId);
        setShowDeleteConfirm(false);
        setDeletingServiceId(null);
        fetchData();
    };

    const promptDelete = (id: number) => {
        setDeletingServiceId(id);
        setShowDeleteConfirm(true);
    };

    useEffect(() => {
        const init = async () => {
            const user = await getUserSession();
            if (!user) {
                router.push('/login');
                return;
            }

            const {data} = await getAllServices();
            if (data) setServices(data);
            setLoading(false);
        };
        init();
    }, [router]);

    const fetchData = async () => {
        const {data} = await getAllServices();
        if (data) setServices(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.description || !form.thumbnailURL) {
            alert('Please fill all required fields.');
            return;
        }

        const html = editorRef.current?.getContent() || '';

        if (editingId) {
            await updateService(editingId, { ...form, content: html });
        } else {
            await addService({ ...form, content: html });
        }

        editorRef.current?.clearContent(); // 🔄 clear AFTER submission
        setForm({
            title: '',
            description: '',
            thumbnailURL: '',
            videoURL: '',
            route: '',
            type: 'image',
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
                content: selected.content,
            });
        }
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

                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-300 mb-4">Manage
                    Services</h1>
                <div className="w-12 h-1 bg-gray-400 mb-8"/>

                <div className="overflow-x-auto mb-10">
                    <table className="min-w-full text-left text-sm border rounded dark:border-gray-700">
                        <thead className="bg-gray-200 dark:bg-gray-800">
                        <tr>
                            <th className="px-4 py-2 font-semibold">Title</th>
                            <th className="px-4 py-2 font-semibold">Type</th>
                            <th className="px-4 py-2 font-semibold">Route</th>
                            <th className="px-4 py-2 font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {services.map(service => (
                            <tr key={service.id} className="border-t dark:border-gray-700">
                                <td className="px-4 py-2">{service.title}</td>
                                <td className="px-4 py-2">{service.type}</td>
                                <td className="px-4 py-2">{service.route}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-4">
                                        <button
                                            className="text-blue-600 dark:text-blue-300 hover:underline"
                                            onClick={() => handleSelect(service.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 dark:text-red-400 hover:underline"
                                            onClick={() => promptDelete(service.id)}
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

                <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow space-y-4">
                    <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">
                        {editingId ? 'Edit Service' : 'Add New Service'}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={form.title}
                            onChange={e => setForm({...form, title: e.target.value})}
                            className="p-2 rounded border w-full dark:bg-gray-700"
                        />
                        <input
                            type="text"
                            placeholder="Thumbnail Image URL"
                            value={form.thumbnailURL}
                            onChange={e => setForm({...form, thumbnailURL: e.target.value})}
                            className="p-2 rounded border w-full dark:bg-gray-700"
                        />
                        <input
                            type="text"
                            placeholder="Video URL (optional)"
                            value={form.videoURL}
                            onChange={e => setForm({...form, videoURL: e.target.value})}
                            className="p-2 rounded border w-full dark:bg-gray-700"
                        />
                        <input
                            type="text"
                            placeholder="Route (e.g. /services/web)"
                            value={form.route}
                            onChange={e => setForm({...form, route: e.target.value})}
                            className="p-2 rounded border w-full dark:bg-gray-700"
                        />
                        <select
                            value={form.type}
                            onChange={e => setForm({...form, type: e.target.value as 'image' | 'video'})}
                            className="p-2 rounded border w-full dark:bg-gray-700"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>

                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                        className="w-full p-2 rounded border dark:bg-gray-700"
                        rows={4}
                    />

                    <label className="block font-semibold text-blue-800 dark:text-blue-200">Service Page Content</label>


                    <div className="bg-white dark:bg-gray-700 p-2 rounded border">
                        <ServicesContentEditor
                            ref={editorRef}
                            content={form.content || ''}
                            key={editingId || 'new'} // <-- Forces re-initialization on new edit
                        />

                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded"
                        >
                            {editingId ? 'Update Service' : 'Add Service'}
                        </button>
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
                                        content: '',
                                    });
                                    setEditingId(null);
                                }}
                                className="text-sm text-gray-500 hover:text-red-500"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                            Are you sure you want to delete this service?
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
        </main>
    );
}
