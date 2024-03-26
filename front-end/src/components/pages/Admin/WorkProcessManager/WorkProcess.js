
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Tooltip } from "antd";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";

import { getAllWorkProcess, deleteWorkProcessList }
    from "../../../../service/WorkProcessService";
const WorkProcess = (props) => {
    const { successNoti, setSpinning } = props;
    const [workProcessData, setWorkProcessData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const columns = [
        {
            title:
                <p className="flex gap-2">Cơ sở giáo dục đại học

                </p>,
            dataIndex: "academic_institution",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title:
                <p className="flex gap-2">Thời gian làm việc

                </p>,
            dataIndex: "time",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title:
                <p className="flex gap-2">Địa chỉ

                </p>,
            dataIndex: "address",
            render: (text) => (
                <p className="font-medium">{text}</p>
            ),
        },
        {
            title:
                <p className="flex gap-2">Chức vụ

                </p>,
            dataIndex: "position",
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
            id_work_process: selectedRowKeys,
        }
        try {
            await deleteWorkProcessList(putData);
            setSpinning(false);
            getWorkProcess();
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
            id_work_process: [_id],
        }
        try {
            await deleteWorkProcessList(putData);
            setSpinning(false);
            getWorkProcess();
            successNoti("Xoá thành công");
        } catch (error) {
            setSpinning(false);
            successNoti("Xoá thất bại");
            console.error("Error fetching subject:", error);
        }
    };

    const getWorkProcess = async () => {
        setSpinning(true);
        try {
            const response = await getAllWorkProcess();
            console.log(response.data);

            const work_process_data = response.data.work_process.map((work_process) => {
                return {
                    key: work_process.id_work_process,
                    time: work_process.time,
                    academic_institution: work_process.academic_institution,
                    address: work_process.address,
                    position: work_process.position,
                    created_at: work_process.created_at,
                    updated_at: work_process.updated_at,
                    action: work_process.id_work_process,
                };
            });

            setWorkProcessData(work_process_data);

            setSpinning(false);
        } catch (error) {
            console.error("Error fetching subject:", error);
            setSpinning(false);
        }
    };

    useEffect(() => {
        getWorkProcess();
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
                    <BreadcrumbItem>Quản lý quá trình làm việc</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-2">
                    <Tooltip title="Làm mới">
                        <Button
                            isIconOnly
                            radius="full"
                            variant="light"
                            onClick={() => getWorkProcess()}
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
                Tạo quá trình làm việc
            </Button>
            {selectedRowKeys.length !== 0 && (
                <div className="Quick__Option flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 shadow-lg rounded-md border-1 border-slate-300">
                    <p className="text-sm font-medium">
                        <i className="fa-solid fa-circle-check mr-3 text-emerald-500"></i>{" "}
                        Đã chọn {selectedRow.length} quá trình
                    </p>
                    <div className="flex items-center gap-2">
                        <Tooltip
                            title={`Xoá ${selectedRowKeys.length} quá trình`}
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
                    dataSource={workProcessData}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default WorkProcess;

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