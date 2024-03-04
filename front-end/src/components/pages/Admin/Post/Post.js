import "./Post.css";
import { useEffect, useState } from "react";
import { ListNews, UpdateStatusVi, UpdateStatusEn, GetAllCategories, UpdateStatuses } from "../../../../service/ApiService";

import { Link } from "react-router-dom";
import moment from 'moment';
import { Table, Tooltip, Image } from 'antd';
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Switch } from "@nextui-org/react";

const Post = () => {

    const [newsListData, setNewsListData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedRowKey, setSelectedRowKey] = useState([]);

    const columns = [
        {
            title: 'Ảnh bìa',
            dataIndex: 'thumbnail',
            render: (text) =>
                <Image
                    width={100}
                    src={text}
                    className="rounded"
                />
        },
        {
            title: 'Tiêu đề bài viết',
            dataIndex: 'name_group',
            render: (record) =>
                <div className="text-sm">
                    <p className="font-medium">{record.title_vi}</p>
                    <p className="text-[12px] opacity-70 mt-1">{record.title_en}</p>
                </div>
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            render: (record) =>
                <div className="text-sm">
                    <p className="font-medium">{record.vi}</p>
                    <p className="text-[12px] opacity-70 mt-1">{record.en}</p>
                </div>,
            filters: categoryData,
            onFilter: (value, record) => record.category.id === value,
        },
        {
            title: 'Thời gian',
            dataIndex: 'date',
            width: "150px",
            render: (record) =>
                <div className="text-[12px]">
                    <span className="opacity-70">Ngày tạo:</span>
                    <p className="font-medium text-[13px] mb-2">{record.created_at}</p>
                    <span className="opacity-70">Ngày cập nhật:</span>
                    <p className="font-medium text-[13px]">{record.updated_at}</p>
                </div>
        },
        {
            title: 'Lượt xem',
            dataIndex: 'view_count',
        },
        {
            title:
                <Tooltip title="Trạng thái">
                    <Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/vn.svg" />
                </Tooltip>,
            dataIndex: 'status_vi',
            render: (record) =>
                <Switch
                    size="sm"
                    defaultSelected={record.value}
                    onClick={() => handleUpdateStatus_vi(record.id)}
                    className="scale-80"
                ></Switch>,
        },
        {
            title:
                <Tooltip title="Trạng thái">
                    <Avatar alt="Việt Nam" className="w-5 h-5" src="https://flagcdn.com/gb.svg" />
                </Tooltip>,
            dataIndex: 'status_en',
            render: (record) =>
                <Switch
                    size="sm"
                    defaultSelected={record.value}
                    onClick={() => handleUpdateStatus_en(record.id)}
                    className="scale-80"
                ></Switch>,
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRow(selectedRows);
            setSelectedRowKey(selectedRowKeys);
        }
    };

    const handleUpdateStatuses = (lang) => {

        const countVITrue = selectedRow.filter(row => row.status_vi.value).length;
        const countENTrue = selectedRow.filter(row => row.status_en.value).length;

        const checkValueVI = countVITrue === selectedRowKey.length ? true : false;
        const checkValueEN = countENTrue === selectedRowKey.length ? true : false;

        const putData = {
            id_new: selectedRowKey,
            lang: lang,
            status: lang === "vi" ? checkValueVI : checkValueEN
        }

        console.log(putData);
    }

    const getCategory = async () => {
        try {
            const response = await GetAllCategories();

            const newsCategoryData = response.data.map((news) => {
                return ({
                    value: news.id_category,
                    text: news.name_vi
                })
            })

            // console.log("Category data:", newsCategoryData);
            setCategoryData(newsCategoryData);

        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    const getNews = async () => {
        setLoading(true);
        try {
            const response = await ListNews();

            const newsData = response.data.map((news) => {
                return ({
                    key: news.id_new,
                    thumbnail: news.thumbnail,
                    name_group: {
                        thumbnail: news.thumbnail,
                        title_vi: news.title_vi,
                        title_en: news.title_en,
                    },
                    status_vi: {
                        value: news.status_vi,
                        id: news.id_new
                    },
                    status_en: {
                        value: news.status_en,
                        id: news.id_new
                    },
                    view_count: news.view_count,
                    category: {
                        en: news.category_name_en,
                        vi: news.category_name_vi,
                        id: news.id_category
                    },
                    date: {
                        created_at: moment(news.created_at).format('DD/MM/YYYY HH:mm'),
                        updated_at: moment(news.updated_at).format('DD/MM/YYYY HH:mm')
                    }
                })
            })

            // console.log("News data:", response.data);

            setNewsListData(newsData);

            setLoading(false);

        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getNews();
        getCategory();
    }, []);

    const handleUpdateStatus_vi = async (id) => {
        try {
            const response = await UpdateStatusVi(id);
            getNews();
        } catch (error) {
            console.error("error update: ", error);
        }
    };

    const handleUpdateStatus_en = async (id) => {
        try {
            const response = await UpdateStatusEn(id);
            getNews();
        } catch (error) {
            console.error("error update: ", error);
        }
    };

    return (
        <div className="HomeAdmin flex flex-col gap-5 items-start">
            <Breadcrumbs underline="hover">
                <BreadcrumbItem>Admin Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Quản lý bài viết</BreadcrumbItem>
            </Breadcrumbs>
            <Button color="primary" radius="sm" as={Link} to="/admin/post/create">Tạo bài viết</Button>
            {
                selectedRow.length !== 0 &&
                <div className="flex justify-between items-center sticky top-2 bg-[white] z-50 w-full p-4 py-3 shadow-lg rounded-md border-1 border-slate-300">
                    <p className="text-sm">Đã chọn {selectedRow.length} bài viết</p>
                    <div className="flex items-center gap-2">
                        <Button isIconOnly variant="light" radius="full">
                            <i className="fa-solid fa-trash-can"></i>
                        </Button>
                        <Switch
                            size="sm"
                            className="scale-80"
                            classNames={{
                                base: "flex-row-reverse gap-2",
                                wrapper: "mr-0"
                            }}
                            onClick={() => { handleUpdateStatuses("vi") }}
                        >
                            <Avatar alt="Việt Nam" className="w-6 h-6" src="https://flagcdn.com/vn.svg" />
                        </Switch>
                        <Switch
                            size="sm"
                            className="scale-80"
                            classNames={{
                                base: "flex-row-reverse gap-2",
                                wrapper: "mr-0"
                            }}
                            onClick={() => { handleUpdateStatuses("en") }}
                        >
                            <Avatar alt="English" className="w-6 h-6" src="https://flagcdn.com/gb.svg" />
                        </Switch>
                    </div>
                </div>
            }
            <div className="ListNews">
                <Table
                    bordered
                    loading={loading}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={newsListData}
                />
            </div>
        </div>
    );
};

export default Post;
