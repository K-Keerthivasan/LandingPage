'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/components/backend/supabaseClient';

export const useProtectRoute = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error || !session) {
                // No session found or an error occurred
                router.push('/login');
                return;
            }

            const now = Date.now();
            const expiry = (session.expires_at ?? 0) * 1000;

            if (now > expiry) {
                // Session has expired
                await supabase.auth.signOut();
                router.push('/login');
            } else {
                setLoading(false);
            }
        };

        checkSession();
    }, [router]);

    return { loading };
};
