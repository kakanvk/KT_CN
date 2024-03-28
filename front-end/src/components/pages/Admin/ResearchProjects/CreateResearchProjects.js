import React, { useState, useEffect } from "react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Input,
} from "@nextui-org/react";
import { Tooltip, Select} from "antd";
import { DatePicker, Space } from 'antd';
import { Link } from "react-router-dom";
import { getAllTeacher } from "../../../../service/TeacherService";
import { postResearchProject } from "../../../../service/ResearchProjectService";
import { postDetailResearchProject } from "../../../../service/DetailResearchProject";
const { Option } = Select;
const CreateResearchProjects = (props) => {
    const { successNoti, errorNoti, setCollapsedNav } = props;

    const [teacherData, setTeacherData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [SelectedStatusDate, setSelectedStatusDate] = useState();
    const [titleData, setTitle] = useState("");
    const [investigatorDate, setInvestigator] = useState();
    const [linkData, setLink] = useState("");
    const [statusDate, setStatus] = useState("");

    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);
    const onChangeStatusDate = (date, dateString) => {
        setSelectedStatusDate(dateString);
    };
    //hangle database

    const getTeachers = async () => {
        try {
            const response = await getAllTeacher();
            setTeacherData(response.data);
        } catch (error) {
            console.error("Error getAllTeacher:", error);
        }
    };

    const handleTeacherChange = (value, option) => {
        setSelectedKeys(value);
    };

    const SaveData = async () => {
        try {
            if (!titleData || !investigatorDate || !statusDate || !SelectedStatusDate || !linkData || selectedKeys.length === 0) {
                errorNoti("Vui lòng điền đầy đủ thông tin.");
                return;
            }
            if (isNaN(investigatorDate)) {
                errorNoti("Vui lòng nhập investigator là số");
                return;
            }

            const data = {
                title: titleData,
                status_date: SelectedStatusDate,
                investigator: investigatorDate,
                status: statusDate,
                link: linkData
            }

            postResearchProject(data)
                .then(response => {
                    const id_research_project = response.data.id_research_project;
                    const DataDetailSubject = {
                        id_research_project: id_research_project,
                        id_teacher: selectedKeys
                    }
                    console.log(DataDetailSubject)
                    if (id_research_project) {
                        postDetailResearchProject(DataDetailSubject)
                            .then(() => {
                                successNoti("Tạo dự án nghiên cứu thành công");
                            })
                            .catch(error => {
                                console.error("Error save Detail research project:", error);
                            });
                    }
                })
                .catch(error => {
                    console.error("Error save research project:", error);
                });
        } catch (error) {
            console.error("Error save Scientific Article:", error);
        }
    };
    useEffect(() => {
        getTeachers();
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

    //hangle Layout 
    const handleToggleLayout = (_layout) => {
        setLayout(_layout);
        if (_layout === "col") {
            setCollapsedNav(false);
        } else {
            setCollapsedNav(true);
        }
    };
    return (
        <div>
            <div className="CreateNews flex flex-col gap-7 items-start">
                <div className="flex items-start justify-between w-full">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/admin/scientific-article">Quản lý dự án nghiên cứu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>Thêm dự án nghiên cứu</BreadcrumbItem>
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
                            value={statusDate}
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
                                <span className="text-red-500 font-bold">*</span>
                            </p>
                            <Space direction="vertical">
                                <DatePicker
                                    className="w-[400px] h-[42px] mt-1"
                                    onChange={onChangeStatusDate}

                                />
                            </Space>
                        </div>
                        <div>
                            <p className="text-sm">
                                Chọn giáo viên{" "}
                                <span className="text-red-500 font-bold">*</span>
                            </p>
                        
                                <Select
                                    mode="multiple"
                                    className="w-[400px] h-[42px] mt-1"
                                    placeholder="Select one or more teachers"
                                    value={selectedKeys}
                                    onChange={handleTeacherChange}
                                >
                                    {teacherData.map(teacher => (
                                        <Option key={teacher.id_teacher} value={teacher.id_teacher}>
                                            {teacher.name_teacher}
                                        </Option>
                                    ))}
                                </Select>
                        </div>

                    </div>

                </div>

                <Button onClick={SaveData} color="primary" radius="sm">
                    <span className="font-medium">Tạo dự án nghiên cứu</span>
                </Button>
            </div>
        </div>
    );
};

export default CreateResearchProjects;
