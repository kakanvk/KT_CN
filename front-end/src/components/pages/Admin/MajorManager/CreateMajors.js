import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { useHistory } from "react-router-dom";

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
import { saveMajor } from "../../../../service/MajorService";

const CreateMajors = (props) => {
    const [nameVi, setNameVi] = useState("");
    const [nameEn, setNameEn] = useState("");
    const { successNoti, errorNoti, setSpinning, TypeCategory } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();
    
    useEffect(() => {
        onOpen();
    }, []);

    const Save = async () => {
        try {
            if (!nameVi || !nameEn) {
                errorNoti("Vui lòng nhập đủ dữ liệu");
                return;
            }
            const data = {
                "name_vi": nameVi || "",
                "name_en": nameEn || ""
            };
            await saveMajor(data);
            successNoti("Cập nhật thành công");
            navigate("/admin/major");
        } catch (err) {
            console.error(err);
            errorNoti("Lưu thất bại");
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={() => navigate("/admin/major")} >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm chuyên ngành mới</ModalHeader>
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
                            to="/admin/category"
                            onClick={onClose}
                        >
                            Close
                        </Button>

                        <Button onClick={Save} color="primary" radius="sm">
                            <span className="font-medium">Tạo chuyên ngành mới</span>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreateMajors;
