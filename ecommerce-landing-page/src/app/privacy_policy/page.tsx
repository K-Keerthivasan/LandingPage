// ./src/app/privacy_policy/page.tsx
import React from 'react';

const CombinedInfoPage = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            {/* Introduction for the combined page */}
            <h1 className="text-4xl font-bold mb-6 text-center  text-black dark:text-white">
                Your Trust & Our Expertise: Privacy and Services at K2 Digital Media
            </h1>
            <p className="text-lg text-black dark:text-white mb-10 text-center">
                At K2 Digital Media, we are committed to both safeguarding your privacy and providing exceptional digital solutions.
                This page outlines our commitment to your data security and details the comprehensive range of services we offer
                to help your business thrive online.
            </p>

            {/*
                // START OF PRIVACY POLICY CONTENT
            */}
            <section className="mb-16 p-6  shadow-lg dark:shadow-gray-800">
                <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">Privacy Policy</h2>

                <div className="space-y-6">
                    <p>
                        K2 Digital Media (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy of our visitors and clients. This Privacy Policy outlines the types of information we collect, how we use it, the measures we take to safeguard your data, and your rights concerning your personal information when you visit our website at [Your Website URL - e.g., www.k2digitalmedia.ca] and utilize our services. By accessing or using our website and services, you agree to the terms of this Privacy Policy.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">1. Information We Collect</h3>
                    <p>We collect various types of information to provide and improve our services to you. This may include:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-white">
                        <li>
                            <strong>Contact Information:</strong> When you engage with us through forms on our website (e.g., contact forms, quotation request forms), we may collect personal identifiers such as your name, email address, phone number, and company name. This information is essential for us to communicate with you and respond to your inquiries.
                        </li>
                        <li>
                            <strong>Usage and Analytics Data:</strong> We automatically collect certain information about your device and how you interact with our website. This includes your IP address, browser type, operating system, referring URLs, pages viewed, time spent on pages, and the dates and times of your visits. This data, often aggregated and anonymized, helps us understand user behavior, analyze trends, and improve our website&apos;s functionality and content. This is typically collected through tools like Google Analytics.
                        </li>
                        <li>
                            <strong>Service-Related Information:</strong> If you inquire about our services or become a client, you may provide additional information related to your project needs and requirements. This could include details about your business, project specifications, and any other data you choose to share with us to facilitate our services. We only collect information that is relevant and necessary for the provision of our digital media services.
                        </li>
                        <li>
                            <strong>Communication Data:</strong> Records of your correspondence with us, including emails and other communications, may be kept to help us track and resolve your inquiries and improve our customer service.
                        </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">2. How We Use Your Information</h3>
                    <p>The information we collect is used for the following purposes:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-white">
                        <li>
                            <strong>To Respond to Inquiries and Provide Services:</strong> The primary use of your contact and service-related information is to respond to your questions, provide quotes, and deliver the digital media services you request from us.
                        </li>
                        <li>
                            <strong>To Improve Our Website and Services:</strong> Analytics data helps us understand how our website is used, identify areas for improvement, and enhance the overall user experience and the quality of our offerings.
                        </li>
                        <li>
                            <strong>For Marketing and Promotional Communications:</strong> With your explicit consent (e.g., through an opt-in checkbox on our forms), we may use your email address to send you newsletters, updates about our services, special offers, or other marketing materials that we believe may be of interest to you. You can opt-out of these communications at any time.
                        </li>
                        <li>
                            <strong>For Internal Operations:</strong> This includes troubleshooting, data analysis, testing, research, statistical, and survey purposes.
                        </li>
                        <li>
                            <strong>To Comply with Legal Obligations:</strong> We may use your information as required by applicable laws, regulations, or legal processes.
                        </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">3. Cookies and Tracking Technologies</h3>
                    <p className="text-gray-700 dark:text-white">
                        We use &quot;cookies&quot; and similar tracking technologies to enhance your experience on our website. Cookies are small data files placed on your device that allow us to remember your preferences, understand how you interact with our site, and perform basic Browse behavior tracking. This includes session cookies (temporary and deleted when you close your browser) and persistent cookies (remain on your device for a set period or until deleted).
                    </p>
                    <p className="text-gray-700 dark:text-white">
                        The information collected through cookies is primarily used for anonymous analytical purposes, such as tracking website traffic and understanding popular content. While most web browsers automatically accept cookies, you can typically modify your browser settings to decline cookies or alert you when a cookie is being sent. However, please note that disabling cookies may affect the functionality and features of our website. For more detailed information on managing cookies, please refer to your browser&apos;s help documentation.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">4. Third-Party Tools and Services</h3>
                    <p className="text-gray-700 dark:text-white">
                        To support our operations and enhance our services, we may utilize reputable third-party tools and platforms. These service providers may have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose. We encourage you to review the privacy policies of these third-party services to understand their data handling practices:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-white">
                        <li>
                            <strong>Google Analytics:</strong> Used for website analytics to track and report website traffic. (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Privacy Policy</a>)
                        </li>
                        <li>
                            <strong>Firebase:</strong> A development platform that may be used for backend services, authentication, or analytics. (<a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Firebase Privacy Policy</a>)
                        </li>
                        <li>
                            <strong>Supabase:</strong> An open-source Firebase alternative that may be used for database and authentication services. (<a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Supabase Privacy Policy</a>)
                        </li>
                        <li>
                            <strong>Mailchimp:</strong> Used for email marketing campaigns (if you opt-in to receive them). (<a href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Mailchimp Privacy Policy</a>)
                        </li>
                        {/* Add other relevant third-party services as applicable */}
                    </ul>
                    <p className="text-gray-700  dark:text-white">We are not responsible for the privacy practices or content of these third-party websites or services.</p>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">5. Data Security</h3>
                    <p className="text-gray-700  dark:text-white">
                        The security of your personal information is paramount to us. We implement a variety of industry-standard security measures and best practices to protect your data from unauthorized access, alteration, disclosure, or destruction. These measures include, but are not limited to, using secure servers, encryption of data in transit (SSL/TLS), access controls, and regular security audits. While we strive to protect your personal information, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">6. Your Rights</h3>
                    <p className="text-gray-700 dark:text-white">Depending on your jurisdiction and applicable data protection laws, you may have the following rights regarding your personal information:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700 dark:text-white">
                        <li>
                            <strong>Right to Access:</strong> You have the right to request a copy of the personal data we hold about you.
                        </li>
                        <li>
                            <strong>Right to Rectification:</strong> You have the right to request that we correct any inaccurate or incomplete personal data we hold about you.
                        </li>
                        <li>
                            <strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You have the right to request the deletion of your personal data under certain circumstances.
                        </li>
                        <li>
                            <strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data under certain conditions.
                        </li>
                        <li>
                            <strong>Right to Data Portability:</strong> You have the right to receive your personal data in a structured, commonly used, and machine-readable format.
                        </li>
                        <li>
                            <strong>Right to Object:</strong> You have the right to object to our processing of your personal data under certain conditions, particularly for direct marketing purposes.
                        </li>
                        <li>
                            <strong>Right to Withdraw Consent:</strong> Where we rely on your consent to process your personal data, you have the right to withdraw that consent at any time. This will not affect the lawfulness of processing based on consent before its withdrawal.
                        </li>
                    </ul>
                    <p className="text-gray-700 dark:text-white">
                        To exercise any of these rights, please contact us using the details provided in the &quot;Contact Us&quot; section below. We will respond to your request in accordance with applicable data protection laws.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">7. Updates to This Privacy Policy</h3>
                    <p className="text-gray-700 dark:text-white">
                        We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our website and services after any modifications to this Privacy Policy constitutes your acceptance of the updated terms.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">8. Contact Us</h3>
                    <p className="text-gray-700 dark:text-white">
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please do not hesitate to contact us at:
                    </p>
                    <p className="ml-4 text-gray-700 dark:text-white">
                        <strong>Email:</strong> <a href="mailto:info@k2digitalmedia.ca" className="text-blue-600 underline">info@k2digitalmedia.ca</a><br/>
                        {/* Add physical address or phone number if desired */}
                        {/* <strong>Address:</strong> [Your Company Address] */}
                        {/* <strong>Phone:</strong> [Your Phone Number] */}
                    </p>
                </div>
            </section>
            {/*
                // END OF PRIVACY POLICY CONTENT
            */}

            <hr className="my-16 border-t-2 border-gray-200" /> {/* Separator */}

            {/*
                // START OF SERVICES CONTENT
            */}
            <section className="p-6  shadow-lg dark:shadow-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Our Comprehensive Digital Services</h2>
                <p className="text-lg text-gray-700 dark:text-white mb-10 text-center">
                    At K2 Digital Media, we offer a full spectrum of digital solutions designed to elevate your online presence, engage your audience, and drive measurable results. From crafting stunning websites to executing powerful marketing campaigns and producing captivating visual content, we&apos;re your partner in digital success.
                </p>

                {/* Web Development Section */}
                <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">Web Development: Your Digital Foundation</h3>
                    <p className="mb-6 text-gray-700 dark:text-white">
                        A powerful online presence starts with a well-crafted website. We build responsive, intuitive, and high-performing web solutions tailored to your unique business needs and goals.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Portfolio Websites</h4>
                            <p className="text-gray-600 dark:text-white">
                                Showcase your best work with a stunning and professional online portfolio. Perfect for artists, photographers, designers, freelancers, and creatives, our portfolio websites are designed to highlight your talents and leave a lasting impression on potential clients and collaborators. We focus on clean design, intuitive navigation, and high-quality image/video display to let your work speak for itself.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Business Landing Pages</h4>
                            <p className="text-gray-600 dark:text-white">
                                Captivate your audience and drive conversions with expertly designed landing pages. Whether for a new product launch, a special promotion, or a lead generation campaign, we create focused, persuasive landing pages optimized to achieve specific marketing objectives and convert visitors into valuable leads or customers.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">E-commerce Solutions</h4>
                            <p className="text-gray-600 dark:text-white">
                                Launch or enhance your online store with robust and user-friendly e-commerce platforms. From product showcases and secure payment gateways to inventory management and seamless checkout experiences, we build scalable e-commerce solutions that empower you to sell your products or services effectively online and grow your revenue.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Admin Dashboard Integration</h4>
                            <p className="text-gray-600 dark:text-white">
                                Gain complete control over your website&apos;s content and data with custom admin dashboard integrations. We develop intuitive back-end interfaces that allow you to easily manage users, content, orders, analytics, and more, streamlining your operations and giving you powerful insights at your fingertips.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Blog &amp; Content Management Systems (CMS)</h4>
                            <p className="text-gray-600 dark:text-white">
                                Establish your authority and engage your audience with dynamic blog platforms and comprehensive Content Management Systems. We build CMS solutions (like WordPress or custom solutions) that make it simple for you to create, publish, and manage your content, supporting your content marketing efforts and keeping your website fresh and relevant.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Digital Marketing Section */}
                <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">Digital Marketing: Expanding Your Reach &amp; Impact</h3>
                    <p className="mb-6 text-gray-700 dark:text-white">
                        Attract the right audience, generate leads, and boost your conversions with our data-driven digital marketing strategies.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Search Engine Optimization (SEO)</h4>
                            <p className="text-gray-600 dark:text-white">
                                Improve your visibility on search engines like Google and drive organic traffic to your website. Our SEO strategies include keyword research, on-page optimization, technical SEO audits, and link-building to help your business rank higher for relevant searches and attract more qualified visitors.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Google Ads / PPC Campaigns</h4>
                            <p className="text-gray-600 dark:text-white">
                                Get immediate visibility and target potential customers with highly effective Pay-Per-Click (PPC) advertising campaigns on Google Ads. We manage everything from keyword selection and ad copy creation to bid management and performance tracking, ensuring maximum ROI for your advertising budget.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Email Marketing</h4>
                            <p className="text-gray-600 dark:text-white">
                                Build strong customer relationships and drive repeat business with engaging email marketing campaigns. We help you craft compelling newsletters, promotional emails, and automated sequences that nurture leads, announce new products, and keep your audience informed and connected to your brand.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Lead Generation Campaigns</h4>
                            <p className="text-gray-600 dark:text-white">
                                Identify and attract high-quality leads for your business through strategic multi-channel campaigns. We develop comprehensive lead generation strategies utilizing various digital marketing tactics to fill your sales pipeline and help you convert prospects into loyal customers.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Conversion Optimization</h4>
                            <p className="text-gray-600 dark:text-white">
                                Turn more website visitors into customers or desired actions. We analyze user behavior, conduct A/B testing, and implement data-driven improvements to your website and marketing funnels, maximizing your conversion rates and improving the effectiveness of your digital assets.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Social Media Management Section */}
                <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">Social Media Management: Building Community &amp; Brand Loyalty</h3>
                    <p className="mb-6 text-gray-700 dark:text-white">
                        Cultivate a thriving online community and amplify your brand message across key social platforms.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Monthly Content Planning</h4>
                            <p className="text-gray-600 dark:text-white">
                                Stay consistent and strategic with a meticulously planned social media calendar. We develop engaging content themes, topics, and formats aligned with your brand goals, ensuring a steady flow of valuable posts that resonate with your audience.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Caption Writing &amp; Hashtag Research</h4>
                            <p className="text-gray-600 dark:text-white">
                                Craft compelling captions that tell your brand&apos;s story and perform effective hashtag research to maximize your content&apos;s reach and discoverability across social platforms. We ensure your message is clear, engaging, and seen by the right audience.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Reels &amp; Video Edits for Instagram, YouTube Shorts, TikTok</h4>
                            <p className="text-gray-600 dark:text-white">
                                Dominate short-form video with dynamic and trend-driven content. We specialize in editing captivating Reels, YouTube Shorts, and TikTok videos designed to grab attention, boost engagement, and drive virality for your brand.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Scheduling &amp; Posting</h4>
                            <p className="text-gray-600 dark:text-white">
                                Maintain a consistent and optimized social media presence without the hassle. We handle the scheduling and timely posting of your content across all chosen platforms, ensuring your message reaches your audience when they are most active.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Engagement Boosting Strategies</h4>
                            <p className="text-gray-600 dark:text-white">
                                Go beyond just posting. We implement proactive strategies to foster genuine interactions, respond to comments, run polls, and encourage user-generated content, all aimed at building a vibrant and loyal community around your brand.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Video & VFX Editing Section */}
                <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">Video &amp; VFX Editing: Bringing Your Vision to Life</h3>
                    <p className="mb-6 text-gray-700 dark:text-white">
                        From raw footage to polished masterpiece, our video and visual effects expertise transforms your ideas into compelling visual stories.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Commercial Video Editing</h4>
                            <p className="text-gray-600 dark:text-white">
                                Create high-impact commercial videos that resonate with your target audience and drive action. We specialize in editing engaging advertisements, promotional videos, and brand stories that effectively communicate your message and leave a lasting impression.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">YouTube &amp; Short Form Edits</h4>
                            <p className="text-gray-600 dark:text-white">
                                Optimize your video content for maximum viewership and engagement across platforms. We expertly edit long-form YouTube videos, turning raw footage into polished, watchable content, and adapt existing or new content into compelling short-form edits for platforms like YouTube Shorts, Instagram Reels, and TikTok.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Cinematic Edits</h4>
                            <p className="text-gray-600 dark:text-white">
                                Elevate your footage with a professional, cinematic look and feel. Our cinematic editing services focus on storytelling, color grading, sound design, and pacing to create visually stunning and emotionally resonant videos for various applications, including documentaries, short films, and high-end brand content.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">VFX Shots (Green Screen, CGI Integration, Clean-ups)</h4>
                            <p className="text-gray-600 dark:text-white">
                                Unleash the impossible with seamless visual effects. Our VFX services include professional green screen keying, realistic CGI integration to add elements or environments, and meticulous clean-ups to remove unwanted objects or imperfections, enhancing the overall quality and impact of your video.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Motion Graphics &amp; Titles</h4>
                            <p className="text-gray-600 dark:text-white">
                                Add dynamic visual flair and enhance your messaging with custom motion graphics and animated titles. From engaging intros and outros to informative lower thirds and animated infographics, we create stunning visual elements that make your video content more professional, informative, and captivating.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Creation & Management Section */}
                <section className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">Content Creation &amp; Management: Engaging Your Audience with Compelling Stories</h3>
                    <p className="mb-6 text-gray-700 dark:text-white">
                        Fuel your digital presence with high-quality, relevant content that speaks directly to your audience and supports your marketing goals.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Blog Writing</h4>
                            <p className="text-gray-600 dark:text-white">
                                Establish your brand as an industry authority and drive organic traffic with engaging, SEO-friendly blog posts. We research trending topics, craft compelling narratives, and optimize content to attract and inform your target audience, fostering loyalty and improving search rankings.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Product Copywriting</h4>
                            <p className="text-gray-600 dark:text-white">
                                Convert browsers into buyers with persuasive and descriptive product copywriting. We create compelling product descriptions, features, and benefits that highlight value, address customer pain points, and encourage purchasing decisions, whether for e-commerce sites or promotional materials.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Visual Content for Social Media</h4>
                            <p className="text-gray-600 dark:text-white">
                                Stand out in crowded social feeds with eye-catching visual content. We design custom graphics, images, and short animations tailored for various social media platforms, ensuring your brand&apos;s aesthetic is consistent, professional, and highly shareable.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Scriptwriting for Ads or YouTube</h4>
                            <p className="text-gray-600 dark:text-white">
                                Develop clear, concise, and impactful scripts for your video content. Whether it&apos;s a short, punchy ad script designed for maximum conversion or a longer-form YouTube video script crafted for engagement and retention, we write compelling narratives that bring your message to life.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">Photography &amp; Thumbnail Design</h4>
                            <p className="text-gray-600 dark:text-white">
                                Capture your brand&apos;s essence with professional photography and optimize your video content with captivating thumbnails. We provide high-quality imagery for your website and social media, and design custom thumbnails that entice viewers to click and watch your videos, boosting your reach and engagement.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="text-center mt-12">
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">
                        Ready to transform your digital presence? <a href="/contact" className="text-blue-600 underline hover:no-underline">Contact us today</a> to discuss your project!
                    </p>
                </div>
            </section>
            {/*
                // END OF SERVICES CONTENT
            */}
        </main>
    );
};

export default CombinedInfoPage;