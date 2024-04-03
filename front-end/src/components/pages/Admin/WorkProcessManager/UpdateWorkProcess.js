import React, { useState, useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem, Button, Input } from "@nextui-org/react";
import { Select, Tooltip } from "antd";
import { DatePicker, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import { getAllTeacher } from "../../../../service/TeacherService";
import "./css.css";
import {
    getWorkProcessByID,
    postWorkProcess,
    updateWorkProcess,
} from "../../../../service/WorkProcessService";
import {
    getDetailWorkProcessById,
    postDetailWorkProcess,
    putDetailWorkProcess,
} from "../../../../service/DetailWorkProcessServe";
const { Option } = Select;
const UpdateWorkProcess = (props) => {
    const { id } = useParams();
    const { successNoti, errorNoti, setCollapsedNav } = props;
    const [teacherData, setTeacherData] = useState([]);
    const [academic_institution, setAcademicInstitution] = useState("");
    const [address, setAddress] = useState("");
    const [time, setTime] = useState("");
    const [position, setPosition] = useState("");
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);
    //hangle database

    const getTeachers = async () => {
        try {
            const response = await getAllTeacher();
            const filteredTeacherData = response.data.map((teacher) => ({
                ...teacher,
                id_teacher: teacher.id_teacher,
            }));
            setTeacherData(filteredTeacherData);
            const responseDetails = await getDetailWorkProcessById(id);
            setSelectedKeys(responseDetails.data.id_teacher_array);
            console.log(responseDetails.data);
        } catch (error) {
            console.error("Error getAllTeacher:", error);
        }
    };

    const Update = async () => {
        try {
            if (
                !address ||
                !position ||
                !academic_institution ||
                !time ||
                selectedKeys.length === 0
            ) {
                errorNoti("Vui lòng điền đầy đủ thông tin.");
                return;
            }
            const data = {
                time: time,
                academic_institution: academic_institution,
                address: address,
                position: position,
            };

            updateWorkProcess(id, data)
                .then((response) => {
                    const id_work_process =
                        response.data.work_process.id_work_process;

                    const DataDetailWorkProcess = {
                        id_work_process: id_work_process,
                        id_teacher: selectedKeys,
                    };
                    console.log(DataDetailWorkProcess);
                    if (id_work_process) {
                        putDetailWorkProcess(id, DataDetailWorkProcess)
                            .then(() => {
                                successNoti("Cập nhật thành công");
                            })
                            .catch((error) => {
                                console.error(
                                    "Error save Detail Scientific Article:",
                                    error
                                );
                                errorNoti("Cập nhật thất bại");
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error save Scientific Article:", error);
                });
        } catch (error) {
            console.error("Error save Scientific Article:", error);
        }
    };

    const getWorkProcess = async () => {
        try {
            const response = await getWorkProcessByID(id);

            setAcademicInstitution(
                response.data.work_process.academic_institution
            );
            setAddress(response.data.work_process.address);
            setTime(response.data.work_process.time);
            setPosition(response.data.work_process.position);
        } catch (error) {
            console.error("Error fetching subject:", error);
        }
    };
    useEffect(() => {
        getWorkProcess();
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
        setSelectedKeys(value);
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
                            <Link to="/admin/work-process">
                                Quản lý nơi làm việc
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>Thêm nơi làm việc</BreadcrumbItem>
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
                                    Nơi là việc{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={academic_institution}
                            onValueChange={setAcademicInstitution}
                        />
                        <Input
                            label={
                                <p>
                                    Địa chỉ làm việc (Address){" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={address}
                            onValueChange={setAddress}
                        />
                        <Input
                            label={
                                <p>
                                    Vị trí làm việc (position){" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={position}
                            onValueChange={setPosition}
                        />
                        <Input
                            label={
                                <p>
                                    Thời gian làm việc{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={time}
                            onValueChange={setTime}
                        />
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

                <Button onClick={Update} color="primary" radius="sm">
                    <span className="font-medium">Tạo bài báo khoa học</span>
                </Button>
            </div>
        </div>
    );
};

export default UpdateWorkProcess;
