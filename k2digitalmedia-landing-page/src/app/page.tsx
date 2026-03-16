import HomePage from "@/components/Home/Home";

export const metadata = {
    title: 'K2Digital Media | Freelance Web Development, VFX, and Editing Services',
    description:
        'K2Digital Media offers professional freelance services in web development, video editing, and VFX. Built for creators, startups, and businesses seeking digital excellence.',
    keywords: [
        'K2Digital Media',
        'Freelance Developer',
        'Web Design',
        'Next.js',
        'React',
        'VFX Artist',
        'Video Editing',
        'Photography',
        'Unreal Engine',
        'Resolve',
        'Nuke',
        'Digital Marketing',
        'Ontario',
        'Full Stack',
        'Supabase',
        'Firebase',
    ],
    openGraph: {
        title: 'K2Digital Media | Freelance Services Portfolio',
        description:
            'Explore modern web dev, VFX, and editing projects by Keerthi - powered by K2Digital Media.',
        url: 'https://k2digitalmedia.ca',
        siteName: 'K2Digital Media',
        images: [
            {
                url: '/Logo.png', // You already have this in public/
                width: 800,
                height: 800,
                alt: 'K2Digital Media Logo',
            },
        ],
        locale: 'en_CA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'K2Digital Media | Web, VFX & Editing Services',
        description:
            'Freelance portfolio of Keerthi - Full-Stack Developer, VFX Artist, and Editor.',
        images: ['/Logo.png'],
    },
};

export default function Home() {
    return (
        <div>
            <HomePage/>
        </div>
    );
}
