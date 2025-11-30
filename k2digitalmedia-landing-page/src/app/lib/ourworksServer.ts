import { createServerSupabase } from '@/app/lib/server';

export type Work = {
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

export type WorkPayload = Omit<Work, 'id' | 'created_at'>;

export const getAllWorks = async () => {
    const supabase = await createServerSupabase();
    return await supabase
        .from('our_works')
        .select('*')
        .order('created_at', { ascending: true });
};

export const getWorkBySlug = async (slug: string) => {
    const supabase = await createServerSupabase();
    return await supabase
        .from('our_works')
        .select('*')
        .eq('route', slug)
        .single();
};

export const addWork = async (work: WorkPayload) => {
    const supabase = await createServerSupabase();
    return await supabase.from('our_works').insert([work]).single();
};

export const updateWork = async (id: number, updates: Partial<WorkPayload>) => {
    const supabase = await createServerSupabase();
    return await supabase.from('our_works').update(updates).eq('id', id).single();
};

export const deleteWork = async (id: number) => {
    const supabase = await createServerSupabase();
    return await supabase.from('our_works').delete().eq('id', id);
};
