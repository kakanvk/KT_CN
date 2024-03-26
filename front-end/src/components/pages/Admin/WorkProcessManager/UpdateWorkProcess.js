import { getWorkProcessByID, updateWorkProcess }
    from "../../../../service/WorkProcessService";
import dayjs from "dayjs";

import React, { useState, useEffect } from "react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Input,
} from "@nextui-org/react";
import { Tooltip } from "antd";
import { DatePicker, Space } from 'antd';
import { Link, useParams } from "react-router-dom";

const UpdateWorkProcess = (props) => {
    const { id } = useParams();
    const { successNoti, errorNoti, setCollapsedNav } = props;
    const [Academic_Institution, setAcademicInstitution] = useState("");
    const [Address, setAddress] = useState("");
    const [Position, setPosition] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);

    const onChangeYear = (date, dateString) => {
        setSelectedDate(dateString);
    };
    //hangle database

    const UpdateData = async () => {
        try {
            if (!Academic_Institution || !Address || !Position || !selectedDate) {
                errorNoti("Vui lòng điền đầy đủ thông tin.");
                return;
            }
            const data = {
                time: selectedDate,
                academic_institution: Academic_Institution,
                address: Address,
                position: Position,
            }
            await updateWorkProcess(id, data)
            console.table(data);
            successNoti("cập nhật thành công");
        } catch (error) {
            console.error("Error save Work Process:", error);
        }
    };

    const GetWorkProcessByID = async () => {
        try {
            const response = await getWorkProcessByID(id);
            const {
                time,
                academic_institution,
                address,
                position
            } = response.data.work_process;
            setSelectedDate(time);
            setAcademicInstitution(academic_institution);
            setAddress(address);
            setPosition(position);
        } catch (error) {
            console.error("Error fetching subject:", error);
        }
    }
    useEffect(() => {
        GetWorkProcessByID();
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
                            <Link to="/admin/work-process">Quản lý quá trình</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>Thêm quá trình</BreadcrumbItem>
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
                                    Nhập cơ sở giáo dục đại học{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"

                            isClearable
                            radius="sm"
                            value={Academic_Institution}
                            onValueChange={setAcademicInstitution}
                        />

                        <Input
                            label={
                                <p>
                                    Nhập tên địa chỉ{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"

                            isClearable
                            radius="sm"
                            value={Address}
                            onValueChange={setAddress}

                        />
                        <Input
                            label={
                                <p>
                                    Nhập chức vụ{" "}
                                    <span className="text-red-500 font-bold">
                                        *
                                    </span>
                                </p>
                            }
                            placeholder=" "
                            labelPlacement="outside"

                            isClearable
                            radius="sm"
                            value={Position}
                            onValueChange={setPosition}
                        />

                    </div>
                    <div className="flex flex-1 flex-col gap-[20px] w-full">
                        <div>
                            <p className="text-sm">
                                Nhập thời gian{" "}
                                <span className="text-red-500 font-bold">*</span>
                            </p>
                            <Space direction="vertical">

                                <DatePicker
                                    className="w-[300px] h-[42px] mt-1"
                                    onChange={onChangeYear}
                                    value={dayjs(selectedDate)}
                                />
                            </Space>
                        </div>

                    </div>
                </div>

                <Button onClick={UpdateData} color="primary" radius="sm">
                    <span className="font-medium">Chỉnh sửa</span>
                </Button>
            </div>
        </div>
    );
};

export default UpdateWorkProcess;
