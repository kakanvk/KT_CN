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
import { Link, useParams } from "react-router-dom";
import { getTeacherByID, putTeacher } from "../../../../service/TeacherService";
const UpdateTeacher = (props) => {
    const { setCollapsedNav, setSpinning, successNoti, errorNoti, TypeNews } =
        props;
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [nameTeacher, setNameTeacher] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [academicTitle, setAcademicTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [researchGroup, setResearchGroup] = useState("");
    const [degree, setDegree] = useState("");
    const [researchArea, setResearchArea] = useState("");
    const [unit, setUnit] = useState("");
    const [address, setAddress] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [gg_site, setGg_site] = useState("");
    const [gg_scholar, setGg_scholar] = useState("");
    const [layout, setLayout] = useState("col");
    const [disableRowLayout, setDisableRowLayout] = useState(false);
    // const { Option } = Select;

    //handle database
    const Update = async () => {
        setSpinning(true);
        try {
            if (!nameTeacher) {
                console.error("Vui lòng điền tên giáo viên.");
                document.getElementById("nameTeacher").focus();
                errorNoti("Hãy điền tên giáo viên");
                return setSpinning(false);
            }
            if (!email) {
                console.error("Vui lòng điền email.");
                document.getElementById("email").focus();
                errorNoti("Hãy điền email");
                return setSpinning(false);
            }

            const data = {
                name_teacher: nameTeacher,
                email: email,
                phone: phone,
                position: position,
                academic_title: academicTitle,
                language: language,
                research_group: researchGroup,
                degree: degree,
                research_area: researchArea,
                unit: unit,
                address: address,
                graduation_year: graduationYear,
                gg_site: gg_site,
                gg_scholar: gg_scholar,
            };
            console.log("daaa: ", data);
            const response = await putTeacher(id, data);
            setSpinning(false);
            successNoti("Cập nhật thành công");
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            // if (error.response.data.errors.email) {
            //     document.getElementById("email").focus();
            //     if (error.response.data.errors.email)
            //         errorNoti("Email không chính xác hoặc đã tồn tại tồn tại");
            // } else if (error.response.data.errors.phone) {
            //     document.getElementById("phone").focus();
            //     if (error.response.data.errors.phone)
            //         errorNoti("số điện thoại đã tồn tại");
            // } else errorNoti("Cập nhật thất bại");

            setSpinning(false);
            errorNoti("Cập nhật thất bại");
        }
    };

    const getTeacher = async () => {
        setSpinning(true);
        try {
            const response = await getTeacherByID(id);
            const programData = response.data;
            console.log("teacher :", response.data);
            if (programData) {
                const {
                    name_teacher,
                    email,
                    phone,
                    position,
                    academic_title,
                    language,
                    research_group,
                    degree,
                    research_area,
                    unit,
                    address,
                    graduation_year,
                    gg_site,
                    gg_scholar,
                } = programData;

                setNameTeacher(name_teacher);
                setEmail(email);
                setPhone(phone);
                setPosition(position);
                setAcademicTitle(academic_title);
                setLanguage(language);
                setResearchGroup(research_group);
                setDegree(degree);
                setResearchArea(research_area);
                setUnit(unit);
                setAddress(address);
                setGg_site(gg_site);
                setGg_scholar(gg_scholar);
                setGraduationYear(graduation_year);

                console.log("email: ", email);
            } else {
                console.error("No data found in the response");
            }
            setSpinning(false);
        } catch (error) {
            console.error("Error fetching newsDetailData:", error);
            setSpinning(false);
        }
    };

    useEffect(() => {
        getTeacher();

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

    //handle layout
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
                            <Link to="/admin/teacher">Quản lý giáo viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            Chỉnh sửa thông tin giáo viên
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

                <div
                    className={`flex w-full gap-${
                        layout === "col" ? "10" : "8"
                    } flex-${layout}`}
                >
                    <div
                        className={`${
                            layout === "col" ? "w-full" : "w-[60%]"
                        } flex-1 flex flex-col gap-6 font-medium`}
                    >
                        <div className="flex gap-5">
                            <Input
                                id="nameTeacher"
                                label={<p>Họ và tên: </p>}
                                placeholder="Nhập họ và tên"
                                labelPlacement="outside"
                                isClearable
                                radius="sm"
                                value={nameTeacher}
                                onValueChange={setNameTeacher}
                            />
                            <Input
                                id="email"
                                label={<p>Email: </p>}
                                placeholder="Nhập email"
                                labelPlacement="outside"
                                isClearable
                                radius="sm"
                                value={email}
                                onValueChange={setEmail}
                            />

                            <Input
                                id="phone"
                                label={<p>Điện thoại: </p>}
                                placeholder="Nhập số điện thoại"
                                labelPlacement="outside"
                                isClearable
                                radius="sm"
                                value={phone}
                                onValueChange={setPhone}
                            />
                        </div>

                        <div className="flex gap-5">
                            <Input
                                label={<p>Chức vụ: </p>}
                                placeholder="Nhập chức vụ"
                                labelPlacement="outside"
                                isClearable
                                radius="sm"
                                value={position}
                                onValueChange={setPosition}
                            />

                            <Input
                                label={<p>Ngoại ngữ: </p>}
                                placeholder="Nhập ngoại ngữ sữ dụng"
                                labelPlacement="outside"
                                isClearable
                                radius="sm"
                                value={language}
                                onValueChange={setLanguage}
                            />
                        </div>

                        <div className="flex gap-5">
                            <Input
                                label={<p>Học vị: </p>}
                                placeholder="Thạc sĩ, tiến sĩ, ..."
                                labelPlacement="outside"
                                isClearable
                                radius="sm"
                                value={degree}
                                onValueChange={setDegree}
                            />

                            <Input
                                label={<p>Năm: </p>}
                                placeholder="vd: 2011 - Đài Loan"
                                labelPlacement="outside"
                                isClearable
                                radius="sm"
                                value={graduationYear}
                                onValueChange={setGraduationYear}
                            />
                        </div>

                        <Input
                            label={<p>Nhóm nghiêm cứu: </p>}
                            placeholder="Nhập nhóm nghiêm cứu"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={researchGroup}
                            onValueChange={setResearchGroup}
                        />

                        <Input
                            label={<p>Chức danh khoa học: </p>}
                            placeholder="Nhập chức danh khoa học"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={academicTitle}
                            onValueChange={setAcademicTitle}
                        />

                        <Input
                            label={<p>Lĩnh vực nghiên cứu: </p>}
                            placeholder="Lĩnh vực nghiêm cứu của giáo viên"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={researchArea}
                            onValueChange={setResearchArea}
                        />

                        <Input
                            label={<p>Đơn vị công tác: </p>}
                            placeholder="Đơn vị đang công tác của giáo viên"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={unit}
                            onValueChange={setUnit}
                        />

                        <Input
                            label={<p>Địa chỉ liên hệ: </p>}
                            placeholder="Nhập địa chỉ liên hệ"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={address}
                            onValueChange={setAddress}
                        />

                        <Input
                            label={<p>Google site: </p>}
                            placeholder="Link google site"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={gg_site}
                            onValueChange={setGg_site}
                        />

                        <Input
                            label={<p>Google scholar: </p>}
                            placeholder="Link google scholar"
                            labelPlacement="outside"
                            isClearable
                            radius="sm"
                            value={gg_scholar}
                            onValueChange={setGg_scholar}
                        />
                        {/* <div className="flex flex-col gap-2">
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
                        </div> */}
                    </div>
                </div>

                <Button onClick={Update} color="primary" radius="sm">
                    <span className="font-medium">Cập nhật thông tin giáo viên</span>
                </Button>
            </div>
        </div>
    );
};

export default UpdateTeacher;
