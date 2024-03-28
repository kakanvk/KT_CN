import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Breadcrumbs, BreadcrumbItem, Button, Input } from "@nextui-org/react";

import { DatePicker, Space, Tooltip, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { getAllTeacher } from "../../../../service/TeacherService";
import "./css.css";

import {
    getResearchProjectByID,
    updateResearchProject,
} from "../../../../service/ResearchProjectService";
import {
    getdeleteListDetailByIdResearchProject,
    updateDetailResearchProject,
} from "../../../../service/DetailResearchProject";
import { putDetailScientificArticle } from "../../../../service/DetailScientificArticleService";
const { Option } = Select;
const UpdateResearchProjects = (props) => {
    //biến cục bộ đặt giá trị mặc định key
    const { id } = useParams();
    const { successNoti, errorNoti, setCollapsedNav } = props;
    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [SelectedStatusDate, setSelectedStatusDate] = useState();
    const [titleData, setTitle] = useState("");
    const [investigatorDate, setInvestigator] = useState();
    const [linkData, setLink] = useState("");
    const [statusData, setStatus] = useState("");

    const [teacherData, setTeacherData] = useState([]);
    //hangle database

    const handleTeacherChange = (value, option) => {
        setSelectedKeys(value);
    };

    const getTeachers = async () => {
        try {
            const response = await getAllTeacher();
            await setTeacherData(response.data);
            const responseDataTeacherArray =
                await getdeleteListDetailByIdResearchProject(id);
            setSelectedKeys(responseDataTeacherArray.data.id_teacher_array);
            console.log(responseDataTeacherArray.data.id_teacher_array);
        } catch (error) {
            console.error("Error getAllTeacher:", error);
        }
    };

    const getResearchProjectsByID = async () => {
        try {
            const response = await getResearchProjectByID(id);
            const { title, status_date, investigator, status, link } =
                response.data.Research_projects;

            setSelectedStatusDate(status_date);
            setTitle(title);
            setInvestigator(investigator);
            setLink(link);
            setStatus(status);
        } catch (error) {
            console.error("Error fetching subject:", error);
        }
    };

    const UpdateData = () => {
        try {
            if (
                !titleData ||
                !SelectedStatusDate ||
                !investigatorDate ||
                !statusData ||
                !linkData ||
                selectedKeys.length === 0
            ) {
                errorNoti("Vui lòng điền đầy đủ thông tin.");
                return;
            }

            if (isNaN(investigatorDate)) {
                errorNoti("Vui lòng điền investigator là số");
                return;
            }

            const data = {
                title: titleData,
                status_date: SelectedStatusDate,
                investigator: parseInt(investigatorDate),
                status: statusData,
                link: linkData,
            };
            console.log(data);

            updateResearchProject(id, data)
                .then((response) => {
                    const research_projects = {
                        id_teacher: selectedKeys,
                    };
                    //console.log(research_projects)
                    updateDetailResearchProject(id, research_projects);
                    successNoti("Chỉnh sửa dự án nghiên cứu thành công");
                })
                .catch((error) => {
                    console.error("Error update Scientific Article:", error);
                });
        } catch (error) {
            console.error("Error update subject:", error);
        }
    };
    useEffect(() => {
        getResearchProjectsByID();
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
        getTeachers();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleToggleLayout = (_layout) => {
        setLayout(_layout);
        if (_layout === "col") {
            setCollapsedNav(false);
        } else {
            setCollapsedNav(true);
        }
    };

    //////note
    const onChangeStatusDate = (date, dateString) => {
        setSelectedStatusDate(dateString);
    };

    return (
        <div>
            <div className="CreateNews flex flex-col gap-7 items-start">
                <div className="flex items-start justify-between w-full">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/admin/research-projects">
                                Quản lý dự án nghiên cứu
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            Chỉnh sửa dự án nghiên cứu
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
                                    Nhập số nhà nghiên cứu (investigator){" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={investigatorDate}
                            onValueChange={setInvestigator}
                        />

                        <Input
                            label={
                                <p>
                                    Nhập trạng thái (status){" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={statusData}
                            onValueChange={setStatus}
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
                                Ngày ngày báo cáo (status date){" "}
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </p>
                            <Space direction="vertical">
                                <DatePicker
                                    className="w-[400px] h-[42px] mt-1"
                                    onChange={onChangeStatusDate}
                                    value={dayjs(SelectedStatusDate)}
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
                                className="w-[400px] mt-1"
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
                        Chỉnh sửa dự án nghiên cứu
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default UpdateResearchProjects;
