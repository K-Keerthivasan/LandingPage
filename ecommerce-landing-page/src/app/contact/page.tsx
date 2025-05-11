import ContactPageSection from "@/components/Shared/ContactPageSection";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope, FaBriefcase } from 'react-icons/fa';

export default function Contact() {
    return (
        <div className="pl-0 md:pl-16">


            <ContactPageSection/>
            <section className="w-full px-4 md:px-16 pt-8 pb-20 bg-white dark:bg-black text-black dark:text-white transition-colors">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                    {/* Services Summary */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">
                                What I Can Help You With
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-300">
                                <li>💻 Web Development – Portfolio, Blogs, E-commerce</li>
                                <li>🎬 Video Editing & VFX – Commercials, Shorts, Reels</li>
                                <li>🎨 Graphic Design – Posters, Thumbnails, Branding</li>
                                <li>📈 Digital Marketing – SEO, Campaigns, Social Ads</li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Links & Testimonials */}
                    <div className="flex flex-col gap-8 items-center text-center md:items-start md:text-left md:pl-8 lg:pl-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">
                                Find Me On
                            </h3>
                            <div className="flex flex-col gap-3 text-sm">
                                <Link
                                    href="https://linkedin.com/in/yourusername"
                                    target="_blank"
                                    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                                >
                                    <FaLinkedin className="w-4 h-4" />
                                    LinkedIn
                                </Link>
                                <Link
                                    href="https://upwork.com/freelancers/yourid"
                                    target="_blank"
                                    className="flex items-center gap-2 hover:text-green-400 transition-colors"
                                >
                                    <FaBriefcase className="w-4 h-4" />
                                    Upwork
                                </Link>
                                <Link
                                    href="https://github.com/yourusername"
                                    target="_blank"
                                    className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                                >
                                    <FaGithub className="w-4 h-4" />
                                    GitHub
                                </Link>
                                <Link
                                    href="mailto:kkvasan99@gmail.com"
                                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                                >
                                    <FaEnvelope className="w-4 h-4" />
                                    Email
                                </Link>
                            </div>
                        </div>

                      {/*  <div>
                            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
                                What Clients Say
                            </h3>
                            <blockquote className="italic border-l-4 border-yellow-400 pl-4 text-sm text-gray-700 dark:text-gray-300">
                                “Keerthi created an amazing motion edit for our product video. Fast turnaround and top-notch quality!”
                            </blockquote>
                        </div>*/}
                    </div>
                </div>
            </section>

        </div>
    );
}
