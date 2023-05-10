import authService from '@/services/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const { email, password } = values;
        try {
            const res: any = await authService.login({
                email,
                password,
            });
            console.log(res?.data);
            notification.success({
                message: res?.data?.message,
            });
            if (res.data.status) {
                localStorage.setItem('currentUser', JSON.stringify(res?.data));
                form.resetFields();
                router.push('/');
            }
        } catch (error: any) {
            console.log(error);
            notification.error({
                message: error?.response?.data?.message,
            });
        }
    };

    // useEffect(() => {
    //     const user = getCurrentUser('currentUser');
    //     if (Object.keys(user).length > 0) {
    //         router.push('/');
    //     }
    // }, [router]);

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
                    <div className="mt-[60px] p-2">
                        <div className="text-3xl font-black mb-[19px]">
                            SIGN IN
                        </div>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <label className="font-bold text-lg mb-2">
                                Email / Phone Number
                            </label>
                            <Form.Item
                                name="email"
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
                            <label className="font-bold text-lg mb-2">
                                Password
                            </label>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    type="password"
                                    placeholder="Password"
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
                                            Remember me
                                        </Checkbox>
                                    </Form.Item>

                                    <div className="login-form-forgot font-bold text-lg cursor-pointer">
                                        <Link href="/forget-password">
                                            Forgot password
                                        </Link>
                                    </div>
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <div className="flex items-center justify-center ">
                                    <Button
                                        htmlType="submit"
                                        className="bg-purple text-white font-2xl w-[135px] h-[52px] rounded-[3px]"
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            </Form.Item>
                            <div className="flex items-center justify-center mt-[55px] font-bold text-[18px]">
                                New to Admattic?{' '}
                                <Link
                                    href="/register"
                                    className="ml-2 text-red-600 cursor-pointer"
                                >
                                    Register
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
