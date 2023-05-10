import { useAppDispatch } from '@/app/redux-hooks';
import { addAdFiles } from '@/features/ad-group/adGroupSlice';
import { nextTokenId } from '@/utils';
import { Button, Form, Input, Skeleton } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import MediaGenerator from './MediaGenerator';

const inputStyle = {
    border: 'none',
    color: '#333333',
    fontSize: '20px',
    fontWeight: 500,
    opacity: 0.7,
    lineHeight: '22px',
};

export default function AdGroup({
    setCurrent,
    current,
}: {
    setCurrent: (e: number) => void;
    current: number;
}) {
    const dispatch = useAppDispatch();
    const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
    const [name, setName] = useState<string>('');

    const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
    const [htmlFileList, setHtmlFileList] = useState<UploadFile[]>([]);
    const [headings, setHeadings] = useState([
        { id: 1, heading: '' },
        { id: 2, heading: '' },
        { id: 3, heading: '' },
    ]);

    const [descriptions, setDescriptions] = useState([
        { id: 1, description: '' },
        { id: 2, description: '' },
        { id: 3, description: '' },
    ]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleChangeHeading = (
        event: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        const updatedHeadings = headings.map((heading) => {
            if (heading.id === id) {
                return {
                    ...heading,
                    [event.target.name]: event.target.value,
                };
            }
            return heading;
        });
        setHeadings(updatedHeadings);
    };

    const handleChangeDescription = (
        event: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        const updatedDescriptions = descriptions.map((description) => {
            if (description.id === id) {
                return {
                    ...description,
                    [event.target.name]: event.target.value,
                };
            }
            return description;
        });
        setDescriptions(updatedDescriptions);
    };

    const handleAddHeading = () => {
        setHeadings((prev) => [
            ...prev,
            { id: nextTokenId(headings), heading: '' },
        ]);
    };

    const handleAddDescription = () => {
        setDescriptions((prev) => [
            ...prev,
            { id: nextTokenId(descriptions), description: '' },
        ]);
    };

    // console.log(descriptions);

    return (
        <div className="space-y-8 mt-10">
            <div className="flex items-center">
                <div className="text-[#333333 ] text-sm font-bold">
                    Create AD Groups
                </div>
                <div className="text-gray-450 opacit-[0.4] ml-2">
                    (For more accurate targeting, organize each ad group around
                    a specific theme, audience,or message)
                </div>
            </div>

            <div className="flex items-center">
                <div className="input-wrapper-ad  bg-white w-[300px] h-[38px]">
                    {loading ? (
                        <Skeleton.Input
                            active
                            size="small"
                            style={{ minWidth: '200px' }}
                        />
                    ) : (
                        <input
                            value={name}
                            onChange={(e: any) => setName(e.target.value)}
                            type="name"
                        />
                    )}
                </div>
                <div className="text-purple text-2  sm font-bold ml-4">
                    Done
                </div>
            </div>

            <div className="bg-white w-full px-4 py-4 billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Headlines{' '}
                </div>
                <div className="flex justify-between mt-4   ">
                    <div className="flex w-full">
                        {/* <Form.Item
                            className="float-container"
                            name={['user', 'email']}
                            rules={[{ type: 'email' }]}
                        >
                            <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                Headline 1
                            </label>
                            <Input
                                style={inputStyle}
                            />
                        </Form.Item>
                        <Form.Item
                            className="float-container ml-2"
                            name={['user', 'email']}
                            rules={[{ type: 'email' }]}
                        >
                            <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                Headline 2
                            </label>
                            <Input
                                value={headingTwo}
                                onChange={(e) => setHeadingTwo(e.target.value)}
                                style={inputStyle}
                            />
                        </Form.Item>
                        <Form.Item
                            className="float-container ml-2"
                            name={['user', 'email']}
                            rules={[{ type: 'email' }]}
                        >
                            <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                Headline 3
                            </label>
                            <Input
                                value={headingThree}
                                onChange={(e) =>
                                    setHeadingThree(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </Form.Item> */}
                        {headings.map((heading) => (
                            <Form.Item
                                key={heading.id}
                                className="float-container mx-1"
                                name={['user', 'email']}
                                rules={[{ type: 'email' }]}
                            >
                                {loading ? (
                                    <Skeleton
                                        active
                                        avatar={false}
                                        paragraph={false}
                                        title={{ width: '100px' }}
                                    />
                                ) : (
                                    <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                        Headline {heading.id}
                                    </label>
                                )}

                                {loading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{
                                            minWidth: '200px',
                                            marginTop: '7px',
                                        }}
                                    />
                                ) : (
                                    <Input
                                        name="heading"
                                        onChange={(e) =>
                                            handleChangeHeading(e, heading.id)
                                        }
                                        style={inputStyle}
                                    />
                                )}
                            </Form.Item>
                        ))}
                    </div>
                    <div
                        onClick={handleAddHeading}
                        className="w-[173px] ml-4 h-[53px] bg-[#333333] rounded-[3px] text-white flex items-center justify-center text-2sm font-bold mt-1"
                    >
                        + Add Headline
                    </div>
                </div>
            </div>

            <div className="bg-white w-full px-4 py-4 billing-box-border ">
                <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                    Descriptions{' '}
                </div>
                <div className="flex justify-between mt-4   ">
                    <div className="flex w-full">
                        {/* <Form.Item
                            className="float-container"
                            name={['user', 'email']}
                            rules={[{ type: 'email' }]}
                        >
                            <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                Description 1
                            </label>
                            <Input
                                value={descriptionOne}
                                onChange={(e) =>
                                    setDescriptionOne(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </Form.Item>
                        <Form.Item
                            className="float-container ml-2"
                            name={['user', 'email']}
                            rules={[{ type: 'email' }]}
                        >
                            <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                Description 2
                            </label>
                            <Input
                                value={descriptionTwo}
                                onChange={(e) =>
                                    setDescriptionTwo(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </Form.Item>
                        <Form.Item
                            className="float-container ml-2"
                            name={['user', 'email']}
                            rules={[{ type: 'email' }]}
                        >
                            <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                Description 3
                            </label>
                            <Input
                                value={descriptionThree}
                                onChange={(e) =>
                                    setDescriptionThree(e.target.value)
                                }
                                style={inputStyle}
                            />
                        </Form.Item> */}
                        {descriptions.map((description) => (
                            <Form.Item
                                key={description.id}
                                className="float-container mx-1"
                                name={['user', 'email']}
                                rules={[{ type: 'email' }]}
                            >
                                {loading ? (
                                    <Skeleton
                                        active
                                        avatar={false}
                                        paragraph={false}
                                        title={{ width: '100px' }}
                                    />
                                ) : (
                                    <label className="ml-2  font-semibold text-black opacity-[0.7]">
                                        Description {description.id}
                                    </label>
                                )}

                                {loading ? (
                                    <Skeleton.Input
                                        active
                                        size="small"
                                        style={{
                                            minWidth: '200px',
                                            marginTop: '7px',
                                        }}
                                    />
                                ) : (
                                    <Input
                                        name="description"
                                        onChange={(e) =>
                                            handleChangeDescription(
                                                e,
                                                description.id
                                            )
                                        }
                                        style={inputStyle}
                                    />
                                )}
                            </Form.Item>
                        ))}
                    </div>
                    <div
                        onClick={handleAddDescription}
                        className="mt-1 ml-4 w-[173px] h-[53px] bg-[#333333] rounded-[3px] text-white flex items-center justify-center text-2sm font-bold"
                    >
                        + Add Description
                    </div>
                </div>
            </div>

            {/* media generator */}

            <MediaGenerator
                imageFileList={imageFileList}
                setImageFileList={setImageFileList}
                videoFileList={videoFileList}
                setVideoFileList={setVideoFileList}
                htmlFileList={htmlFileList}
                setHtmlFileList={setHtmlFileList}
                loading={loading}
            />

            <div className="flex justify-end">
                <Button
                    className="bg-purple text-white text-sm text-bold w-[135px] h-[49px] "
                    onClick={() => {
                        setCurrent(current + 1);
                        dispatch(
                            addAdFiles({
                                name,
                                headings,
                                descriptions,
                                imageFileList,
                                videoFileList,
                                htmlFileList,
                            })
                        );
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
