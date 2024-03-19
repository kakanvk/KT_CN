import "./Post.css";
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
    ModalFooter, useDisclosure
} from "@nextui-org/react";

import { getAllNewsForAdmin, softDeleteNewsByIds, UpdateStatusVi, UpdateStatusEn, GetAllCategories, UpdateStatuses} from "../../../../service/NewsService";

import { 
    getAllNewsAdmissionForAdmin, 
    softDeleteNewsAdmissionByIds,
    UpdateAdmissionStatuses,
    UpdateAdmissionStatusVi, 
    UpdateAdmissionStatusEn
} from "../../../../service/AdmissionNewsService";
import { GetAllPrograms, SaveProgramsAll } from "../../../../service/ProgramService";

const Post = (props) => {
    const { successNoti, errorNoti, setSpinning, TypeNews} = props;

    const [newsListData, setNewsListData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [deleteId, setDeleteId] = useState(null);

    const [programListData, setProgramListData] = useState([]);


    const columns = [
        {
            title: "Ảnh bìa",
            dataIndex: "thumbnail",
            render: (text) => (
                <Image width={100} src={text} className="rounded" />
            ),
        },
        {
            title: "Tiêu đề bài viết",
            dataIndex: "name_group",
            render: (record) => (
                <div className="text-sm">
                    <p className="font-medium">{record.title_vi}</p>
                    <p className="text-[12px] opacity-70 mt-1">
                        {record.title_en}
                    </p>
                </div>
            ),
        },
        {
            title: "Thời gian",
            dataIndex: "date",
            width: "150px",
            render: (record) => (
                <div className="text-[12px] flex flex-col gap-3">
                    <div>
                        <span className="opacity-70">Ngày tạo:</span>
                        <p className="font-medium text-[13px]">
                            {record.created_at}
                        </p>
                        <div className="flex items-center gap-[5px]">
                            <span className="opacity-70">bởi</span>
                            <Tooltip
                                className="bg-[white]"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            className="w-7 h-7 cursor-pointer"
                                            src={record.create_by.photoURL}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-semibold">
                                                {record.create_by.name}
                                            </span>
                                            <p className="text-[11px] opacity-70 -mt-1">
                                                {record.create_by.email}
                                            </p>
                                        </div>
                                    </div>
                                }
                            >
                                <Avatar
                                    className="w-5 h-5 cursor-pointer"
                                    src={record.create_by.photoURL}
                                />
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        <span className="opacity-70">Cập nhật lần cuối:</span>
                        <p className="font-medium text-[13px]">
                            {record.updated_at}
                        </p>
                        <div className="flex items-center gap-[5px]">
                            <span className="opacity-70">bởi</span>
                            <Tooltip
                                className="bg-[white]"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            className="w-7 h-7 cursor-pointer"
                                            src={record.update_by.photoURL}
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-semibold">
                                                {record.update_by.name}
                                            </span>
                                            <p className="text-[11px] opacity-70 -mt-1">
                                                {record.update_by.email}
                                            </p>
                                        </div>
                                    </div>
                                }
                            >
                                <Avatar
                                    className="w-5 h-5 cursor-pointer"
                                    src={record.update_by.photoURL}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: (
                <Tooltip title="Danh mục">
                    <i className="fa-solid fa-icons text-[16px]"></i>
                </Tooltip>
            ),
            dataIndex: "category",
            render: (record) => (
                <div className="text-sm">
                    <p className="font-medium">{record.vi}</p>
                    <p className="text-[12px] opacity-70 mt-1">{record.en}</p>
                </div>
            ),
            filters: categoryData,
            onFilter: (value, record) => record.category.id === value,
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    <Tooltip title="Lượt xem">
                        <i className="fa-solid fa-eye text-[16px]"></i>
                    </Tooltip>
                </div>
            ),
            dataIndex: "view_count",
            render: (record) => (
                <div className="flex items-center justify-center w-full">
                    {record.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    <Tooltip title="Ẩn/hiện VN">
                        <Avatar
                            alt="Việt Nam"
                            className="w-5 h-5"
                            src="https://flagcdn.com/vn.svg"
                        />
                    </Tooltip>
                </div>
            ),
            dataIndex: "status_vi",
            render: (record) => (
                <div className="flex items-center justify-center w-full">
                    <Switch
                        key={record.id}
                        size="sm"
                        classNames={{
                            wrapper: "mr-0",
                        }}
                        isSelected={record.value}
                        onClick={() => handleUpdateStatus_vi(record.id)}
                        className="scale-80"
                    ></Switch>
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    <Tooltip title="Ẩn/hiện EN">
                        <Avatar
                            alt="Engish"
                            className="w-5 h-5"
                            src="https://flagcdn.com/gb.svg"
                        />
                    </Tooltip>
                </div>
            ),
            dataIndex: "status_en",
            render: (record) => (
                <div className="flex items-center justify-center w-full">
                    <Switch
                        size="sm"
                        isSelected={record.value}
                        classNames={{
                            wrapper: "mr-0",
                        }}
                        onClick={() => handleUpdateStatus_en(record.id)}
                        className="scale-80"
                    ></Switch>
                </div>
            ),
        },
        {
            title: (
                <div className="flex items-center justify-center w-full">
                    <i className="fa-solid fa-bars text-[18px]"></i>
                </div>
            ),
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
                            to={TypeNews === "News" ? `update/${_id}` : `updateAdmissions/${_id}`}

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
                            onClick={() => { onOpen(); setDeleteId(_id);}}
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

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
                        onClick={() => handleUpdateStatus_en(record.id)}
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
                            onClick={() => { onOpen(); setDeleteId(_id);}}
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

    const getValueOfVISelectedRow = () => {
        const selectedRows = newsListData.filter((news) =>
            selectedRowKeys.includes(news.key)
        );
        const countVITrue = selectedRows.filter(
            (row) => row.status_vi.value
        ).length;
        const checkValueVI =
            countVITrue === selectedRowKeys.length ? true : false;

        return checkValueVI;
    };

    const getValueOfENSelectedRow = () => {
        const selectedRows = newsListData.filter((news) =>
            selectedRowKeys.includes(news.key)
        );
        const countENTrue = selectedRows.filter(
            (row) => row.status_en.value
        ).length;
        const checkValueEN =
            countENTrue === selectedRowKeys.length ? true : false;

        return checkValueEN;
    };

    const handleUpdateStatuses = async (lang) => {
        setSpinning(true);
        if (TypeNews === 'News') { 
            const checkValueVI = getValueOfVISelectedRow();
            const checkValueEN = getValueOfENSelectedRow();

            const putData = {
                id_new: selectedRowKeys,
                lang: lang,
                status: lang === "vi" ? !checkValueVI : !checkValueEN
            }
            console.log(putData);
            const response = await UpdateStatuses(putData);
            await getNews();
            successNoti("Cập nhật thành công");
        } 
        setSpinning(false);
    };

    const handleSoftDelete = async () => {
        setSpinning(true);
        const putData = {
            id_new: selectedRowKeys,
            deleted: true,
        }
        try {
            if (TypeNews === 'News') {
            const response = await softDeleteNewsByIds(putData);
            await getNews();
            setSpinning(false);
            successNoti("Xoá thành công");
            handleUnSelect();
            } else if (TypeNews === "admissionNews"){
                const response = await softDeleteNewsAdmissionByIds(putData);
                await getNewsAdmission();
                setSpinning(false);
                successNoti("Xoá thành công");
                handleUnSelect();
            }
        } catch (error) {
            setSpinning(false);
            successNoti("Xoá thất bại");
            console.error("Error fetching news:", error);
        }
    };

    const handleSoftDeleteById = async (_id) => {
        setSpinning(true);
        const putData = {
            id_new: [_id],
            deleted: true,
        }
        try {
            if (TypeNews === 'News') {
                const response = await softDeleteNewsByIds(putData);
                await getNews();
                setSpinning(false);
                successNoti("Xoá thành công");
                handleUnSelect();
                } else if (TypeNews === "admissionNews"){
                    const response = await softDeleteNewsAdmissionByIds(putData);
                    await getNewsAdmission();
                    setSpinning(false);
                    successNoti("Xoá thành công");
                    handleUnSelect();
                }
        } catch (error) {
            setSpinning(false);
            successNoti("Xoá thất bại");
            console.error("Error fetching news:", error);
        }
    };

    const getCategory = async () => {
        try {
            const response = await GetAllCategories();

            const newsCategoryData = response.data.map((news) => {
                return {
                    value: news.id_category,
                    text: news.name_vi,
                };
            });

            // console.log("Category data:", newsCategoryData);
            setCategoryData(newsCategoryData);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    const getNews = async () => {
        setSpinning(true);
        try {
            const response = await getAllNewsForAdmin();

            console.log(response.data)

            const updatedNewsData = response.data.map((news) => {
                return {
                    key: news.id_new,
                    thumbnail: news.thumbnail,
                    name_group: {
                        thumbnail: news.thumbnail,
                        title_vi: news.vi.title_vi,
                        title_en: news.en.title_en,
                    },
                    status_vi: {
                        value: news.vi.status_vi,
                        id: news.id_new,
                    },
                    status_en: {
                        value: news.en.status_en,
                        id: news.id_new,
                    },
                    view_count: news.view_count,
                    category: {
                        en: news.en.category_name_en,
                        vi: news.vi.category_name_vi,
                        id: news.id_category,
                    },
                    date: {
                        created_at: moment(news.created_at).format(
                            "DD/MM/YYYY HH:mm"
                        ),
                        create_by: {
                            email: news.user.email,
                            photoURL: news.user.photoURL,
                            name: news.user.name
                        },
                        updated_at: moment(news.updated_at).format(
                            "DD/MM/YYYY HH:mm"
                        ),
                        update_by: {
                            email: news.user_update.email,
                            photoURL: news.user_update.photoURL,
                            name: news.user_update.name
                        }
                    },
                    action: news.id_new,
                };
            });

            setNewsListData(updatedNewsData);

            setSpinning(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setSpinning(false);
        }
    };

    const getNewsAdmission = async ()=>{
        setSpinning(true);
        try {
            const response = await getAllNewsAdmissionForAdmin();

            console.log(response.data)

            const updatedNewsData = response.data.map((news) => {
                return {
                    key: news.id_admission_news,
                    thumbnail: news.thumbnail,
                    name_group: {
                        thumbnail: news.thumbnail,
                        title_vi: news.vi.title_vi,
                        title_en: news.en.title_en,
                    },
                    status_vi: {
                        value: news.vi.status_vi,
                        id: news.id_admission_news,
                    },
                    status_en: {
                        value: news.en.status_en,
                        id: news.id_admission_news,
                    },
                    view_count: news.view_count,
                    category: {
                        en: news.en.category_name_en,
                        vi: news.vi.category_name_vi,
                        id: news.id_category,
                    },
                    date: {
                        created_at: moment(news.created_at).format(
                            "DD/MM/YYYY HH:mm"
                        ),
                        create_by: {
                            email: news.user.email,
                            photoURL: news.user.photoURL,
                            name: news.user.name
                        },
                        updated_at: moment(news.updated_at).format(
                            "DD/MM/YYYY HH:mm"
                        ),
                        update_by: {
                            email: news.user_update.email,
                            photoURL: news.user_update.photoURL,
                            name: news.user_update.name
                        }
                    },
                    action: news.id_admission_news,
                };
            });
            setNewsListData(updatedNewsData);
            setSpinning(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setSpinning(false);
        }
    }

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
                        id: Program.id_Program,
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

            console.table(updatedProgramData);
            console.log(updatedProgramData);
            } catch (error) {
        } finally {
            setSpinning(false);
        }
    };
    
    useEffect(() => {
        
        if(TypeNews === "News") {
            getNews();
        } else if(TypeNews === "program") {
            getProgram();  
        }
        getCategory();
    }, []);

    const handleUpdateStatus_vi = async (id) => {
        setSpinning(true);
        if (TypeNews === "News") {
            try {
                const response = await UpdateStatusVi(id);
                await getNews();
                setSpinning(false);
                successNoti("Cập nhật thành công");
            } catch (error) {
                console.error("error update: ", error);
                setSpinning(false);
                errorNoti("Cập nhật thất bại");
            }
        } else if(TypeNews === "admissionNews"){ 
            try {
                const response = await UpdateAdmissionStatusVi(id);
                await getNewsAdmission();
                setSpinning(false);
                successNoti("Cập nhật thành công");
            } catch (error) {
                console.error("error update: ", error);
                setSpinning(false);
                errorNoti("Cập nhật thất bại");
            } 
        }
    };

    const handleUpdateStatus_en = async (id) => {
        setSpinning(true);
        if(TypeNews === "News") {
            try {
                const response = await UpdateStatusEn(id);
                await getNews();
                setSpinning(false);
                successNoti("Cập nhật thành công");
            } catch (error) {
                console.error("error update: ", error);
                setSpinning(false);
                errorNoti("Cập nhật thất bại");
            }
        } else if(TypeNews === "admissionNews"){ 
            try {
                const response = await UpdateAdmissionStatusEn(id);
                await getNewsAdmission();
                setSpinning(false);
                successNoti("Cập nhật thành công");
            } catch (error) {
                console.error("error update: ", error);
                setSpinning(false);
                errorNoti("Cập nhật thất bại");
            }
        }
    };

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
                    <BreadcrumbItem>Quản lý bài viết</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-2">
                    <Tooltip title="Làm mới">
                        <Button
                            isIconOnly
                            radius="full"
                            variant="light"
                            onClick={() => getNews()}
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
           {TypeNews === "News" ? 
                <Button
                    color="primary"
                    radius="sm"
                    as={Link}
                    to={"create"}

                >
                    Tạo bài viết mới
                </Button>
                :
                <Button
                    color="primary"
                    radius="sm"
                    as={Link}
                    to={"create"}

                >
                    Tạo chương trình
                </Button>
            }
            {selectedRowKeys.length !== 0 && (
                <div className="Quick__Option flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 shadow-lg rounded-md border-1 border-slate-300">
                    <p className="text-sm font-medium">
                        <i className="fa-solid fa-circle-check mr-3 text-emerald-500"></i>{" "}
                        Đã chọn {selectedRow.length} bài viết
                    </p>
                    <div className="flex items-center gap-2">
                        <Tooltip
                            title={`${getValueOfVISelectedRow() ? "Ẩn" : "Hiện"
                                } ${selectedRowKeys.length} bài viết`}
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Switch
                                size="sm"
                                className="scale-80"
                                isSelected={getValueOfVISelectedRow()}
                                classNames={{
                                    base: "flex-row-reverse gap-2",
                                    wrapper: "mr-0",
                                }}
                                onClick={() => {
                                    handleUpdateStatuses("vi");
                                }}
                            >
                                <Avatar
                                    alt="Việt Nam"
                                    className="w-6 h-6"
                                    src="https://flagcdn.com/vn.svg"
                                />
                            </Switch>
                        </Tooltip>
                        <Tooltip
                            title={`${getValueOfENSelectedRow() ? "Ẩn" : "Hiện"
                                } ${selectedRowKeys.length} bài viết`}
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Switch
                                size="sm"
                                className="scale-80"
                                isSelected={getValueOfENSelectedRow()}
                                classNames={{
                                    base: "flex-row-reverse gap-2",
                                    wrapper: "mr-0",
                                }}
                                onClick={() => {
                                    handleUpdateStatuses("en");
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
                {   TypeNews ==="News"? <>
                        <Table
                            bordered
                            loading={loading}
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                            }}

                            columns={ columns}
                            dataSource={newsListData}
                            className="w-full"
                        />
                    </>
                    : 
                    <>
                        <Table
                            bordered
                            loading={loading}
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                            }}

                            columns={ program_columns }
                            dataSource={ programListData }
                            className="w-full"
                        />
                    </>
                }   
            </div>
        </div>
    );
};

export default Post;

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