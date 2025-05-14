import { supabase } from './supabaseClient';

export const signInWithEmail = async (email: string, password: string, captchaToken: string) => {
    return await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
            captchaToken,
        },
    });
};

export const signOutUser = async () => {
    await supabase.auth.signOut();
};

export const getUserSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data?.session?.user ?? null;
};

