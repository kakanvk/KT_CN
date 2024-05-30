import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Avatar,
    Input,
} from "@nextui-org/react";
import { Upload, Select, message, Tooltip } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { SaveDataNews } from "../../../../service/NewsService";
import { getAllCategories } from "../../../../service/CategoryService";

import { Link } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { getAllMajors } from "../../../../service/MajorService";
import { SaveProgramsAll } from "../../../../service/ProgramService";



const { Option } = Select;

const CreateProgram = (props) => {
    const { successNoti, errorNoti, setCollapsedNav, TypeNews } = props;
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [SelectedMajors, setSelectedMajors] = useState("");

    const [CategoryData, setCategoryData] = useState([]);
    const [MajorsData, setMajorsData] = useState([]);


    const [titleEN, setTitleEN] = useState("");
    const [titleVI, setTitleVI] = useState("");
    const [nameProgram, setNameProgram] = useState("");
    const [contentProgram, setContentProgram] = useState("");

    const [contentEN, setContentEN] = useState("");
    const [contentVI, setContentVI] = useState("");
    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);


    //hangle database
    const getCategorys = async () => {
        try {
            const response = await getAllMajors();
            console.log("News data:", response.data);
            setMajorsData(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const SaveData = async () => {
        try {
            if (!SelectedMajors || !contentProgram || !nameProgram) {
                throw new Error("Vui lòng điền đầy đủ thông tin.");
            }
            const data = {
                id_major: SelectedMajors,
                content: contentProgram,
                name_program: nameProgram,
            };
            await SaveProgramsAll(data);
            successNoti("Tạo chương trình thành công");
        } catch (error) {
            errorNoti(error.message);
        }
    };
    

    useEffect(() => {
        getCategorys();
        console.log("dhudn", MajorsData);
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

    //hangle data save
    const handleENChange = (event, editor) => {
        const data = editor.getData();
        setContentEN(data);
    };

    const handleVIChange = (event, editor) => {
        const data = editor.getData();
        setContentVI(data);
    };

    const handleProgramChange = (event, editor) => {
        const data = editor.getData();
        setContentProgram(data);
    };


    const handleCategoryChange = (value, option) => {
        setSelectedCategory(value);
    };

    const handleMajorsChange = (value, option) => {
        setSelectedMajors(value);
    };

    //hangle Layout 
    const handleToggleLayout = (_layout) => {
        setLayout(_layout);
        if (_layout === "col") {
            setCollapsedNav(false);
        } else {
            setCollapsedNav(true);
        }
    };

    const compressImage = async (imageFile) => {
        try {
            const options = {
                maxSizeMB: 1, // Giới hạn kích thước ảnh nén dưới 1MB (tùy chỉnh theo nhu cầu của bạn)
                maxWidthOrHeight: 1920, // Giới hạn kích thước chiều rộng hoặc chiều cao của ảnh (tùy chỉnh theo nhu cầu của bạn)
            };
            const compressedFile = await imageCompression(imageFile, options);
            return compressedFile;
        } catch (error) {
            throw error;
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
        return isJpgOrPng;
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
            children: "<p></p>",
        },
        {
            key: "2",
            label: "Tạo bài viết tiếng anh",
            children: "<p></p>",
        },
    ];

    return (
        <div>
            <div className="CreateNews flex flex-col gap-7 items-start">
                <div className="flex items-start justify-between w-full">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                        {TypeNews === "News" ?
                            <>
                                <BreadcrumbItem>
                                    <Link to="/admin/post">Quản lý bài viết</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>Thêm bài viết</BreadcrumbItem>
                            </>
                            :
                            <>
                                <BreadcrumbItem>
                                    <Link to="/admin/post">Quản lý chương trình</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>Thêm chương trình</BreadcrumbItem>
                            </>
                        };
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

                        <div>
                            <p className="text-sm">
                                Thể loại{" "}
                                <span className="text-red-500 font-bold">*</span>
                            </p>
                            <Select
                                defaultValue="Chọn loại"
                                onChange={handleMajorsChange}
                                size="large"
                            >
                                {MajorsData.map((Majors) => (
                                    <Option
                                        key={Majors.id_major}
                                        value={Majors.id_major}
                                    >
                                        {Majors.name_vi} ({Majors.name_en})
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className={`flex w-full gap-${layout === "col" ? "10" : "8"} flex-${layout}`}>
                    <div
                        className={`${layout === "col" ? "w-full" : "w-[60%]"
                            } flex-1 flex flex-col gap-6`}
                    >
                        <Input
                            label={
                                <p>
                                    Nhập tên chương trình{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder="Nhập tên chương trình"
                            labelPlacement="outside"
                            startContent={
                                <Avatar
                                    className="w-5 h-5"
                                    src="https://flagcdn.com/vn.svg"
                                />
                            }
                            isClearable
                            radius="sm"
                            value={nameProgram}
                            onValueChange={setNameProgram}
                        />

                        <div className="flex flex-col gap-2">
                            <p className="text-sm">
                                Nội dung chương trình đào tạo{" "}
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </p>
                            <CKEditor
                                editor={ClassicEditor}
                                data={items[0].children}
                                onChange={(event, editor) => {
                                    handleProgramChange(event, editor);
                                }}
                                config={{
                                    ckfinder: {
                                        uploadUrl: `${process.env.REACT_APP_API_DOMAIN}/admin/upload-image`,
                                    },
                                }}
                            />
                        </div>
                    </div>

                </div>
                <Button onClick={SaveData} color="primary" radius="sm">
                    <span className="font-medium">{TypeNews === "News" ? "Tạo bài viết" : "Tạo chương trình"}</span>
                </Button>
            </div>
        </div>
    );
};

export default CreateProgram;