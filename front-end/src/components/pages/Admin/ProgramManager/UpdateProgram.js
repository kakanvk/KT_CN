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
import { Upload, Select, message, Tooltip, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { getAllCategories } from "../../../../service/CategoryService";
import { GetNewCanUpdate, PutNewsByID } from "../../../../service/NewsService";
import { Link, useParams } from "react-router-dom";
import { getAllMajors} from "../../../../service/MajorService";
import { GetProgramsByID, PutProgramsByID } from "../../../../service/ProgramService";
const UpdateProgram = (props) => {
    const { setCollapsedNav, setSpinning, successNoti, errorNoti, TypeNews} = props;
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [CategoryData, setCategoryData] = useState([]);
    const [Majors, setMajors]= useState([]);
    const [SelectedMajors, setSelectedMajors] = useState("");
    const [nameProgram, setNameProgram] = useState("");
    const [contentProgram, setContentProgram] = useState("");
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
        setSpinning(true);
        try {
                if (!SelectedMajors || !contentProgram || !nameProgram) {
                    console.error("Vui lòng điền đầy đủ thông tin.");
                    return;
                }
                const data = {
                    id_user: 1,
                    id_major: SelectedMajors,
                    content: contentProgram,
                    name_program: nameProgram,
                };
                const response = await PutProgramsByID(id, data);
                setSpinning(false);
                successNoti("Cập nhật thành công");
            } catch (error) {
                console.error("Lỗi khi gửi dữ liệu:", error);
                setSpinning(false);
                errorNoti("Cập nhật thất bại");
        }
    };

    const DetailPrograms = async () => {
        setSpinning(true);
        try {
            const response = await GetProgramsByID(id);
            console.log("DetailProgramData:", response.data);
            const programData = response.data.program;
            console.table(programData);
            if (programData) {
                const { id_major, content, name_program } = programData;

                setContentProgram(content);
                setNameProgram(name_program);
                setSelectedMajors(id_major);
            } else {
                console.error("No data found in the response");
            }
            setSpinning(false);
        } catch (error) {
            console.error("Error fetching newsDetailData:", error);
            setSpinning(false);
        }
    };


    const MajorsAll = async () =>{
        try {
            const response = await getAllMajors();
            console.log("departments data:", response.data);
            setMajors(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    useEffect(() => {

        DetailPrograms();
        MajorsAll();
        
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

    const handleMajorsChange = (value, option) => {
        setSelectedMajors(value);
    };

    const handleProgramChange = (event, editor) => {
        const data = editor.getData();
        setContentProgram(data);
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
                        <BreadcrumbItem>Chỉnh sửa bài viết</BreadcrumbItem>
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
                            <div>
                                <div>
                                    <p className="text-sm">
                                        Chọn chuyên ngành{" "}
                                        <span className="text-red-500 font-bold">*</span>
                                    </p>
                                    <Select
                                        defaultValue={SelectedMajors? SelectedMajors: "Chọn loại"}
                                        value={SelectedMajors}
                                        onChange={handleMajorsChange}
                                        size="large"
                                        className="w-full"
                                    >
                                        {Majors.map((Major) => (
                                            <Option
                                                key={Major.id_majors}
                                                value={Major.id_major}
                                            >
                                                {Major.name_vi}({Major.name_en})
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
                                data={contentProgram}
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
                
                <Button onClick={Update} color="primary" radius="sm">
                    <span className="font-medium">Tạo chương trìnht</span>
                </Button>
            </div>
        </div>
    );
};

export default UpdateProgram;
