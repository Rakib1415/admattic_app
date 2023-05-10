import { useAppDispatch, useAppSelector } from '@/app/redux-hooks';
import {
    useUpdatePasswordMutation,
    useUpdateProfileMutation,
    useVerifyOtpMutation,
} from '@/features/user/userApi';
import { addProfile } from '@/features/user/userSlice';
import type { UploadProps } from 'antd';
import { Button, Form, Input, Upload, UploadFile, notification } from 'antd';
import { BASE_URL } from 'constants/api-endpoints';
import Image from 'next/image';
import { useState } from 'react';

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
    console.log(values);
};

export default function Setting() {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [otp, setOtp] = useState<string>();
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
    const [updateProfile] = useUpdateProfileMutation();
    const [updatePassword] = useUpdatePasswordMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector((state) => state.user);

    const handleUpdate = async () => {
        const res: any = await updatePassword({ email });
        if (res?.data?.status) {
            notification.open({
                message: 'Success',
                description: res?.data?.message,
            });
        } else {
            notification.error({
                message: 'something went worng!',
            });
        }
    };

    const handleVerifyOtp = async () => {
        const res: any = await verifyOtp({ email, otp });
        if (res?.data?.status) {
            notification.open({
                message: 'Success',
                description: res?.data?.message,
            });
        } else {
            notification.error({
                message: 'something went worng!',
            });
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('profile', imageFiles[0]?.originFileObj as File);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('country', country);
        formData.append('password', password);
        const res: any = await updateProfile(formData);
        console.log(res);
        if (res?.data?.status) {
            notification.open({
                message: 'Success',
                description: res?.data?.message,
            });
            setName('');
            setPhone('');
            setPassword('');
            setCountry('');
            setCompany('');
            setEmail('');
            setImageFiles([]);
            dispatch(addProfile(res?.data?.updateResponse));
        } else {
            notification.error({
                message: 'something went worng!',
            });
        }
    };

    const props: UploadProps = {
        name: 'profile',
        fileList: imageFiles,
        onChange({ fileList }) {
            setImageFiles(fileList);
        },
    };
    const inputStyle = {
        border: 'none',
        color: '#333333',
        fontSize: '20px',
        fontWeight: 500,
        opacity: 0.7,
        lineHeight: '22px',
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center">
                    <Image
                        src="/settingIconPurple.svg"
                        alt="billing icon"
                        width={15}
                        height={15}
                    />
                    <span className="ml-2 text-2sm font-[600] text-black opacity-[0.6]">
                        {' '}
                        Update your Account Settings
                    </span>
                </div>
                <div
                    className="bg-white mt-5 p-5"
                    style={{
                        border: '1px solid rgba(196, 196, 196, 0.5)',
                        borderRadius: '3px',
                    }}
                >
                    <Form
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{ maxWidth: '100%' }}
                        validateMessages={validateMessages}
                    >
                        <div className="space-y-5 mb-5">
                            <span className="text-2sm font-bold text-gray-450 opacity-[0.8]">
                                Edit Profile Picture
                            </span>
                            <div className="flex justify-start items-center ">
                                <div className="w-[85] h-[85]">
                                    <Image
                                        loader={({ src, width, quality }) =>
                                            `${BASE_URL}/${src}?w=${width}&q=${
                                                quality || 75
                                            }`
                                        }
                                        src={`profile/${profile}`}
                                        alt="profile pic"
                                        width={90}
                                        height={90}
                                    />
                                </div>

                                <div className=" ml-3">
                                    <Upload {...props}>
                                        <Button className="bg-[#6900B8] opacity-[0.6] text-white font-bold text-2sm px-6 py-1 rounded-[3px]">
                                            Choose a file
                                        </Button>
                                    </Upload>
                                    <div className="text-xs text-gray-450 opacity-[0.4] font-bold">
                                        Acceptable format jpg, png only <br />{' '}
                                        Max file size is 500 kb and min size 70
                                        kb
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-between">
                            <div className=" w-[32%] ">
                                <span className="text-2sm font-bold text-gray-450 opacity-[0.8]">
                                    Personal Information
                                </span>
                                <div className=" mt-4">
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'name']}
                                        rules={[{ required: true }]}
                                    >
                                        <label className="ml-2 font-semibold text-black opacity-[0.7]">
                                            Enter user name
                                        </label>
                                        <Input
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'phoe']}
                                        // rules={[{ type: 'phone' }]}
                                    >
                                        <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                            Phone Number
                                        </label>
                                        <Input
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'email']}
                                        rules={[{ type: 'email' }]}
                                    >
                                        <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                            Email ID
                                        </label>
                                        <Input
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className=" w-[33%] ">
                                <div className="pl-5 text-2sm font-bold text-gray-450 opacity-[0.8]">
                                    {' '}
                                    Company Information
                                </div>
                                <div className="border-l-2 pl-5 mt-4">
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'email']}
                                        rules={[{ type: 'email' }]}
                                    >
                                        <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                            Enter Company Name
                                        </label>
                                        <Input
                                            value={company}
                                            onChange={(e) =>
                                                setCompany(e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'email']}
                                        rules={[{ type: 'email' }]}
                                    >
                                        <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                            Enter TAX ID
                                        </label>
                                        <Input style={inputStyle} />
                                    </Form.Item>
                                    <Form.Item
                                        className="float-container"
                                        name={['user', 'email']}
                                        rules={[{ type: 'email' }]}
                                    >
                                        <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                            Country
                                        </label>
                                        <Input
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                            style={inputStyle}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className=" w-[30%]  ">
                                <div className="pl-3 text-2sm font-bold text-gray-450 opacity-[0.8]">
                                    Security Information
                                </div>
                                <div className="border-l-2 pl-3 mt-4">
                                    <div className="flex justify-between items-center">
                                        <Form.Item
                                            className="w-full float-container"
                                            name={['user', 'name']}
                                            rules={[{ required: true }]}
                                        >
                                            <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                                Password
                                            </label>
                                            <Input
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                style={inputStyle}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ marginLeft: '5px' }}
                                        >
                                            <button
                                                type="button"
                                                onClick={handleUpdate}
                                                className="bg-gray-450 text-white font-bold text-2sm px-9 py-4 rounded-[3px]"
                                            >
                                                Update
                                            </button>
                                        </Form.Item>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Form.Item
                                            className="w-full float-container"
                                            name={['user', 'name']}
                                            rules={[{ required: true }]}
                                        >
                                            <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                                OTP
                                            </label>
                                            <Input
                                                value={otp}
                                                onChange={(e) =>
                                                    setOtp(e.target.value)
                                                }
                                                style={inputStyle}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ marginLeft: '5px' }}
                                        >
                                            <button
                                                type="button"
                                                onClick={handleVerifyOtp}
                                                className="bg-gray-450 text-white font-bold text-2sm px-9 py-4 rounded-[3px] whitespace-nowrap"
                                            >
                                                <span>Verify OTP</span>
                                            </button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-purple text-white font-bold text-2sm px-8 py-4 rounded-[3px]"
                    >
                        DONE
                    </button>
                </div>
            </div>
        </>
    );
}
