'use client';

import {
    FaFacebookF,
    FaInstagram,
    FaVimeoV,
    FaYoutube,
    FaLinkedinIn,
} from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-blue-900 dark:bg-gray-900 text-white dark:text-gray-100 py-10 px-6 md:px-20 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-sm px-6 md:px-12 lg:px-20 ml-0 md:ml-64">

                {/* 1. Tagline */}
                <div>
                    <h2 className="text-xl font-bold text-yellow-400 dark:text-yellow-300 mb-2">
                        Digital Marketing &<br />Web Development Agency
                    </h2>
                </div>

                {/* 2. Services */}
                <div className="space-y-1">
                    <p className="hover:underline">Contact</p>
                    <p className="hover:underline">Photography</p>
                    <p className="hover:underline">Digital Marketing</p>
                    <p className="hover:underline">Website Emergency Services</p>
                </div>

                <div className="space-y-1">
                    <p className="hover:underline">Web Development</p>
                    <p className="hover:underline">Video Production</p>
                    <p className="hover:underline">Search Engine Optimization</p>
                    <p className="hover:underline">Careers</p>
                </div>

                {/* 3. Certifications */}
                <div className="flex flex-col items-start gap-4">
                  {/*  <img
                        src="/google-partner.png"
                        alt="Google Partner"
                        className="w-24 border p-1 bg-white dark:bg-gray-200"
                    />
                    <img
                        src="/bigcommerce-partner.png"
                        alt="BigCommerce"
                        className="w-28 bg-white dark:bg-gray-200"
                    />*/}
                </div>

                {/* 4. Contact + Social */}
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-yellow-400 dark:text-yellow-300 font-semibold">Les Chat</h3>
                        <p>1-502-509-3349</p>
                    </div>

                    <div>
                        <h3 className="text-yellow-400 dark:text-yellow-300 font-semibold">Hatfield Media</h3>
                        <p>
                            2351 Nelson Miller Parkway<br />
                            Suite #100<br />
                            Louisville, KY 40223
                        </p>
                    </div>

                    <div>
                        <h3 className="text-yellow-400 dark:text-yellow-300 font-semibold mb-1">Social</h3>
                        <div className="flex space-x-3 text-lg">
                            <FaFacebookF className="hover:text-yellow-400 transition" />
                            <FaInstagram className="hover:text-yellow-400 transition" />
                            <FaVimeoV className="hover:text-yellow-400 transition" />
                            <FaYoutube className="hover:text-yellow-400 transition" />
                            <FaLinkedinIn className="hover:text-yellow-400 transition" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 text-xs text-center text-white/70 dark:text-gray-400">
                Site Info | Privacy Policy | Accessibility <br />
                © {new Date().getFullYear()} Your Company
            </div>
        </footer>
    );
}
