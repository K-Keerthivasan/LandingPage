'use client';

import {useState, useRef} from 'react';
import {useRouter} from 'next/navigation';
import {signInWithEmail} from '@/components/backend/auth';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const captchaRef = useRef<HCaptcha | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setErrorMsg('Please verify hCaptcha first');
            return;
        }

        const {error} = await signInWithEmail(email, password, token);

        if (error) setErrorMsg(error.message);
        else router.push('/dashboard');
    };

    return (
        <main
            className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-20 transition-colors flex items-center justify-center">
            <div className="w-full max-w-sm">
                <h2 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-300 mb-4 text-center md:text-left">
                    Admin Login
                </h2>
                <div className="w-12 h-1 bg-gray-400 mb-6 mx-auto md:mx-0"/>

                <form
                    onSubmit={handleLogin}
                    className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded"
                    />
                    <div className="mt-4 mb-4">
                        <HCaptcha
                            sitekey="e5d291c6-ea70-42fa-a1a2-ae86dc02916c"
                            onVerify={setToken}
                            ref={captchaRef}
                            theme="dark"
                        />
                    </div>
                    {errorMsg && (
                        <p className="text-red-500 text-sm mb-2 dark:text-red-400">{errorMsg}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded hover:opacity-90"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </main>
    );
}
