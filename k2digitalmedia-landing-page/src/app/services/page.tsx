import ServiceSection from "@/components/Home/ServiceSection";

export const metadata = {
    title: 'Services | K2Digital Media',
    description:
        'Explore our range of services — from website development and digital marketing to video editing and visual effects. We help brands grow online.',
    alternates: {
        canonical: 'https://k2digitalmedia.ca/services',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function Services() {
    return (
        <div className="pl-0 md:pl-16">

            <ServiceSection />

        </div>
    );
}
