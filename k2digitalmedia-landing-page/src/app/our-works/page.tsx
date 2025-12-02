// app/our-works/page.tsx (SERVER)
import { createStaticSupabase } from '@/app/lib/static-supabase';
import OurWorksSection from './OurWorksSection';

// Revalidate every hour so bots get stable HTML, but it stays fresh
export const revalidate = 3600;

export default async function WorksIndexPage() {
    const supabase = createStaticSupabase();
    // IMPORTANT: your table is underscore in other files
    const { data: works, error } = await supabase
        .from('our-works')
        .select('id, title, description, thumbnailURL, videoURL, route, type, created_at, content, category')
        .order('created_at', { ascending: false });

    // Fail closed with minimal HTML so the page still renders server-side
    if (error || !works) {
        return (
            <main className="px-4 sm:px-6 lg:px-8 py-20 md:ml-16">
                <h1 className="text-3xl font-bold mb-6">Our Work</h1>
                <p>Projects are temporarily unavailable.</p>
            </main>
        );
    }

    // Pass pre-fetched data to the client component (renders links in initial HTML)
    return <OurWorksSection initialWorks={works} />;
}
