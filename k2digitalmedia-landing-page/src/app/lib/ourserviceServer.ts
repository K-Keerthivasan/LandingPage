// components/backend/service/servicesServer.ts
import { createServerSupabase } from '@/app/lib/server'; // your server-side Supabase helper

export type Service = {
    id: number;
    title: string;
    description: string;
    thumbnailURL: string;
    videoURL: string;
    type: 'image' | 'video';
    route: string;
    content: string;
    created_at?: string;
};

export type ServicePayload = Omit<Service, 'id' | 'created_at'>;

export const getAllServices = async () => {
    const supabase = await createServerSupabase(); // ✅ ADD AWAIT
    return await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
};

export const getServiceBySlug = async (slug: string) => {
    const supabase = await createServerSupabase(); // ✅ ADD AWAIT
    return await supabase
        .from('services')
        .select('*')
        .eq('route', slug)
        .single();
};

