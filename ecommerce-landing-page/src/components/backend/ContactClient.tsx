import { supabase } from './supabaseClient';

export type ContactMessage = {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at?: string;
};

export const getAllContactMessages = async () => {
    return await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
};

export const deleteContactMessage = async (id: number) => {
    return await supabase.from('contact_messages').delete().eq('id', id);
};
