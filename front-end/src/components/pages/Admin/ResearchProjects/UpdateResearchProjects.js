import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
    Breadcrumbs, BreadcrumbItem, Button, Input
} from "@nextui-org/react";
import {Select, SelectItem, Avatar, Chip} from "@nextui-org/react";

import { Tooltip } from "antd";
import { DatePicker, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import { getAllTeacher, getTeacherByID } from "../../../../service/TeacherService";
import { getByIdScientific, updateScientificArticle } from "../../../../service/ScientificAricleService";
import { putDetailScientificArticle } from "../../../../service/DetailScientificArticleService";
import { getResearchProjectByID } from "../../../../service/ResearchProjectService";
import { getdeleteListDetailByIdResearchProject } from "../../../../service/DetailResearchProject";
const { Option } = Select;
const UpdateResearchProjects = (props) => {
    //biến cục bộ đặt giá trị mặc định key
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);

    const { id } = useParams();
    const { successNoti, errorNoti, setCollapsedNav } = props;
    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [SelectedStatusDate, setSelectedStatusDate] = useState();
    const [titleData, setTitle] = useState("");
    const [investigatorDate, setInvestigator] = useState();
    const [linkData, setLink] = useState("");
    const [statusDate, setStatus] = useState("");

    const [teacherData, setTeacherData] = useState([]);
    //hangle database


    const getTeachers = async () => {
        try {
            const response = await getAllTeacher();
            await setTeacherData(response.data);

        } catch (error) {
            console.error("Error getAllTeacher:", error);
        }
    };
    
    const handleSelectChange = (keys) => {
        setSelectedKeys(keys);
    };

    const getResearchProjectsByID = async () => {
        try {
            const response = await getResearchProjectByID(id);
            const {
                title,
                status_date,
                investigator,
                status,
                link,
            } = response.data.Research_projects;

            setSelectedStatusDate(status_date)
            setTitle(title)
            setInvestigator(investigator)
            setLink(link)
            setStatus(status)

            //gọi api lấy đối tượng teacher
            // const responseTeacherByID = await getTeacherByID(id_teacher);
            // setSelectedoldValueTeacher(responseTeacherByID.data.id_teacher)
            // setSelectedTeacherUpdate(responseTeacherByID.data.id_teacher);    
        } catch (error) {
            console.error("Error fetching subject:", error);
        }
    };

    const UpdateData = () => {
        try {
            // if (
            //     !titleData ||
            //     !SelectedPublicationDate ||
            //     !publisherData ||
            //     !abstractData ||
            //     !linkData ||
            //     !selectedTeacherUpdate
            // ) {
            //     errorNoti("Vui lòng điền đầy đủ thông tin.");
            //     return;
            // }
            // const data = {
            //     title: titleData,
            //     publication_date: SelectedPublicationDate,
            //     publishers: publisherData,
            //     abstract: abstractData,
            //     link: linkData
            // }
            // updateScientificArticle(id, data)
            //     .then(response => {
            //         const detail_scientific_article ={
            //             id_teacher_old: oldValueTeacherUpdate,
            //             id_teacher_update: selectedTeacherUpdate
            //         }
            //         putDetailScientificArticle(id, detail_scientific_article);
            //         successNoti("Chỉnh sửa dự án nghiên cứu thành công");
            //      })
            //      .catch(error => {
            //         console.error("Error update Scientific Article:", error);
            //  });
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
        
        const fetchData = async () => {
            try {
                const getTeacherInDetailResearchProjects = await getdeleteListDetailByIdResearchProject(id);
                const list_id_teacher = getTeacherInDetailResearchProjects.data.Detail_research_project.map(item => 
                    item.id_teacher
                );
                
                console.log('',list_id_teacher);
                setDefaultSelectedKeys(list_id_teacher); // Set defaultSelectedKeys after fetching data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        

        fetchData();
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

    const hung =defaultSelectedKeys;
    return (
        <div>
            <div className="CreateNews flex flex-col gap-7 items-start">
                <div className="flex items-start justify-between w-full">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/admin/research-projects">Quản lý dự án nghiên cứu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>Chỉnh sửa dự án nghiên cứu</BreadcrumbItem>
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
                                    value={dayjs(SelectedStatusDate)}

                                />
                            </Space>
                        </div>
                        <div>
                            <p className="text-sm">
                                Chọn giáo viên{" "}
                                <span className="text-red-500 font-bold">*</span>
                            </p>
                            <p className="text-sm">
                                Chọn giggggggggggáfo viên{" "}

                                <span className="text-red-500 font-bold">{defaultSelectedKeys}</span>
                            </p>
                            
                            <Select
                                items={teacherData}
                                label="Assigned to"
                                variant="bordered"
                                isMultiline={true}
                                selectionMode="multiple"
                                value={[1]}
                                defaultSelectedKeys={[1]}
                                placeholder="Select a user"
                                labelPlacement="outside"
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
                                        <Avatar alt={teacherData.name_teacher} className="flex-shrink-0" size="sm" src={teacherData.avatar} />
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

                <Button onClick={UpdateData} color="primary" radius="sm">
                    <span className="font-medium">Chỉnh sửa dự án nghiên cứu</span>
                </Button>
            </div>
        </div>
    );
};

export default UpdateResearchProjects;

function SelectMultiple(props) {

    const { Data, handleChange, value } = props;
    return (
        <div className="flex w-full max-w-xs flex-col gap-2">
            
            
        </div>
    )
}
