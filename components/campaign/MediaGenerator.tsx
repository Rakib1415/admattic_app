import { PlusOutlined } from '@ant-design/icons';
import { Modal, Skeleton, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import { useState } from 'react';
import pre from '../../public/pre.jpg';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function MediaGenerator({
    imageFileList,
    setImageFileList,
    videoFileList,
    setVideoFileList,
    htmlFileList,
    setHtmlFileList,
    loading,
}: {
    imageFileList?: any;
    setImageFileList?: any;
    videoFileList?: any;
    setVideoFileList?: any;
    htmlFileList?: any;
    setHtmlFileList?: any;
    loading?: boolean;
}) {
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imagePreviewTitle, setImagePreviewTitle] = useState('');
    // const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);

    // const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
    // const [htmlFileList, setHtmlFileList] = useState<UploadFile[]>([]);

    const handleImageCancel = () => setImagePreviewOpen(false);

    const handleImagePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setImagePreviewOpen(true);
        setImagePreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
        );
    };

    const handleImageChange: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => setImageFileList(newFileList);

    const handleVideoChange: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => setVideoFileList(newFileList);

    const handleHtmlChange: UploadProps['onChange'] = ({
        fileList: newFileList,
    }) => setHtmlFileList(newFileList);

    // console.log(htmlFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 10 }}>Upload Image</div>
        </div>
    );

    const uploadButtonVideo = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 10 }}>Upload Video</div>
        </div>
    );

    const uploadButtonHtml = (
        <div className="flex items-center">
            <PlusOutlined />
            <div className="ml-2">Upload Html Page</div>
        </div>
    );

    return (
        <div className="flex mt-4">
            <div className="w-3/5">
                {/* images */}

                <div className="bg-white w-full px-4 py-4 billing-box-border ">
                    <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                        Images{' '}
                    </div>
                    <div className="flex flex-col justify-between mt-4   ">
                        {loading ? (
                            <Skeleton.Avatar
                                active
                                shape="square"
                                size="large"
                                style={{ width: '111px', height: '107px' }}
                            />
                        ) : (
                            <div className="flex w-full">
                                <Upload
                                    // action="http://localhost:8000/api/createAd"
                                    listType="picture-card"
                                    name="avatar"
                                    fileList={imageFileList}
                                    onPreview={handleImagePreview}
                                    onChange={handleImageChange}
                                >
                                    {uploadButton}
                                </Upload>
                                <Modal
                                    open={imagePreviewOpen}
                                    title={imagePreviewTitle}
                                    footer={null}
                                    onCancel={handleImageCancel}
                                >
                                    <Image
                                        alt="example"
                                        width={411}
                                        height={607}
                                        src={previewImage}
                                    />
                                </Modal>
                            </div>
                        )}
                        <div className="w-[173px] h-[53px] bg-[#333333] rounded-[3px] text-white flex items-center justify-center text-2sm font-bold mt-1">
                            + Add More Images
                        </div>
                    </div>
                </div>

                {/* videos */}

                <div className="bg-white w-full px-4 py-4 billing-box-border mt-4">
                    <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                        Videos{' '}
                    </div>
                    <div className="flex flex-col justify-between mt-4   ">
                        {loading ? (
                            <Skeleton.Avatar
                                active
                                shape="square"
                                size="large"
                                style={{ width: '111px', height: '107px' }}
                            />
                        ) : (
                            <div className="flex w-full">
                                <Upload
                                    // action="http://localhost:8000/api/createAd"
                                    listType="picture-card"
                                    name="video"
                                    fileList={videoFileList}
                                    // onPreview={handleImagePreview}
                                    onChange={handleVideoChange}
                                >
                                    {uploadButtonVideo}
                                </Upload>
                            </div>
                        )}
                        <div className="w-[173px] h-[53px] bg-[#333333] rounded-[3px] text-white flex items-center justify-center text-2sm font-bold mt-1">
                            + Add More videos
                        </div>
                    </div>
                </div>

                {/* html */}

                <div className="bg-white w-full px-4 py-4 billing-box-border mt-4">
                    <div className="text-gray-450 opacity-[0.8] text-sm font-bold">
                        HTML 5{' '}
                    </div>
                    <div className="flex flex-col justify-between mt-4  html-uploader ">
                        {loading ? (
                            <Skeleton.Avatar
                                active
                                shape="square"
                                size="large"
                                style={{ width: '250px' }}
                            />
                        ) : (
                            <div className="flex w-full flex-wrap">
                                <Upload
                                    // action="http://localhost:8000/api/createAd"
                                    listType="picture-card"
                                    name="html"
                                    fileList={htmlFileList}
                                    // onPreview={handleImagePreview}
                                    onChange={handleHtmlChange}
                                >
                                    {uploadButtonHtml}
                                </Upload>
                            </div>
                        )}

                        <div className="w-[173px] h-[53px] bg-[#333333] rounded-[3px] text-white flex items-center justify-center text-2sm font-bold mt-1">
                            + Add More HTML 5
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-2/5 flex justify-center items-center ml-4">
                <div>
                    <div className="mb-4 text-gray-450 font-bold text-lg">
                        Media Preview
                    </div>
                    <Image
                        src={pre}
                        alt="image previewer"
                        width={411}
                        height={607}
                    />
                </div>
            </div>
        </div>
    );
}
