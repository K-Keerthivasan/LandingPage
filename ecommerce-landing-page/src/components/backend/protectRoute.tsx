'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserSession } from './auth';

export const useProtectRoute = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = async () => {
            const user = await getUserSession();
            if (!user) router.push('/login');
            else setLoading(false);
        };
        check();
    }, [router]);

    return { loading };
};
