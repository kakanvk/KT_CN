
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Table, Tooltip, Image } from "antd";
import {
    Avatar,
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Switch,
    Modal, Chip,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, 
    useDisclosure
} from "@nextui-org/react";

import { getAllsubjects, deleteSubject} from "../../../../service/SubjectService";

const Subject = (props) => {

    const { successNoti, errorNoti, setSpinning, TypeCategory} = props;

    const [subjectData, setSubjectData] = useState([]);

    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        {
            title:
                <p className="flex gap-2">Tên môn học
                    <Avatar
                        alt="Việt Nam"
                        className="w-5 h-5"
                        src="https://flagcdn.com/vn.svg"
                    />
                </p>,
            dataIndex: "name_vi",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title:
                <p className="flex gap-2">Tên môn học
                    <Avatar
                        alt="Việt Nam"
                        className="w-5 h-5"
                        src="https://flagcdn.com/gb.svg"
                    />
                </p>,
            dataIndex: "name_en",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title:
                <p className="flex gap-2">Đối tượng nghiên cứu
                    
                </p>,
            dataIndex: "study_object",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title:
                <p className="flex gap-2">Đầu năm
                    
                </p>,
            dataIndex: "beginning_year",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title:
                <p className="flex gap-2">Thể chế
                    
                </p>,
            dataIndex: "institutions",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title:
                <p className="flex gap-2">Tên chuyên ngành
                    
                </p>,
            dataIndex: "majors",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    Hành động
                </div>
            ),
            dataIndex: "action",
            width: 150,
            render: (_id) => (
                <div className="flex items-center justify-center w-full gap-2">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            size="sm"
                            as={Link}
                            to={`update/${_id}`}
                        >
                            <i className="fa-solid fa-pen"></i>
                        </Button>

                        
                    </Tooltip>
                    <Tooltip title="Xoá">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            size="sm"
                            onClick={() => { onOpen(); setDeleteId(_id); }}
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRow(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const handleUnSelect = () => {
        setSelectedRowKeys([]);
        setSelectedRow([]);
    };

    const handleSoftDelete = async () => {
        setSpinning(true);
        const putData = {
            id_subject: selectedRowKeys,
        }
        try {
            const response = await deleteSubject(putData);
            setSpinning(false);
            getSubject();
            successNoti("Xoá thành công");
            handleUnSelect();
        } catch (error) {
            setSpinning(false);
            successNoti("Xoá thất bại");
            console.error("Error fetching subject:", error);
        }
    };

    const handleSoftDeleteById = async (_id) => {
        setSpinning(true);
        const putData = {
            id_subject: [_id],
        }
        try {
            const response = await deleteSubject(putData);
            setSpinning(false);
            getSubject();
            successNoti("Xoá thành công");
        } catch (error) {
            setSpinning(false);
            successNoti("Xoá thất bại");
            console.error("Error fetching subject:", error);
        }
    };

    const getSubject = async () => {
        setSpinning(true);
        try {
            const response = await getAllsubjects();
            console.log(response.data);

            const newsCategoryData = response.data.map((subject) => {
                return {
                    key: subject.id_subject,
                    name_vi: subject.name_vi,
                    name_en: subject.name_en,
                    study_object: subject.study_object,
                    beginning_year: subject.beginning_year,
                    institutions: subject.institutions,
                    majors: subject.majors.name_vi,
                    created_at: subject.created_at,
                    updated_at: subject.updated_at,
                    action: subject.id_subject,
                };
            });

            setSubjectData(newsCategoryData);

            setSpinning(false);
        } catch (error) {
            console.error("Error fetching subject:", error);
            setSpinning(false);
        }
    };

    useEffect(() => {
        getSubject();
    }, []);

    return (
        <div className="HomeAdmin flex flex-col gap-5 items-start">
            <ConfirmAction
                onOpenChange={onOpenChange}
                isOpen={isOpen}
                onConfirm={() => {
                    if (deleteId) {
                        handleSoftDeleteById(deleteId);
                        setDeleteId(null);
                    } else if (selectedRowKeys.length > 0) {
                        handleSoftDelete();
                        setSelectedRowKeys([]);
                    }
                }}
            />
            <div className="flex items-start justify-between w-full">
                <Breadcrumbs underline="hover">
                    <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                    <BreadcrumbItem>Quản lý môn học</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-2">
                    <Tooltip title="Làm mới">
                        <Button
                            isIconOnly
                            radius="full"
                            variant="light"
                            onClick={() => getSubject()}
                        >
                            <i className="fa-solid fa-rotate-right text-[17px]"></i>
                        </Button>
                    </Tooltip>
                    
                </div>
            </div>
            <Button
                color="primary"
                radius="sm"
                as={Link}
                to="create"
            >
                Tạo môn học mới
            </Button>

            {selectedRowKeys.length !== 0 && (
                <div className="Quick__Option flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 shadow-lg rounded-md border-1 border-slate-300">
                    <p className="text-sm font-medium">
                        <i className="fa-solid fa-circle-check mr-3 text-emerald-500"></i>{" "}
                        Đã chọn {selectedRow.length} môn học
                    </p>
                    <div className="flex items-center gap-2">
                        <Tooltip
                            title={`Xoá ${selectedRowKeys.length} môn học`}
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Button isIconOnly variant="light" radius="full" onClick={onOpen}>
                                <i className="fa-solid fa-trash-can"></i>
                            </Button>
                        </Tooltip>
                        <Tooltip
                            title="Bỏ chọn"
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Button
                                isIconOnly
                                variant="light"
                                radius="full"
                                onClick={() => {
                                    handleUnSelect();
                                }}
                            >
                                <i className="fa-solid fa-xmark text-[18px]"></i>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            )}
            <div className="ListNews w-full">
                <Table
                    bordered
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={subjectData}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default Subject;

function ConfirmAction(props) {

    const { isOpen, onOpenChange, onConfirm } = props;

    const handleOnOKClick = (onClose) => {
        onClose();
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.2,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.1,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Cảnh báo</ModalHeader>
                        <ModalBody>
                            <p className="text-[16px]">
                                Bạn có muốn thực hiện thao tác xóa?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Huỷ
                            </Button>
                            <Button color="danger" className="font-medium" onPress={() => handleOnOKClick(onClose)}>
                                Xoá
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}