'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, type ChangePasswordInput } from '@/server/validation/auth-schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type UserProfile = {
    id: number;
    email: string;
    username: string;
    displayName?: string;
    createdAt: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/auth/me')
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error('Unauthorized');
            })
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch(() => {
                router.push('/login');
            });
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">Loading...</div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto min-h-[calc(100vh-4rem)] max-w-4xl pb-10 pt-24">
                <h1 className="mb-8 text-3xl font-bold">ตั้งค่าโปรไฟล์</h1>

                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="mb-8">
                        <TabsTrigger value="account">บัญชี</TabsTrigger>
                        <TabsTrigger value="security">ความปลอดภัย</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>ข้อมูลบัญชี</CardTitle>
                                <CardDescription>ดูรายละเอียดบัญชีของคุณ</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>อีเมล</Label>
                                    <Input value={user?.email} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label>ชื่อผู้ใช้</Label>
                                    <Input value={user?.username} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label>ชื่อที่แสดง</Label>
                                    <Input value={user?.displayName || ''} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label>สมาชิกตั้งแต่</Label>
                                    <Input
                                        value={user ? new Date(user.createdAt).toLocaleDateString('th-TH') : ''}
                                        disabled
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <ChangePasswordForm />
                    </TabsContent>
                </Tabs>
            </div>
            <Footer />
        </div>
    );
}

function ChangePasswordForm() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        },
    });

    async function onSubmit(values: ChangePasswordInput) {
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to change password');
            }

            toast.success('เปลี่ยนรหัสผ่านสำเร็จ');
            form.reset();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('เกิดข้อผิดพลาด');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
                <CardDescription>อัปเดตรหัสผ่านเพื่อรักษาความปลอดภัยบัญชีของคุณ</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>รหัสผ่านปัจจุบัน</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>รหัสผ่านใหม่</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'กำลังอัปเดต...' : 'อัปเดตรหัสผ่าน'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
