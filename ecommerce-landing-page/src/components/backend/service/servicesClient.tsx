import { supabase } from '../supabaseClient';

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
    return await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
};

export const addService = async (service: ServicePayload) => {
    return await supabase.from('services').insert([service]).single();
};

export const updateService = async (id: number, updates: Partial<ServicePayload>) => {
    return await supabase.from('services').update(updates).eq('id', id).single();
};

export const deleteService = async (id: number) => {
    return await supabase.from('services').delete().eq('id', id);
};
