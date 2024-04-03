import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

import { Tooltip, Spinner, Image } from "@nextui-org/react";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import i18next from "i18next";
import { GetNewViEn } from "../../../../service/NewsService";

const ActivityTVU = () => {
    const { t } = useTranslation();

    const [newsData, setNewsData] = useState([]);
    const [newsDataFitlered, setNewsDataFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);

    const [loading, setLoading] = useState(false);

    const getNews = async () => {
        setLoading(true);
        try {
            const response = await GetNewViEn();
            setNewsData(response.data);
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
        setCurrentPage(1);
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
        <div className="Home p-5">
            <div className="News w-full">
                <div className="grid gap-2 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    {newsDataFitlered.length === 0 ? (
                        <Spinner size="md" />
                    ) : (
                        currentItems.map((news) => (
                            <Link
                                key={news.id_new}
                                className="w-full flex flex-col gap-3 group/news p-4 hover:bg-gray-100 rounded"
                                to={`/news-detail/${news.id_new}`}
                            >
                                <Image
                                    loading="lazy"
                                    src={news.thumbnail}
                                    classNames={{
                                        img: "aspect-[4/3] rounded w-full",
                                    }}
                                    radius="none"
                                />
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
                                    <Tooltip
                                        content={
                                            i18next.language === "vi"
                                                ? "Lượt xem"
                                                : "View"
                                        }
                                        radius="sm"
                                        color="primary"
                                        showArrow
                                    >
                                        <p>
                                            <i className="fa-regular fa-eye mr-2"></i>
                                            {news.view_count}
                                        </p>
                                    </Tooltip>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
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
    );
};

export default ActivityTVU;
