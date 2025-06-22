// components/backend/auth.ts
import { createBrowserSupabase } from '@/app/lib/client';

const supabase = createBrowserSupabase();

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
}

export async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    return { error };
}


export const getUserSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data?.session?.user ?? null;
};