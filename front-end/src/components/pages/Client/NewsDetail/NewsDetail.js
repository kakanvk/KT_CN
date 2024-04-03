import React, { useEffect, useState } from "react";
import {
    GetNewViEnById,
    get5LatestNews,
    getTop5ViewCount,
    updateViewCount,
} from "../../../../service/ApiService";


import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";
import "./NewsDetail.css";
import i18next from "i18next";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import { Image, Tooltip } from "@nextui-org/react";
import { GetNewAdmissionById, getTop5RelatedDepartment, updateViewCountAdmission } from "../../../../service/AdmissionNewsService";
import { EmailAuthCredential } from "firebase/auth";
import { getTop5RelatedCategory } from "../../../../service/NewsService";

const NewsDetail = (props) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { TypeNews } = props;

    const [newsDetailData, setNewsDetailData] = useState({});
    const [latestNews, setLatestNews] = useState([]);
    const [topViewCountNews, setTopViewCountNews] = useState([]);
    const [relativeCategoryNews, setRelativeCategoryNews] = useState([]);
    const [RelativeDepartmentNewNews, setRelativeDepartmentNewNews] = useState([]);
    const [hhh, setIdCategory] = useState("");


    
    const getDetailNews = async () => {
        try {
            if (TypeNews ==="News") {
                const response = await GetNewViEnById(id);
                console.log("newsDetailData:", response.data);
                setNewsDetailData(response.data[0]);
                const data = {
                    "id_category": response.data[0].id_category
                }
                await getRelativeCategoryNews(id, data);
            } else if (TypeNews === "admissionNews") {
                const response = await GetNewAdmissionById(id);
                console.log("newsDetailData:", response.data);
                setNewsDetailData(response.data[0]);
            }
        } catch (error) {
            console.error("Error fetching newsDetailData:", error);
        }
    };

    const getRelativeCategoryNews = async (id, data) => {
        try {
  
            const response = await getTop5RelatedCategory(id, data);
            console.log("relativeCategoryNews:", response.data);
            setRelativeCategoryNews(response.data);
        } catch (error) {
            console.error("Error fetching relativeCategoryNews:", error);
        }
    };

    const getLatestNews = async () => {
        try {
            const response = await get5LatestNews();
            console.log("latestNews:", response.data);
            setLatestNews(response.data);
        } catch (error) {
            console.error("Error fetching latestNews:", error);
        }
    };
    const getRelativeDepartmentNews = async () => {
        try {
            // note: data DepartmentNews
            const response = await getTop5RelatedDepartment(id);
            console.log("relativeCategoryNews:", response.data);
            setRelativeDepartmentNewNews(response.data);
        } catch (error) {
            console.error("Error fetching relativeCategoryNews:", error);
        }
    }


    const getTopViewCountNews = async () => {
        try {
            const response = await getTop5ViewCount();
            //console.log("topViewCountNews:", response.data);
            setTopViewCountNews(response.data);
        } catch (error) {
            console.error("Error fetching topViewCountNews:", error);
        }
    };

    const updateView = async () => {
        try {
            if (TypeNews === "News"){
                const response = await updateViewCount(id);
            } else if (TypeNews === "admissionNews") {
                const response = await updateViewCountAdmission(id);
            }
        } catch (error) {
            console.error("Error fetching updateViewCount:", error);
        }
    };

    useEffect(() => {
        getDetailNews();
        getLatestNews();
        getTopViewCountNews();

        if(TypeNews ==="News") {
            
        } else if(TypeNews ==="admissionNews") {
            getRelativeDepartmentNews();
        }
        updateView();
    }, [id]);

    return (
        <div className="newsDetail flex flex-col lg:flex-row p-[20px] gap-[30px] sm:p-[30px] xl:px-[70px] xl:gap-[50px]">
            <div className="newsDetail_left flex-1">
                <div>
                    <h2 className="newsDetail_left_title font-bold text-2xl">
                        {i18next.language === "vi"
                            ? newsDetailData?.title_vi
                            : newsDetailData?.title_en}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start mt-2 mb-5 gap-1 sm:gap-5 text-[14px] opacity-50 font-medium">
                        <p className="flex items-center w-fit gap-3">
                            {formatDateTime(
                                newsDetailData?.created_at,
                                i18next.language
                            )}
                            <i class="fa-solid fa-circle text-[4px]"></i>
                            {formatTimeAgo(
                                newsDetailData?.created_at,
                                i18next.language
                            )}
                        </p>
                        <p>
                            <i class="fa-regular fa-eye mr-2"></i>
                            {newsDetailData?.view_count} lượt xem
                        </p>
                    </div>
                    {/* <hr className="mt-5 border-[1.5px] opacity-70" /> */}
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                i18next.language === "vi"
                                    ? newsDetailData?.content_vi
                                    : newsDetailData?.content_en,
                        }}
                        className="News__Detail__Content"
                    ></div>
                </div>
            </div>

            <div className="newsDetail_right sticky top-[80px] w-[100%] min-w-[300px] lg:max-w-[380px] flex flex-col gap-10">
                <div className="New_Relative w-full">
                    <div className="New_Relative_tital">
                        <h2>{t("NewsDetail.related")}</h2>
                        <p className="text-sm font-normal">
                            {relativeCategoryNews?.length}{" "}
                            {i18next.language === "vi" ? "bài viết" : "posts"}
                        </p>
                    </div>
                    <div className="New_Relative_top5 flex flex-col gap-5">
                    {
                        TypeNews === "News" ?
                            relativeCategoryNews.map((news) => (
                                <Link
                                    to={`../news-detail/${news.id_new}`}
                                    key={news.id_new}
                                    className="flex gap-3"
                                >
                                    <Image
                                        src={news.thumbnail}
                                        classNames={{
                                            img: "aspect-[4/3] w-[120px] rounded",
                                        }}
                                        radius="none"
                                    />
                                    <p className="flex-1 text-[14px] font-medium">
                                        {i18next.language === "vi"
                                            ? news?.title_vi
                                            : news?.title_en}
                                    </p>
                                </Link>
                            ))
                        :
                            RelativeDepartmentNewNews.map((news) => (
                                <Link
                                    to={`../newsAdmissions-detail/${news.id_admission_news}`}
                                    key={news.id_admission_news}
                                    className="flex gap-3"
                                >
                                    <Image
                                        src={news.thumbnail}
                                        classNames={{
                                            img: "aspect-[4/3] w-[120px] rounded",
                                        }}
                                        radius="none"
                                    />
                                    <p className="flex-1 text-[14px] font-medium">
                                        {i18next.language === "vi"
                                            ? news?.title_vi
                                            : news?.title_en}
                                    </p>
                                </Link>
                            ))
                    }
                    </div>
                </div>

                <div className="New_Latest w-full">
                    <div className="New_Relative_tital">
                        <h2>{t("NewsDetail.latest")}</h2>
                        <p className="text-sm font-normal">
                            {latestNews?.length}{" "}
                            {i18next.language === "vi" ? "bài viết" : "posts"}
                        </p>
                    </div>
                    <div className="New_latest_stories_top5 flex flex-col gap-5">
                        {latestNews.map((news) => (
                            <Link
                                to={`../news-detail/${news.id_new}`}
                                key={news.id_new}
                                className="flex gap-3"
                            >
                                <Image
                                    src={news.thumbnail}
                                    classNames={{
                                        img: "aspect-[4/3] w-[120px] rounded",
                                    }}
                                    radius="none"
                                />
                                <p className="flex-1 text-[14px] font-medium">
                                    {i18next.language === "vi"
                                        ? news?.title_vi
                                        : news?.title_en}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="New_Latest w-full">
                    <div className="New_Relative_tital">
                        <h2>{t("NewsDetail.popular")}</h2>
                        <p className="text-sm font-normal">
                            {topViewCountNews?.length}{" "}
                            {i18next.language === "vi" ? "bài viết" : "posts"}
                        </p>
                    </div>
                    <div className="New_latest_stories_top5 flex flex-col gap-5">
                        {topViewCountNews.map((news) => (
                            <Link
                                to={`../news-detail/${news.id_new}`}
                                key={news.id_new}
                                className="flex gap-3"
                            >
                                <Image
                                    src={news.thumbnail}
                                    classNames={{
                                        img: "aspect-[4/3] w-[120px] rounded",
                                    }}
                                    radius="none"
                                />
                                <p className="flex-1 text-[14px] font-medium">
                                    {i18next.language === "vi"
                                        ? news?.title_vi
                                        : news?.title_en}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
