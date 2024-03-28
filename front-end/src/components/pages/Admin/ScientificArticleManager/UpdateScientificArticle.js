import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Breadcrumbs, BreadcrumbItem, Button, Input } from "@nextui-org/react";
import { Select, Tooltip } from "antd";
import { DatePicker, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import { getAllTeacher } from "../../../../service/TeacherService";
import {
    getByIdScientific,
    getByIdscientific_article,
    getone,
    updateScientificArticle,
} from "../../../../service/ScientificAricleService";
import {
    putDetailScientificArticle,
    getDetailScientificArticleById,
} from "../../../../service/DetailScientificArticleService";
const { Option } = Select;
const UpdateScientificArticle = (props) => {
    const { id } = useParams();
    const { successNoti, errorNoti, setCollapsedNav } = props;
    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);
    const [SelectedPublicationDate, setSelectedPublicationDate] = useState();
    const [titleData, setTitle] = useState("");
    const [publisherData, setPublisher] = useState("");
    const [linkData, setLink] = useState("");
    const [abstractData, setAbstracts] = useState("");
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [teacherData, setTeacherData] = useState([]);

    //hangle database
    const getTeachers = async () => {
        try {
            const response = await getAllTeacher();
            const filteredTeacherData = response.data.map((teacher) => ({
                ...teacher,
                id_teacher: teacher.id_teacher,
            }));
            setTeacherData(filteredTeacherData);
            const responseDetails = await getDetailScientificArticleById(id);
            setSelectedKeys(responseDetails.data.id_teacher_array);
            console.log(responseDetails.data.id_teacher_array);
        } catch (error) {
            console.error("Error getAllTeacher:", error);
        }
    };

    const getScientificArticleByID = async () => {
        try {
            const response = await getone(id);
            const { title, publication_date_old, publishers, abstract, link } =
                response.data.scientific_article;
            console.log(
                "Response data getone:",
                response.data.scientific_article
            );
            setSelectedPublicationDate(publication_date_old);
            setTitle(title);
            setPublisher(publishers);
            setLink(link);
            setAbstracts(abstract);
        } catch (error) {
            console.error("Error fetching subject:", error);
        }
    };

    const UpdateData = () => {
        try {
            if (
                !titleData ||
                SelectedPublicationDate == "" ||
                !publisherData ||
                !abstractData ||
                !linkData ||
                selectedKeys.length === 0
            ) {
                errorNoti("Vui lòng điền đầy đủ thông tin.");
                return;
            }

            const data = {
                title: titleData,
                publication_date: SelectedPublicationDate,
                publishers: publisherData,
                abstract: abstractData,
                link: linkData,
            };
            updateScientificArticle(id, data)
                .then((response) => {
                    const detail_scientific_article = {
                        id_teacher: selectedKeys,
                    };
                    //console.log(detail_scientific_article);
                    putDetailScientificArticle(id, detail_scientific_article);
                    successNoti("Chỉnh sửa bài báo khoa học thành công");
                })
                .catch((error) => {
                    console.error("Error update Scientific Article:", error);
                });
        } catch (error) {
            console.error("Error update subject:", error);
        }
    };
    useEffect(() => {
        getTeachers();
        getScientificArticleByID();

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

    const handleTeacherChange = (value, option) => {
        setSelectedKeys(value);
    };

    const handleToggleLayout = (_layout) => {
        setLayout(_layout);
        if (_layout === "col") {
            setCollapsedNav(false);
        } else {
            setCollapsedNav(true);
        }
    };

    //////note
    const onChangePublicationDate = (date, dateString) => {
        setSelectedPublicationDate(dateString);
    };

    return (
        <div>
            <div className="CreateNews flex flex-col gap-7 items-start">
                <div className="flex items-start justify-between w-full">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/admin/scientific-article">
                                Quản lý bài báo khoa học
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            Chỉnh sửa bài báo khoa học
                        </BreadcrumbItem>
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
                <div className="flex flex-col w-full gap-8 lg:flex-row">
                    <div className="flex flex-1 flex-col gap-[20px] w-full">
                        <Input
                            label={
                                <p>
                                    Nhập tiêu đề{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={titleData}
                            onValueChange={setTitle}
                        />
                        <Input
                            label={
                                <p>
                                    Nhập nhà xuất bản (publishers){" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={publisherData}
                            onValueChange={setPublisher}
                        />
                        <Input
                            label={
                                <p>
                                    Nhập tóm tắt (abstract){" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={abstractData}
                            onValueChange={setAbstracts}
                        />
                        <Input
                            label={
                                <p>
                                    Nhập liên kết (link){" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={linkData}
                            onValueChange={setLink}
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-[20px] w-full">
                        <div>
                            <p className="text-sm">
                                Ngày xuất bản (publication date){" "}
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </p>
                            <Space direction="vertical">
                                <DatePicker
                                    className="w-[400px] h-[42px] mt-1"
                                    onChange={onChangePublicationDate}
                                    value={dayjs(SelectedPublicationDate)}
                                />
                            </Space>
                        </div>
                        <div>
                            <p className="text-sm">
                                Chọn giáo viên{" "}
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </p>
                            <Select
                                mode="multiple"
                                className="w-[400px] h-[42px] mt-1"
                                placeholder="Select one or more teachers"
                                value={selectedKeys}
                                onChange={handleTeacherChange}
                            >
                                {teacherData.map((teacher) => (
                                    <Option
                                        key={teacher.id_teacher}
                                        value={teacher.id_teacher}
                                    >
                                        {teacher.name_teacher}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>

                <Button onClick={UpdateData} color="primary" radius="sm">
                    <span className="font-medium">
                        Chỉnh sửa bài báo khoa học
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default UpdateScientificArticle;
