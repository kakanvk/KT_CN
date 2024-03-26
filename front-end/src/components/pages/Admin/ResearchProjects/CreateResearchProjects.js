import React, { useState, useEffect } from "react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Input,
    Select,
    SelectItem,
    Avatar,
    Chip
} from "@nextui-org/react";
import { Tooltip } from "antd";
import { DatePicker, Space } from 'antd';
import { Link } from "react-router-dom";
import { getAllTeacher } from "../../../../service/TeacherService";
import { postResearchProject } from "../../../../service/ResearchProjectService";
import { postDetailResearchProject } from "../../../../service/DetailResearchProject";
const { Option } = Select;
const CreateResearchProjects = (props) => {
    const { successNoti, errorNoti, setCollapsedNav } = props;

    const [selectedTeacher, setSelectedTeacher] = useState("");
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
    const handleSelectChange = (keys) => {
        console.log('Selected Keys:', keys);
        setSelectedKeys(keys);
    };
    const SaveData = async () => {
        try {
            if (!titleData || !investigatorDate || !statusDate || !SelectedStatusDate || !linkData || !selectedTeacher) {
                errorNoti("Vui lòng điền đầy đủ thông tin.");
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
                        id_teacher: selectedTeacher
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

    const handleTeacherChange = (value, option) => {
        setSelectedTeacher(value);
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
                <div className="flex w-full gap-8">
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
                            type="number"
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
                                    className="w-[300px] h-[42px] mt-1"
                                    onChange={onChangeStatusDate}

                                />
                            </Space>
                        </div>
                        <div>
                            <p className="text-sm">
                                Chọn giáo viên{" "}
                                <span className="text-red-500 font-bold">*</span>
                            </p>
                            {/* <Select
                                defaultValue="Lựa chọn"
                                onChange={handleTeacherChange}
                                className="w-[300px] h-[42px] mt-1"
                            >
                                {teacherData.map((teachers) => (
                                    <Option
                                        key={teachers.id_teacher}
                                        value={teachers.id_teacher}
                                    >
                                        {teachers.name_teacher}
                                    </Option>
                                ))}
                            </Select> */}

                            <Select
                                items={teacherData}
                                label="Assigned to"
                                variant="bordered"
                                isMultiline={true}
                                selectionMode="multiple"
                                placeholder="Select a user"
                                labelPlacement="outside"
                                defaultSelectedKeys= { selectedKeys }
                                onSelectionChange={handleSelectChange}
                                classNames={{
                                    base: "max-w-xs",
                                    trigger: "min-h-unit-12 py-2",
                                }}
                                renderValue={(items) => {
                                    return (
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((item) => (
                                                <Chip key={item.key}>{item.data.name_teacher}</Chip>
                                            ))}
                                        </div>
                                    );
                                }}
                            >
                                {(teacherData) => (
                                    <SelectItem key={teacherData.id_teacher} textValue={teacherData.name_teacher}>
                                        <div className="flex gap-2 items-center">
                                            {/* //<Avatar alt={teacherData.name} className="flex-shrink-0" size="sm" src={teacherData.avatar} /> */}
                                            <div className="flex flex-col">
                                                <span className="text-small">{teacherData.name_teacher}</span>
                                                <span className="text-tiny text-default-400">{teacherData.email}</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                )}
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
