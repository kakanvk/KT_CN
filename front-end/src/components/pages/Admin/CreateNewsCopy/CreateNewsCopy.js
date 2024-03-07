import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Breadcrumbs, BreadcrumbItem, Button, Avatar, Input, } from "@nextui-org/react";
import { Upload, Select, message, Tooltip, Modal} from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { GetAllCategories } from "../../../../service/CategoryService";
import {GetNewCanUpdate, PutNewsByID} from "../../../../service/NewsService";
import "./CreateNews.css";
import { Link, useParams } from "react-router-dom";

const CreateNewsCopy = (props) => {
    const { setCollapsedNav } = props;
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [CategoryData, setCategoryData] = useState([]);
    const [titleEN, setTitleEN] = useState("");
    const [titleVI, setTitleVI] = useState("");
    const [contentEN, setContentEN] = useState("");
    const [contentVI, setContentVI] = useState("");
    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);
    const [viewcount, setviewcount] = useState(0);
    const { Option } = Select;

    //hangle database
    const Update = async () => {
        try {
            if (!titleEN || !titleVI) {
                throw new Error("Vui lòng nhập tiêu đề tiếng Anh và tiếng Việt.");
            }
            const data = {
                id_category: selectedCategory,
                title_en: titleEN || null,
                title_vi: titleVI || null,
                content_en: contentEN,
                content_vi: contentVI,
                view_count: viewcount,
                thumbnail: imageUrl
            };  
            const response = await PutNewsByID(id, data);
            console.log("Phản hồi từ máy chủ:", response);
       
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
        }
    };
    
    const getDetailNews = async () => {
        try {
            const response = await GetNewCanUpdate(id);
            console.log("newsDetailData:", response.data);
            const newsDetail = response.data[0];
            if (newsDetail) {
                const { en, vi, thumbnail, id_category, view_count } = newsDetail;
                setTitleEN(en.title_en);
                setTitleVI(vi.title_vi);
                setSelectedCategory(id_category);
                setImageUrl(thumbnail);
                setContentEN(en.content_en);
                setContentVI(vi.content_vi);
                setviewcount(view_count);
            } else {
                console.error("No data found in the response");
            }
        } catch (error) {
            console.error("Error fetching newsDetailData:", error);
        }
        
    };

    const getCategorys = async () => {
        try {
            const response = await GetAllCategories();
            console.log("News data:", response.data);
            setCategoryData(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        console.log("id bài viết", id);
        getCategorys();
        getDetailNews();
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setLayout("col");
                setDisableRowLayout(true);
            } else {
                setDisableRowLayout(false);
            }
            console.log(window.innerWidth);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    //hangle data CKEditor 
    const handleENChange = (event, editor) => {
        const data = editor.getData();
        setContentEN(data);
    };

    const handleVIChange = (event, editor) => {
        const data = editor.getData();
        setContentVI(data);
    };

    const handleCategoryChange = (value, option) => {
        setSelectedCategory(value);
    };
    

    //hangle layout
    const handleToggleLayout = (_layout) => {
        setLayout(_layout);
        if (_layout === "col") {
            setCollapsedNav(false);
        } else {
            setCollapsedNav(true);
        }
    };

    //hangle Img
    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // done thì lấy được url hình
            setImageUrl(info.file.response.imageUrl);
            setLoading(false);
        }
        if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
            setLoading(false);
        }
    };

    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    //config CKEditor    
    const items = [
        {
            key: "1",
            label: "Tạo bài viết tiếng việt",
        },
        {
            key: "2",
            label: "Tạo bài viết tiếng anh",
        },
    ];
    
    return (
        <div>
            <div className="CreateNews flex flex-col gap-7 items-start">
                <div className="flex items-start justify-between w-full">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/admin/post">Quản lý bài viết</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>Thêm bài viết</BreadcrumbItem>
                    </Breadcrumbs>
                    <div className="flex gap-2">
                        <Tooltip title="Chế độ 1 cột">
                            <Button
                                isIconOnly
                                variant={layout === "col" ? "solid" : "light"}
                                radius="full"
                                onClick={() => {
                                    handleToggleLayout("col");
                                }}
                            >
                                <i className="fa-solid fa-table-list"></i>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chế độ song song">
                            <Button
                                isIconOnly
                                variant={layout === "row" ? "solid" : "light"}
                                radius="full"
                                onClick={() => {
                                    handleToggleLayout("row");
                                }}
                                isDisabled={disableRowLayout}
                            >
                                <i className="fa-solid fa-table-columns"></i>
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <div className="flex w-full gap-8">
                    <div className="flex flex-1 flex-col gap-2 w-full">
                        <p className="text-sm">
                            Ảnh bìa bài viết{" "}
                            <span className="text-red-500 font-bold">*</span>
                        </p>
                        <ImgCrop
                            aspect={4 / 3}
                            modalTitle="Cắt hình ảnh"
                            rotationSlider
                            showReset
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={`${process.env.REACT_APP_API_DOMAIN}/admin/upload-image-`}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </ImgCrop>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 w-full">
                        <p className="text-sm">
                            Thể loại{" "}
                            <span className="text-red-500 font-bold">*</span>
                        </p>
                        <Select
                            defaultValue="Chọn loại"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            size="large"
                        >
                            {CategoryData.map((category) => (
                                <Option
                                    key={category.id_category}
                                    value={category.id_category}
                                >
                                    {category.name_vi} ({category.name_en})
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>

                <div
                    className={`flex w-full gap-${
                        layout === "col" ? "10" : "8"
                    } flex-${layout}`}
                >
                    {/* load map data detail */}
                    <div
                        className={`${
                            layout === "col" ? "w-full" : "w-[40%]"
                        } flex-1 flex flex-col gap-6`}
                    >
                        <Input
                            label={
                                <p>
                                    Nhập tiêu đề tiếng Việt{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder="Nhập tiêu đề tiếng Việt"
                            labelPlacement="outside"
                            startContent={
                                <Avatar
                                    className="w-5 h-5"
                                    src="https://flagcdn.com/vn.svg"
                                />
                            }
                            isClearable
                            radius="sm"
                            value={titleVI}
                            onValueChange={setTitleVI}
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">
                                Nội dung bài viết tiếng Việt{" "}
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </p>
                            <CKEditor
                                editor={ClassicEditor}
                                data={contentVI}
                                onChange={(event, editor) => {
                                    handleVIChange(event, editor);
                                }}
                                config={{
                                    ckfinder: {
                                        uploadUrl: `${process.env.REACT_APP_API_DOMAIN}/admin/upload-image`,
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className={`${
                            layout === "col" ? "w-full" : "w-[40%]"
                        } flex-1 flex flex-col gap-6`}
                    >
                        <Input
                            label="Tiêu đề bài viết tiếng Anh"
                            placeholder="Nhập tiêu đề tiếng Anh"
                            labelPlacement="outside"
                            startContent={
                                <Avatar
                                    className="w-5 h-5"
                                    src="https://flagcdn.com/gb.svg"
                                />
                            }
                            isClearable
                            radius="sm"
                            value={titleEN}
                            onValueChange={setTitleEN}
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">
                                Nội dung bài viết tiếng Anh
                            </p>
                            <CKEditor
                                editor={ClassicEditor}
                                data={contentEN}
                                onChange={(event, editor) => {
                                    handleENChange(event, editor);
                                }}
                                config={{
                                    ckfinder: {
                                        uploadUrl: `${process.env.REACT_APP_API_DOMAIN}/admin/upload-image`,
                                    },
                                }}
                            />
                            <div className="text-[12px] opacity-50">
                                <i className="fa-solid fa-circle-info mr-1"></i>
                                Bài viết tiếng Anh là không bắt buộc
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={Update} color="primary" radius="sm">
                    <span className="font-medium">Tạo bài viết</span>
                </Button>

            </div>
        </div>
    );
};

export default CreateNewsCopy;