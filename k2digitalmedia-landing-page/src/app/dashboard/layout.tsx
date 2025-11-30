// app/dashboard/layout.tsx
import {redirect} from 'next/navigation';
import {createServerSupabase} from "@/app/lib/server";


export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    const supabase = await createServerSupabase();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    console.log('Supabase user:', user);

    if (!user) redirect('/login');

    return <>{children}</>;
}
