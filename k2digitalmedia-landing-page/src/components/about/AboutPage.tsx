'use client';


// Import the new sub-components
import AboutIntro from '@/components/about/AboutIntro';
import AboutJourney from '@/components/about/AboutJourney';
import AboutWhatIDo from '@/components/about/AboutWhatIDo';
import AboutToolkit from '@/components/about/AboutToolkit';
import AboutHowIWork from '@/components/about/AboutHowIWork';
import AboutCoreValues from '@/components/about/AboutCoreValues';
import AboutHobbies from '@/components/about/AboutHobbies';
import AboutResumeDownload from '@/components/about/AboutResumeDownload';
import AboutCallToAction from '@/components/about/AboutCallToAction';
import AboutSocialLinks from '@/components/about/AboutSocialLinks';
import React from 'react';
import { motion } from 'framer-motion'; // Still needed for the main wrapper animation if desired


export default function AboutPageSection() {
    return (
        <main className="px-6 pt-24 md:pt-32 pb-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 ease-in-out">
            {/* Optional: Wrap the main div with motion for a container animation */}
            <motion.div
                // variants={containerVariants}
                // initial="hidden"
                // animate="visible" // Use animate instead of whileInView for the main container
                className="max-w-6xl mx-auto space-y-20"
            >
                {/* Render the sub-components */}
                <AboutIntro />
                <AboutJourney />
                <AboutWhatIDo />
                <AboutToolkit />
                <AboutHowIWork />
                <AboutCoreValues />
                <AboutHobbies />
                <AboutResumeDownload />
                 {/* <AboutTestimonialSnippet /> */}
                <AboutCallToAction />
                <AboutSocialLinks />

            </motion.div>
            {/*
                Keep global styles here or move to a global CSS file.
                The wave animation for the hand emoji is defined in AboutIntro.tsx
                using <style jsx>, which is fine if you prefer component-scoped styles.
             */}
        </main>
    );
}
