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
    useDisclosure,
} from "@nextui-org/react";

import {
    deleteListScientificArticle,
    getAllScientificArticle,
} from "../../../../service/ScientificAricleService";
import { deleteListDetailScientificArticle } from "../../../../service/DetailScientificArticleService";

const ScientificArticle = (props) => {
    const { successNoti, setSpinning } = props;
    const [scientificArticleData, setScientificArticleData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const columns = [
        {
            title: <p className="flex gap-2">Bài báo khoa học</p>,
            dataIndex: "title",
            render: (text) => <p className="font-medium">{text}</p>,
        },
        {
            title: <p className="flex gap-2">publication_date</p>,
            dataIndex: "publication_date",
            render: (text) => <p className="font-medium">{text}</p>,
        },
        {
            title: <p className="flex gap-2">publishers</p>,
            dataIndex: "publishers",
            render: (text) => <p className="font-medium">{text}</p>,
        },
        {
            title: <p className="flex gap-2">abstract</p>,
            dataIndex: "abstract",
            render: (text) => <p className="font-medium">{text}</p>,
        },
        {
            title: <p className="flex gap-2">link</p>,
            dataIndex: "link",
            render: (text) => <p className="font-medium">{text}</p>,
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
                            onClick={() => {
                                onOpen();
                                setDeleteId(_id);
                            }}
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
            id_scientific_article: selectedRowKeys,
        };
        const id_list_data = {
            id_list: selectedRowKeys,
        };
        try {
            await deleteListDetailScientificArticle(id_list_data);
            await deleteListScientificArticle(putData);
            setSpinning(false);
            getScientificArticle();
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
            id_scientific_article: [_id],
        };
        const id_list_data = {
            id_list: [_id],
        };
        try {
            await deleteListDetailScientificArticle(id_list_data);
            await deleteListScientificArticle(putData);
            setSpinning(false);
            getScientificArticle();
            successNoti("Xoá thành công");
            handleUnSelect();
        } catch (error) {
            setSpinning(false);
            successNoti("Xoá thất bại");
            console.error("Error fetching subject:", error);
        }
    };

    const getScientificArticle = async () => {
        setSpinning(true);
        try {
            const response = await getAllScientificArticle();
            console.log(response.data.scientific_articles);

            const Scientific_Article_Data =
                response.data.scientific_articles.map((items) => {
                    return {
                        key: items.id_scientific_article,
                        title: items.title,
                        publication_date: items.publication_date,
                        publishers: items.publishers,
                        abstract: items.abstract,
                        link: items.link,
                        created_at: items.created_at,
                        updated_at: items.updated_at,
                        action: items.id_scientific_article,
                    };
                });

            setScientificArticleData(Scientific_Article_Data);

            setSpinning(false);
        } catch (error) {
            console.error("Error fetching subject:", error);
            setSpinning(false);
        }
    };

    useEffect(() => {
        getScientificArticle();
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
                    <BreadcrumbItem>Quản lý bài báo khoa học</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-2">
                    <Tooltip title="Làm mới">
                        <Button
                            isIconOnly
                            radius="full"
                            variant="light"
                            onClick={() => getScientificArticle()}
                        >
                            <i className="fa-solid fa-rotate-right text-[17px]"></i>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <Button color="primary" radius="sm" as={Link} to="create">
                Tạo bài báo khoa học
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
                            <Button
                                isIconOnly
                                variant="light"
                                radius="full"
                                onClick={onOpen}
                            >
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
                    dataSource={scientificArticleData}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default ScientificArticle;

function ConfirmAction(props) {
    const { isOpen, onOpenChange, onConfirm } = props;

    const handleOnOKClick = (onClose) => {
        onClose();
        if (typeof onConfirm === "function") {
            onConfirm();
        }
    };

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
                },
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
                            <Button
                                color="danger"
                                className="font-medium"
                                onPress={() => handleOnOKClick(onClose)}
                            >
                                Xoá
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
