import React from "react";

import HeroVideoBanner from "@/components/Home/HeroVideoBanner";
import ServiceSection from "@/components/Home/ServiceSection";
import Link from "next/link";
import OurWorkSection from "@/components/Home/OurWorkSection";
import ContactPageSection from "@/components/Shared/ContactPageSection";

export default function HomePage() {
    return (
        <div>
            <HeroVideoBanner/>
            <div className="pl-0 md:pl-16">


                {/* Your content */}
                <ServiceSection/>



            <section className="px-6 py-20 bg-white dark:bg-black text-black dark:text-white transition-colors">
                <div className="max-w-4xl mx-auto">
                    <p className="text-yellow-500 font-semibold mb-2">Our Core</p>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-300 mb-4">
                        Strengthen Your Business
                    </h2>
                    <div className="w-12 h-1 bg-gray-400 mb-6"/>

                    <p className="mb-4 text-lg leading-relaxed">
                        As a full-service marketing agency, we serve clients throughout a variety of industries.
                        Always aiming for high-quality, we believe in measurable results.
                    </p>
                    <p className="mb-4 text-lg leading-relaxed">
                        We employ the latest technology to best understand how to impact your customers.
                        Only taking on one client per industry per region, we won’t help your competition.
                        Our goal is to help you build your business.
                    </p>

                    <Link
                        href="#about"
                        className="text-orange-500 font-medium hover:underline"
                    >
                        Get to know us a bit better
                    </Link>
                </div>
            </section>

            <OurWorkSection/>

                <ContactPageSection/>

            </div>
        </div>

    );
}