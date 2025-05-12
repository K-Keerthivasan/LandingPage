import { supabase } from '../supabaseClient';

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
    return await supabase
        .from('our_works')
        .select('*')
        .order('created_at', { ascending: true });
};




export const addWork = async (work: WorkPayload) => {
    return await supabase.from('our_works').insert([work]).single();
};

export const updateWork = async (id: number, updates: Partial<WorkPayload>) => {
    return await supabase.from('our_works').update(updates).eq('id', id).single();
};

export const deleteWork = async (id: number) => {
    return await supabase.from('our_works').delete().eq('id', id);
};
