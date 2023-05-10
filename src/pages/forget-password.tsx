import authService from '@/services/auth';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ForgetPassword: React.FC = () => {
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        console.log('Values', values);
        const { Email } = values;
        try {
            const res = await authService.forgetPassword(Email);
            notification.success({
                message: res?.data?.message,
            });
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center mt-[110px] bg-[#FFFFFF] ">
            <div className="w-[485px] h-[394px]">
                <div className="mt-[60px] p-2">
                    <div className="text-3xl font-black mb-[19px] ">
                        Forgot password
                    </div>
                    <Form
                        form={form}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <label className="font-bold text-lg mb-2">
                            Enter Email
                        </label>
                        <Form.Item
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Email"
                                className=" h-[39px]"
                            />
                        </Form.Item>
                        <div className="flex items-center justify-center ">
                            <Button
                                htmlType="submit"
                                className="bg-purple text-white  w-[200px] h-[48px] rounded-[3px]"
                            >
                                <span className="font-2xl"> Proceed</span>
                            </Button>
                        </div>

                        <Form.Item>
                            <div className="flex items-center justify-center ">
                                <Image
                                    src="/prevarrow.svg"
                                    alt="arrow"
                                    width={13}
                                    height={13}
                                />
                                <Link
                                    href="/login"
                                    className="font-bold text-lg ml-2 cursor-pointer"
                                >
                                    {' '}
                                    Back to sign in
                                </Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
