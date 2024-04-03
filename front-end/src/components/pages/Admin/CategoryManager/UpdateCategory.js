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
import { updateCategory, getCategoryByID } from "../../../../service/CategoryService";

const UpdateCategory = (props) => {
    const { id } = useParams();

    const [nameVi, setNameVi] = useState("");
    const [nameEn, setNameEn] = useState("");
    const { successNoti, errorNoti, TypeCategory} = props;
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
                "name_vi": nameVi || "",
                "name_en": nameEn || ""
            };
            console.log(data);
            await updateCategory(id, data);
            successNoti("Cập nhật thành công");
            navigate("/admin/category");
        } catch (err) {
            console.error(err);
            errorNoti("Chỉnh sửa thất bại");
        }
    };

    const getCategory = async () => {
        try {
          const response = await getCategoryByID(id);
          console.log(response);
          if (response.data)
          {
            setNameVi(response.data.name_vi);
            setNameEn(response.data.name_en);
          }
        } catch (error) {
            console.error("lỗi",error);
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={() => navigate("/admin/category")} >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Thêm loại mới</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Nhập loại Tiếng Việt"
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
                            label="Nhập loại Tiếng Anh"
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

                        <Button onClick={Update} color="primary" radius="sm">
                            <span className="font-medium">Chỉnh sửa</span>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default UpdateCategory;
