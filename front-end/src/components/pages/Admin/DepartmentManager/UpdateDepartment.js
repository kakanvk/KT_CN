import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useHistory from react-router-dom

import {
    Button,
    Avatar,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import {
    getDepartmentById,
    updateDepartment,
} from "../../../../service/DepartmentService";

const UpdateDepartment = (props) => {
    const { id } = useParams();

    const [nameVi, setNameVi] = useState("");
    const [nameEn, setNameEn] = useState("");
    const { successNoti, errorNoti } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();

    useEffect(() => {
        onOpen();
        getCategory();
    }, []);

    const Update = async () => {
        try {
            if (!nameVi || !nameEn) {
                errorNoti("Vui lòng nhập đủ dữ liệu");
                return;
            }
            const data = {
                name_department_vi: nameVi || "",
                name_department_en: nameEn || "",
            };
            console.log(data);
            await updateDepartment(id, data);
            successNoti("Cập nhật thành công");
            navigate("/admin/department");
        } catch (err) {
            console.error(err);
            errorNoti("Chỉnh sửa thất bại");
        }
    };

    const getCategory = async () => {
        try {
            const response = await getDepartmentById(id);
            console.log(response);
            if (response.data) {
                setNameVi(response.data.name_department_vi);
                setNameEn(response.data.name_department_en);
            }
        } catch (error) {
            console.error("lỗi", error);
        }
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={() => navigate("/admin/department")}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Chỉnh sửa bộ môn
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            label="Nhập tên tiếng anh"
                            placeholder=""
                            labelPlacement="outside"
                            startContent={
                                <Avatar
                                    className="w-5 h-5"
                                    src="https://flagcdn.com/vn.svg"
                                />
                            }
                            isClearable
                            radius="sm"
                            value={nameVi}
                            onValueChange={setNameVi}
                        />
                        <Input
                            label="Nhập tên Tiếng Anh"
                            placeholder=""
                            labelPlacement="outside"
                            startContent={
                                <Avatar
                                    className="w-5 h-5"
                                    src="https://flagcdn.com/gb.svg"
                                />
                            }
                            isClearable
                            radius="sm"
                            value={nameEn}
                            onValueChange={setNameEn}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            radius="sm"
                            as={Link}
                            to="/admin/department"
                            onClick={onClose}
                        >
                            Close
                        </Button>

                        <Button onClick={Update} color="primary" radius="sm">
                            <span className="font-medium">Chỉnh sửa</span>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UpdateDepartment;
