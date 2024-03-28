import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Breadcrumbs, BreadcrumbItem, Button, Input } from "@nextui-org/react";
import { Select, Tooltip } from "antd";
import { DatePicker, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import { getAllMajors } from "../../../../service/MajorService";
import { getAllTeacher } from "../../../../service/TeacherService";
import { getDetailByIdSubject, updateDetailByIdSubject } from "../../../../service/DetailSubjectService";
import {
    getSubjectByID,
    updateSubject,
} from "../../../../service/SubjectService";
const { Option } = Select;
const UpdateSubject = (props) => {
    const { id } = useParams();
    const { successNoti, errorNoti, setCollapsedNav } = props;
    const [nameVi, setNameVi] = useState("");
    const [nameEn, setNameEn] = useState("");
    const [institutions, setInstitutions] = useState("");
    const [studyObject, setStudyObject] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("");
    const [selectedYear, setSelectedYear] = useState(2000);
    const [MajorsData, setMajorsData] = useState([]);
    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [teacherData, setTeacherData] = useState([]);
    
    //hangle database
    const getMajors = async () => {
        try {
            const response = await getAllMajors();
            setMajorsData(response.data);
        } catch (error) {
            console.error("Error AllMajors:", error);
        }
    };

    const getTeachers = async () => {
        try {
            const response = await getAllTeacher();
            setTeacherData(response.data);
            const responseDetails = await getDetailByIdSubject(id);
            setSelectedKeys(responseDetails.data.id_teacher_array)
            //console.log(responseDetails.data.id_teacher_array);
        } catch (error) {
            console.error("Error getAllTeacher:", error);
        }
    };

    const getDetailSubject = async () => {
        try {
            const response = await getSubjectByID(id);
            const {
                majors,
                name_vi,
                name_en,
                study_object,
                beginning_year,
                institutions,
            } = response.data.subject;

            setNameVi(name_vi);
            setNameEn(name_en);
            setStudyObject(study_object);
            setSelectedYear(beginning_year);
            setInstitutions(institutions);
            setSelectedMajor(majors.id_major);

        } catch (error) {
            console.error("Error fetching subject:", error);
        }
    };

    const UpdateData = () => {
        try {
            if (
                !selectedMajor ||
                !nameVi ||
                !nameEn ||
                !studyObject ||
                !selectedYear ||
                !institutions ||
                selectedKeys.length === 0
            ) {
                errorNoti("Vui lòng điền đầy đủ thông tin.");
                return;
            }
            const data = {
                id_major: selectedMajor,
                name_vi: nameVi,
                name_en: nameEn,
                study_object: studyObject,
                beginning_year: selectedYear,
                institutions: institutions,
            };

            updateSubject(id, data)
                .then(response => {
                    const detail_subject_article ={
                        id_teacher: selectedKeys
                    }
                    updateDetailByIdSubject(id, detail_subject_article);
                    successNoti("Chỉnh sửa môn học thành công");
                })
                .catch(error => {
                    console.error("Error update subject:", error);
                });
        } catch (error) {
            console.error("Error update subject:", error);
        }
    };
    useEffect(() => {
        getMajors();
        getDetailSubject();
        getTeachers();
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setLayout("col");
                setDisableRowLayout(true);
            } else {
                setDisableRowLayout(false);
            }
            //console.log(window.innerWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMajorChange = (value, option) => {
        setSelectedMajor(value);
    };

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
    const onChangeYear = (date, dateString) => {
        //console.log("year1", selectedYear);
        setSelectedYear(dateString);
    };

    return (
        <div>
            <div className="CreateNews flex flex-col gap-7 items-start">
                <div className="flex items-start justify-between w-full">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/admin/subject">Quản lý môn học</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>Chỉnh sửa môn học</BreadcrumbItem>
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
                                    Nhập tên môn học tiếng việt{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder="Nhập tên môn học"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={nameVi}
                            onValueChange={setNameVi}
                        />
                        <Input
                            label={
                                <p>
                                    Nhập tên môn học tiếng anh{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder="Nhập tên môn học"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={nameEn}
                            onValueChange={setNameEn}
                        />
                        <Input
                            label={
                                <p>
                                    Nhập đối tượng nghiên cứu{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder="Nhập đối tượng"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={studyObject}
                            onValueChange={setStudyObject}
                        />
                        <Input
                            label={
                                <p>
                                    Nhập thể chế{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder="Nhập thể chế"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={institutions}
                            onValueChange={setInstitutions}
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-[18px] w-full">
                        <div>
                            <p className="text-sm">
                                Chuyên ngành{" "}
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </p>
                            <Select
                                defaultValue="Chọn chuyên ngành"
                                value={selectedMajor}
                                onChange={handleMajorChange}
                                className="w-[400px] h-[42px] mt-1"
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
                        <div>
                            <p className="text-sm">
                                Năm bắt đầu{" "}
                                <span className="text-red-500 font-bold">
                                    *
                                </span>
                            </p>
                            <Space direction="vertical">
                                <DatePicker
                                    className="w-[400px] h-[42px] mt-1"
                                    onChange={onChangeYear}
                                    picker="year"
                                    format="YYYY"
                                    value={dayjs().year(selectedYear)}
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

                <Button onClick={UpdateData} color="primary" radius="sm">
                    <span className="font-medium">Chỉnh sửa môn học</span>
                </Button>
            </div>
        </div>
    );
};

export default UpdateSubject;
