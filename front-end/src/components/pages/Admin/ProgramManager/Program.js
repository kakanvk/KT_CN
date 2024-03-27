import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import moment from "moment";
import { Table, Tooltip} from "antd";
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
    ModalFooter, useDisclosure
} from "@nextui-org/react";


import { DeleteListProgram, GetAllPrograms, PutStatusOneProgram, UpdateStatusesProgram } from "../../../../service/ProgramService";

const Program = (props) => {
    const { successNoti, errorNoti, setSpinning, TypeNews } = props;
    const [loading, setLoading] = useState(false);

    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [deleteId, setDeleteId] = useState(null);

    const [programListData, setProgramListData] = useState([]);

    const program_columns = [
        {
            title: "Tên chương trình",
            dataIndex: "name_program",
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    Trạng thái
                </div>),

            dataIndex: "status",
            render: (record) => (
                <div className="flex items-center justify-center w-full">
                    <Switch
                        size="sm"
                        isSelected={record.value}
                        classNames={{
                            wrapper: "mr-0",
                        }}
                        onClick={() => handleUpdateStatusOneProgram(record.id)}
                        className="scale-80"
                    ></Switch>
                </div>
            )

        },
        {
            title: "Thời gian",
            dataIndex: "date",
            render: (record) => (
                <div className="text-[12px] flex flex-col gap-3">
                    <div>
                        <span className="opacity-70">Ngày tạo:</span>
                        <p className="font-medium text-[13px]">
                            {record.created_at}
                        </p>
                    </div>
                    <div>
                        <span className="opacity-70">Cập nhật lần cuối:</span>
                        <p className="font-medium text-[13px]">
                            {record.updated_at}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            title: "Chuyên ngành (Tiếng Việt)",
            dataIndex: "major_name_vi",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            render: (_id) => (
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            size="sm"
                            as={Link}
                            to={TypeNews === "News" ? `update/${_id}` : `update/${_id}`}

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

    const getValueOfStatusProgramSelectedRow = () => {
        const selectedRows = programListData.filter((news) =>
            selectedRowKeys.includes(news.key)
        );
        const countVITrue = selectedRows.filter(
            (row) => row.status.value
        ).length;
        const checkValue =
            countVITrue === selectedRowKeys.length ? true : false;
        return checkValue;
    };


    const handleUpdateStatuses = async () => {
        setSpinning(true);
        const checkValue = getValueOfStatusProgramSelectedRow();
        const putData = {
            id_program: selectedRowKeys,
            status: !checkValue
        }
        console.log(putData);
        await UpdateStatusesProgram(putData);
        await getProgram();
        successNoti("Cập nhật thành công");
        setSpinning(false);
    };



    // const handleSoftDelete = async () => {
    //     setSpinning(true);
    //     const putData = {
    //         id_new: selectedRowKeys,
    //         deleted: true,
    //     }
    //     try {
    //         const response = await softDeleteNewsByIds(putData);
    //         setSpinning(false);
    //         successNoti("Xoá thành công");
    //         handleUnSelect();
    //     } catch (error) {
    //         setSpinning(false);
    //         successNoti("Xoá thất bại");
    //         console.error("Error fetching news:", error);
    //     }
    // };

    const handleForceDelete = async (_id) => {
        setSpinning(true);
        
        let putData;

        if (deleteId) {
            putData = {
                id_program: [deleteId]
            }
        } else {
            putData = {
                id_program: selectedRowKeys
            }
        }
        try {
            await DeleteListProgram(putData);
            getProgram();
            setSpinning(false);
            successNoti("Xoá thành công");
            handleUnSelect();
        } catch (error) {
            setSpinning(false);
            successNoti("Xoá thất bại");
            console.error("Error fetching news:", error);
        }
    };

    const handleUpdateStatusOneProgram = async (id) => {
        setSpinning(true);
        try {
            await PutStatusOneProgram(id);
            await getProgram();
            setSpinning(false);
            successNoti("Cập nhật thành công");
        } catch (error) {
            console.error("error update: ", error);
            setSpinning(false);
            errorNoti("Cập nhật thất bại");
        }

    };

    const getProgram = async () => {
        setSpinning(true);
        try {
            const response = await GetAllPrograms();

            const updatedProgramData = response.data.map((Program) => {
                return {
                    key: Program.id_program,
                    name_program: Program.name_program,
                    content: Program.content,

                    status: {
                        value: Program.status,
                        id: Program.id_program,
                    },

                    date: {
                        created_at: moment(Program.created_at).format("DD/MM/YYYY HH:mm"),
                        updated_at: moment(Program.updated_at).format("DD/MM/YYYY HH:mm"),
                    },
                    major_name_vi: Program.major_name_vi,
                    major_name_en: Program.major_name_en,
                    action: Program.id_program,
                };
            });
            setProgramListData(updatedProgramData);

        } catch (error) {
        } finally {
            setSpinning(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        // if(TypeNews === "News") {
        //     getNews();
        //     setLoading(false);

        // } else if(TypeNews === "program") {
        getProgram();
        setLoading(false);

        // }
        // getCategory();


    }, []);


    return (
        <div className="HomeAdmin flex flex-col gap-5 items-start">
            <ConfirmAction
                onOpenChange={onOpenChange}
                isOpen={isOpen}
                onConfirm={() => {
                    handleForceDelete();
                    setDeleteId(null);
                    setSelectedRowKeys([]);
                }}
            />
            <div className="flex items-start justify-between w-full">
                <Breadcrumbs underline="hover">
                    <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                    <BreadcrumbItem>Quản lý chương trình</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-2">
                    <Tooltip title="Làm mới">
                        <Button
                            isIconOnly
                            radius="full"
                            variant="light"
                            onClick={() => getProgram()}
                        >
                            <i className="fa-solid fa-rotate-right text-[17px]"></i>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Bài viết đã xoá">
                        <Button
                            isIconOnly
                            radius="full"
                            variant="light"
                            to={TypeNews === "News" ? "stored" : "storedAdmissions"}

                            as={Link}
                        >
                            <i className="fa-solid fa-trash-can-arrow-up text-[17px]"></i>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <Button
                color="primary"
                radius="sm"
                as={Link}
                to={"create"}
            >
                Tạo chương trình
            </Button>
            {selectedRowKeys.length !== 0 && (
                <div className="Quick__Option flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 shadow-lg rounded-md border-1 border-slate-300">
                    <p className="text-sm font-medium">
                        <i className="fa-solid fa-circle-check mr-3 text-emerald-500"></i>{" "}
                        Đã chọn {selectedRow.length} bài viết
                    </p>
                    <div className="flex items-center gap-2">
                        <Tooltip
                            title={`${getValueOfStatusProgramSelectedRow() ? "Ẩn" : "Hiện"
                                } ${selectedRowKeys.length} bài viết`}
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Switch
                                size="sm"
                                className="scale-80"
                                isSelected={getValueOfStatusProgramSelectedRow()}
                                classNames={{
                                    base: "flex-row-reverse gap-2",
                                    wrapper: "mr-0",
                                }}
                                onClick={() => {
                                    handleUpdateStatuses();
                                }}
                            >
                                <Avatar
                                    alt="English"
                                    className="w-6 h-6"
                                    src="https://flagcdn.com/gb.svg"
                                />
                            </Switch>
                        </Tooltip>
                        <Tooltip
                            title={`Xoá ${selectedRowKeys.length} bài viết`}
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
                    loading={loading}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}

                    columns={program_columns}
                    dataSource={programListData}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default Program;

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
                                Bài viết sẽ được chuyển vào <Chip radius="sm" className="bg-zinc-200"><i class="fa-solid fa-trash-can-arrow-up mr-2"></i>Kho lưu trữ</Chip> và có thể khôi phục lại trong vòng 30 ngày, tiếp tục thao tác?
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