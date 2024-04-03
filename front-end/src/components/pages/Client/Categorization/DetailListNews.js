import React, { useEffect, useState } from "react";
import { List, Pagination } from "antd";
import { Link, useParams } from "react-router-dom";
import { Tooltip, Spinner, Image } from "@nextui-org/react";
import i18next from "i18next";
import { getAllNewByCategory } from "../../../../service/CategoryService";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";

const DetailListNews = () => {
    const { id } = useParams();
    const [newsData, setNewsData] = useState([]);
    const [newsDataFitlered, setNewsDataFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [loading, setLoading] = useState(false);

    const getNews = async () => {
        setLoading(true);

        try {
            const response = await getAllNewByCategory(id);
            setNewsData(response.data);
            console.log("new data", newsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    };

    const changePostByLang = () => {
        const filterNewsData = newsData.filter((news) => {
            if (i18next.language === "vi" && news.status_vi === 1) {
                return news;
            } else if (i18next.language === "en" && news.status_en === 1) {
                return news;
            }
        });

        setNewsDataFiltered(filterNewsData);
    };

    useEffect(() => {
        changePostByLang();
    }, [newsData, i18next.language]);

    useEffect(() => {
        getNews();
    }, []);

    const onShowSizeChange = (current, size) => {
        setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi kích thước trang
        setPageSize(size);
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = newsDataFitlered.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <>
            <div className="Home p-5 bg-gray-300">
                <div className="News w-full">
                    <div className="grid gap-2 ml-4 sm:px-5 ml-[12px] bg-gray-50 p-3 rounded-md">
                        <h1 className="w-full p-3 border-[#e95a13] border-l-8 border-y-2  border-r-2 mb-4 text-left text-[#e95a13] font-bold">
                            {/* {console.log("new data", newsData)} */}
                            {i18next.language === "vi"
                                ? newsData[0]?.category_name_vi
                                : newsData[0]?.category_name_en}
                        </h1>
                        {newsDataFitlered.length === 0 ? (
                            <Spinner size="md" />
                        ) : (
                            currentItems.map((news) => (
                                <Link
                                    key={news.id_new}
                                    className="w-full flex flex-col gap-3 border-b-2 py-2 hover:bg-gray-100 rounded"
                                    to={`/newsAdmissions-detail/${news.id_new}`}
                                >
                                    <h2 className="font-medium text-justify">
                                        {i18next.language === "vi"
                                            ? news.title_vi
                                            : news.title_en}
                                    </h2>
                                    <div className="flex items-center gap-5 text-gray-400">
                                        <Tooltip
                                            content={formatDateTime(
                                                news.created_at,
                                                i18next.language
                                            )}
                                            radius="sm"
                                            color="primary"
                                            showArrow
                                        >
                                            <p>
                                                <i className="fa-regular fa-clock mr-2"></i>
                                                {formatTimeAgo(
                                                    news.created_at,
                                                    i18next.language
                                                )}
                                            </p>
                                        </Tooltip>
                                    </div>
                                </Link>
                            ))
                        )}
                        <div className="flex items-center justify-center w-full m-5">
                            <Pagination
                                onShowSizeChange={(current, size) =>
                                    onShowSizeChange(current, size)
                                }
                                onChange={(page) => onPageChange(page)}
                                defaultCurrent={1}
                                total={newsDataFitlered.length}
                                pageSize={pageSize}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DetailListNews;
