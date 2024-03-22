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
    useDisclosure
} from "@nextui-org/react";
import { updateMajor, getMajorsByID } from "../../../../service/MajorService";

const UpdateMajors = (props) => {
    const { id } = useParams();

    const [nameVi, setNameVi] = useState("");
    const [nameEn, setNameEn] = useState("");
    const { successNoti, errorNoti} = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();
    
    useEffect(() => {
        onOpen();
        getMajor();
    }, []);

    const Update = async () => {
        try {
            if (!nameVi || !nameEn) {
                errorNoti("Vui lòng nhập đủ dữ liệu");
                return;
            }
            const data = {
                "name_vi": nameVi || "",
                "name_en": nameEn || ""
            };
            console.log(data);
            await updateMajor(id, data);
            successNoti("Cập nhật thành công");
            navigate("/admin/major");
        } catch (err) {
            console.error(err);
            errorNoti("Chỉnh sửa thất bại");
        }
    };

    const getMajor = async () => {
        try {
          const response = await getMajorsByID(id);
          console.table(response.data);
          if (response.data && response.data.major) { 
            const { name_vi, name_en } = response.data.major; 
            setNameVi(name_vi);
            setNameEn(name_en);
        }
        } catch (error) {
            console.error("lỗi",error);
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={() => navigate("/admin/major")} >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm loại mới</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Nhập chuyên ngành Tiếng Việt"
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
                            label="Nhập chuyên ngành Tiếng Anh"
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
                            to="/admin/major"
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
    )
}

export default UpdateMajors;
