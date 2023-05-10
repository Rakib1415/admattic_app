import authService from '@/services/auth';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const router = useRouter();

    const handleGetOtp = async () => {
        try {
            const res = await authService.getOTP(email);
            notification.success({
                message:
                    res?.data?.message ||
                    'please check your email.otp send to your email',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleVeirifyOTP = async () => {
        try {
            const res = await authService.verifiOTP({ email, otp });
            notification.success({
                message: res?.data?.message,
            });
        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message,
            });
        }
    };
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const { name, email, country, createPassword, confirmPassword } =
            values;
        try {
            const res = await authService.signUp({
                name,
                email,
                country,
                password: createPassword,
                confirmPassword,
            });
            notification.success({
                message: res?.data?.message,
            });
            form.resetFields();
            setEmail('');
            setOtp('');
            router.push('/login');
        } catch (error: any) {
            notification.error({
                message: error?.response?.data?.message,
            });
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
                <div>
                    {' '}
                    <div className="mt-[40px] p-2">
                        <div className="text-3xl font-black mb-[19px]">
                            SIGN UP
                        </div>
                        <Form
                            form={form}
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <label className="font-bold text-lg mb-2">
                                Full Name *
                            </label>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Full Name"
                                    className=" h-[39px]"
                                />
                            </Form.Item>

                            <label className="font-bold text-lg mb-2">
                                Country *
                            </label>
                            <Form.Item
                                name="country"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Country!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Country"
                                    className=" h-[39px]"
                                />
                            </Form.Item>

                            <label className="font-bold text-lg mb-2">
                                Email
                            </label>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter your Email',
                                    },
                                ]}
                            >
                                <div className="flex">
                                    <Input
                                        type="email"
                                        placeholder="Your Email"
                                        className=" h-[39px]"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <Button
                                        htmlType="button"
                                        className="bg-purple text-white font-2xl w-[135px] h-[39px] rounded-[3px] ml-2"
                                        onClick={handleGetOtp}
                                    >
                                        Get OTP
                                    </Button>
                                </div>
                            </Form.Item>

                            {/* on COndition */}
                            <Form.Item name="otp">
                                <div className="flex">
                                    <Input
                                        type="verifyOtp"
                                        className=" h-[39px]"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <Button
                                        onClick={handleVeirifyOTP}
                                        htmlType="button"
                                        className="bg-purple text-white font-2xl w-[180px] h-[39px] rounded-[3px] ml-2"
                                    >
                                        Verify OTP
                                    </Button>
                                </div>
                            </Form.Item>

                            <label className="font-bold text-lg mb-2">
                                Create Password
                            </label>
                            <Form.Item
                                name="createPassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    placeholder="Create Password"
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
                                        message:
                                            'Please confirm your password!',
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
                                <div className="flex justify-between items-center">
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        noStyle
                                    >
                                        <Checkbox className="font-bold text-lg ">
                                            I accept all terms and condtions
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <div className="flex items-center justify-center ">
                                    <Button
                                        htmlType="submit"
                                        className="bg-purple text-white font-2xl w-[135px] h-[52px] rounded-[3px]"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </Form.Item>
                            <div className="flex items-center justify-center mt-[10px] font-bold text-[18px]">
                                Already a User?{' '}
                                <Link
                                    href="/login"
                                    className="ml-2 text-red-600 cursor-pointer"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
