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
    Modal, Chip,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, useDisclosure
} from "@nextui-org/react";
import { getAllNewsHiddenForAdmin, forceDeleteNewsByIds, softDeleteNewsByIds, GetAllCategories} from "../../../../service/NewsService";

// forceDeleteNewsByIds

const PostStored = (props) => {
    const { successNoti, errorNoti, setSpinning, TypeNews } = props;

    const [newsListData, setNewsListData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading] = useState(false);

    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);

    const calculateRemainingTime = (deleteDate) => {
        const deleteMoment = moment(deleteDate);
        const futureDate = deleteMoment.add(30, 'days');
        const remainingMinutes = futureDate.diff(moment(), 'minutes');

        if (remainingMinutes < 60) {
            // Nếu còn dưới 1 giờ, tính số phút còn lại
            return { minutes: Math.max(0, remainingMinutes) };
        } else if (remainingMinutes < 24 * 60) {
            // Nếu còn dưới 1 ngày, tính số giờ còn lại
            const hours = Math.floor(remainingMinutes / 60);
            return { hours };
        } else {
            // Nếu còn trên 1 ngày, tính số ngày còn lại
            const remainingDays = futureDate.diff(moment(), 'days');
            return { days: remainingDays };
        }
    };

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
                    <Tooltip title="Thời gian tự động xoá">
                        <i className="fa-solid fa-hourglass-half text-[15px]"></i>
                    </Tooltip>
                </div>
            ),
            dataIndex: "auto_delete",
            render: (date) => {
                const { days, hours, minutes } = calculateRemainingTime(date);
                if (days) {
                    return <p className="text-[14px]">Tự động xoá sau {days} ngày</p>;
                } else if (hours) {
                    return <p className="text-[14px]">Tự động xoá sau {hours} giờ</p>;
                } else {
                    return <p className="text-[14px]">Tự động xoá sau {minutes} phút</p>;
                }
            },
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
                    <Tooltip title="Khôi phục">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            onClick={() => handleRestoreById(_id)}
                        >
                            <i className="fa-solid fa-clock-rotate-left"></i>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xoá vĩnh viễn">
                        <Button
                            isIconOnly
                            variant="light"
                            radius="full"
                            color="danger"
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
            setSelectedRow(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const handleUnSelect = () => {
        setSelectedRowKeys([]);
        setSelectedRow([]);
    };

    const handleRestore = async () => {
        setSpinning(true);
        const putData = {
            id_new: selectedRowKeys,
            deleted: false,
        }
        try {
            if (TypeNews === 'News') {
                await softDeleteNewsByIds(putData);
                await getNews();
                setSpinning(false);
                successNoti("Khôi phục thành công");
                handleUnSelect();
            } 
        } catch (error) {
            setSpinning(false);
            successNoti("Khôi phục thất bại");
            console.error("Error fetching news:", error);
        }
    };

    const handleRestoreById = async (_id) => {
        setSpinning(true);
        const putData = {
            id_new: [_id],
            deleted: false,
        }
        try {
            if (TypeNews === 'News') { 
                await softDeleteNewsByIds(putData);
                await getNews();
                setSpinning(false);
                successNoti("Khôi phục thành công");
                handleUnSelect();
            }  
        } catch (error) {
            setSpinning(false);
            successNoti("Khôi phục thất bại");
            console.error("Error fetching news:", error);
        }
    };

    const handleForceDelete = async () => {
        setSpinning(true);

        let putData;

        if (deleteId) {
            putData = {
                id_new: [deleteId]
            }
        } else {
            putData = {
                id_new: selectedRowKeys
            }
        }

        try {
            if (TypeNews === 'News') { 
                await forceDeleteNewsByIds(putData);
                await getNews();
                setSpinning(false);
                successNoti("Cập nhật thành công");
                handleUnSelect();
            }  
        } catch (error) {
            setSpinning(false);
            errorNoti("Cập nhật thất bại");
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
            const response = await getAllNewsHiddenForAdmin();

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
                    auto_delete: news.updated_at
                };
            });

            setNewsListData(updatedNewsData);

            setSpinning(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setSpinning(false);
        }
    };

    useEffect(() => {
        if(TypeNews === "News") {
            getNews(); 
        } 
        getCategory();
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
                    <BreadcrumbItem>
                        <Link to="/admin/post">Quản lý bài viết</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Bài viết được lưu trữ</BreadcrumbItem>
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
                    <Tooltip title="Xoá vĩnh viễn toàn bộ bài viết" placement="left">
                        <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            radius="full"
                        >
                            <i className="fa-solid fa-broom"></i>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            {selectedRowKeys.length !== 0 && (
                <div className="Quick__Option flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 shadow-lg rounded-md border-1 border-slate-300">
                    <p className="text-sm font-medium">
                        <i className="fa-solid fa-circle-check mr-3 text-emerald-500"></i>{" "}
                        Đã chọn {selectedRow.length} bài viết
                    </p>
                    <div className="flex items-center gap-2">
                        <Tooltip
                            title={`Khôi phục ${selectedRowKeys.length} bài viết`}
                            getPopupContainer={() =>
                                document.querySelector(".Quick__Option")
                            }
                        >
                            <Button isIconOnly variant="light" radius="full" onClick={() => handleRestore()}>
                                <i className="fa-solid fa-clock-rotate-left"></i>
                            </Button>
                        </Tooltip>
                        <Tooltip
                            title={`Xoá vĩnh viễn ${selectedRowKeys.length} bài viết`}
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
            <div className="ListNews w-full flex flex-col gap-1">
                <div className="text-[12px] opacity-50">
                    <i className="fa-solid fa-circle-info mr-1"></i>
                    Bài viết được lưu trữ sẽ tự động xoá sau 30 ngày
                </div>
                <Table
                    bordered
                    loading={loading}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={newsListData}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default PostStored;


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
                                Bài viết sẽ bị <Chip variant="flat" radius="sm" color="danger" className="mx-[1px]">Xoá vĩnh viễn<i class="fa-solid fa-circle-xmark ml-2"></i></Chip> và không thể khôi phục, tiếp tục thao tác?
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Huỷ
                            </Button>
                            <Button color="danger" className="font-medium" onPress={() => handleOnOKClick(onClose)}>
                                Xoá vĩnh viễn
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}