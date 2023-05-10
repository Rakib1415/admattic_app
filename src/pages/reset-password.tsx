import authService from '@/services/auth';
import { getCurrentUser } from '@/utils';
import { Button, Form, Input, notification } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const ResetPassword: React.FC = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        // console.log('Recieve values', values);
        const user = getCurrentUser('currentUser');

        const { oldPassword, newPassword, confirmPassword } = values;
        try {
            const res = await authService.resetPassword({
                email: user?.user?.email,
                password: oldPassword,
                confirmNewPassword: newPassword,
                confirmPassword,
            });
            if (res.status === 200) {
                form.resetFields();
                router.push('/reset-password-success');
            } else {
                notification.error({
                    message: res?.data?.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex items-center justify-center mt-[110px] bg-[#FFFFFF] ">
            <div className="w-[485px] h-[394px]">
                <div className=" text-6xl flex items-center justify-center">
                    <Image
                        src="/AdmatticLogo.svg"
                        alt="Logo"
                        width={400}
                        height={800}
                    />
                </div>
                <div className="flex flex-col items-center justify-center mt-[60px] p-2">
                    <div className="text-3xl font-black mb-[19px]">
                        RESET PASSWORD
                    </div>
                    <div className="text-sm font-[600] text-[#999999]">
                        <div>Your new password must be different to</div>
                        <div className="text-center">
                            previously used password
                        </div>
                    </div>
                </div>
                <div className="mt-[15px] p-2">
                    <Form
                        form={form}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <label className="font-bold text-lg mb-2">
                            Enter Old Password
                        </label>
                        <Form.Item
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your old Password!',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Old Password"
                                className=" h-[39px]"
                            />
                        </Form.Item>
                        <label className="font-bold text-lg mb-2">
                            Enter New Password
                        </label>
                        <Form.Item
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new Password!',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="New Password"
                                className=" h-[39px]"
                            />
                        </Form.Item>

                        <label className="font-bold text-lg mb-2">
                            Confirm Password
                        </label>
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                className=" h-[39px]"
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className="flex items-center justify-center ">
                                <Button
                                    htmlType="submit"
                                    className="bg-purple text-white text-xl w-[302px] h-[50px] rounded-[3px]"
                                >
                                    Reset password
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
