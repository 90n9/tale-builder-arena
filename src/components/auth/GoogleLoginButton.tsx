'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function GoogleLoginButton() {
    const router = useRouter();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    credential: credentialResponse.credential,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Google login failed');
            }

            toast.success('เข้าสู่ระบบด้วย Google สำเร็จ');
            router.push('/profile');
            router.refresh();
        } catch (error) {
            console.error('Google login error:', error);
            toast.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย Google');
        }
    };

    const handleError = () => {
        toast.error('Google Login Failed');
    };

    return (
        <div className="flex justify-center w-full">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="outline"
                size="large"
                width="100%"
                text="continue_with"
                shape="rectangular"
            />
        </div>
    );
}
