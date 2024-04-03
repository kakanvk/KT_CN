import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import "./Home.css";

import { Tooltip, Spinner, Image, Button, Divider, Card, CardHeader, CardFooter } from "@nextui-org/react";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import i18next from "i18next";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";

import home_cover from "../../../../assets/home_cover.jpg"
import home_cover1 from "../../../../assets/home_cover1.png"
import home_cover2 from "../../../../assets/home_cover2.jpg"

import DH from "../../../../assets/DH.jfif"
import SDH from "../../../../assets/SDH.jfif"


import { Carousel } from "antd";
import { GetNewViEn } from "../../../../service/NewsService";

const Home = () => {
    const { t } = useTranslation();

    const [newsData, setNewsData] = useState([]); // State to store news data
    const [newsDataFitlered, setNewsDataFiltered] = useState([]); // State to store news data
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);

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
        }).slice(0, 8);

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
    const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

    const departments = [
        {
            name: t("menu.text_link_4.sub1"),
            icon: <i className="fa-solid fa-building text-orange-500 group-hover/item:text-[white] w-4"></i>,
            link: ""
        },
        {
            name: t("menu.text_link_4.sub2"),
            icon: <i className="fa-solid fa-microchip text-orange-500 group-hover/item:text-[white] w-4"></i>,
            link: ""
        },
        {
            name: t("menu.text_link_4.sub3"),
            icon: <i className="fa-solid fa-screwdriver-wrench text-orange-500 group-hover/item:text-[white] w-4"></i>,
            link: ""
        },
        {
            name: t("menu.text_link_4.sub4"),
            icon: <i className="fa-solid fa-bolt text-orange-500 group-hover/item:text-[white] w-4"></i>,
            link: ""
        },
        {
            name: t("menu.text_link_4.sub5"),
            icon: <i className="fa-solid fa-trowel text-orange-500 group-hover/item:text-[white] w-4"></i>,
            link: ""
        },
        {
            name: t("menu.text_link_4.sub6"),
            icon: <i className="fa-solid fa-spa text-orange-500 group-hover/item:text-[white] w-4"></i>,
            link: ""
        }
    ]

    return (
        <div className="Home">
            {/* <div className="flex justify-center items-center overflow-hidden w-full h-[500px] relative">
                <img src={home_cover} alt="" className="object-cover w-full h-full" />
                <div className="bg-blue-950 opacity-70 absolute inset-0 w-full h-full"></div>
                <div className="absolute inset-0 w-full h-full font-extrabold text-[white] text-[50px] uppercase">
                    {t("menu.SET_name")}
                </div>
            </div> */}
            <Carousel autoplay>
                <div className="flex justify-center items-center overflow-hidden w-full h-[500px] relative">
                    <img
                        src={home_cover}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex justify-center items-center overflow-hidden w-full h-[500px] relative">
                    <img src={home_cover2} alt="" className="object-cover w-full h-full" />
                </div>
                <div className="flex justify-center items-center overflow-hidden w-full h-[500px] relative">
                    <img
                        src={home_cover}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
            </Carousel>

            <div className="flex flex-col gap-5">
                {/* Giới thiệu */}
                <div className="flex flex-col lg:flex-row w-full items-center gap-14 p-6 py-10 lg:p-20">
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <span className="opacity-70 text-md font-semibold">
                                <i className="fa-solid fa-feather mr-2"></i>
                                {t("home.introduce.text_1")}
                            </span>
                            <h2 className="uppercase font-black text-orange-500 text-[32px] leading-tight">{t("menu.SET_name")}</h2>
                            <p className="font-bold text-[23px] -mt-1">{t("home.introduce.text_2")}<i className="fa-solid fa-arrow-trend-up ml-2 text-orange-500"></i></p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-justify leading-normal">{t("home.introduce.text_3")}</p>
                            <div className="flex flex-col gap-2 w-full">
                                <p className="font-semibold flex items-start gap-3">
                                    <span className="flex items-center justify-center mt-1 w-[16px] h-[16px] rounded-xl bg-orange-500 text-[white] text-[11px]">1</span>
                                    <p className="text-wrap flex-1">{t("menu.text_link_4.sub1")}</p>
                                </p>
                                <p className="font-semibold flex items-start gap-3 text-wrap">
                                    <span className="flex items-center justify-center mt-1 w-[16px] h-[16px] rounded-xl bg-orange-500 text-[white] text-[11px]">2</span>
                                    <p className="text-wrap flex-1">{t("menu.text_link_4.sub2")}</p>
                                </p>
                                <p className="font-semibold flex items-start gap-3 text-wrap">
                                    <span className="flex items-center justify-center mt-1 w-[16px] h-[16px] rounded-xl bg-orange-500 text-[white] text-[11px]">3</span>
                                    <p className="text-wrap flex-1">{t("menu.text_link_4.sub3")}</p>
                                </p>
                                <p className="font-semibold flex items-start gap-3 text-wrap">
                                    <span className="flex items-center justify-center mt-1 w-[16px] h-[16px] rounded-xl bg-orange-500 text-[white] text-[11px]">4</span>
                                    <p className="text-wrap flex-1">{t("menu.text_link_4.sub4")}</p>
                                </p>
                                <p className="font-semibold flex items-start gap-3 text-wrap">
                                    <span className="flex items-center justify-center mt-1 w-[16px] h-[16px] rounded-xl bg-orange-500 text-[white] text-[11px]">5</span>
                                    <p className="text-wrap flex-1">{t("menu.text_link_4.sub5")}</p>
                                </p>
                            </div>
                            <p className="text-justify mt-2 leading-normal">{t("home.introduce.text_4")}</p>
                        </div>
                        <div className="flex gap-3 items-center justify-start mt-5">
                            <Button
                                radius="full"
                                size="md"
                                variant="primary"
                                className="flex justify-between items-center gap-5 bg-orange-500 text-[white]"
                            >
                                <span className="font-medium text-left">{t("home.introduce.text_5")}</span>
                                <i className="fa-solid fa-angle-right text-[white]"></i>
                            </Button>
                            <Button
                                radius="full"
                                size="md"
                                variant="bordered"
                                className="flex justify-between items-center gap-5 border-[1.5px] border-orange-500"
                                as={Link}
                                to="/about"
                            >
                                <span className="font-medium text-left text-orange-500">{t("home.introduce.text_6")}</span>
                                <i className="fa-solid fa-angle-right text-orange-500"></i>
                            </Button>
                        </div>
                    </div>
                    <div className="w-full lg:w-[40%] flex justify-center items-center overflow-hidden">
                        <img src={home_cover1} alt="" className="object-contain h-full" />
                    </div>
                </div>

                {/* Các đối tác */}
                <div className="flex flex-col w-full m-auto gap-4">
                    <span className="m-auto font-bold text-center text-lg">ĐỐI TÁC CỦA CHÚNG TÔI</span>
                    <di className="bg-zinc-100 w-full">
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 m-auto w-[300px] sm:w-[70%] max-w-[700px]">
                            <Link
                                className="flex items-center justify-center aspect-square"
                                to="https://fpt.vn/vi/khach-hang-ca-nhan/ho-tro/lien-he-24-7/diem-giao-dich"
                                target="_blank"
                            >
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/ktcn-set-tvu.appspot.com/o/hNz8_FPT.png?alt=media&token=20c2464d-6012-4042-b21d-063255918d19"
                                    className="object-cover w-[60%]"
                                />
                            </Link>
                            <Link
                                className="flex items-center justify-center  aspect-square"
                                to="http://phuongnamtelecom.com/gioithieu.html"
                                target="_blank"
                            >
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/ktcn-set-tvu.appspot.com/o/Hatk_Phuongnam.png?alt=media&token=fa3507dd-6f52-4663-bf42-ff6911ce32fc"
                                    className="object-cover w-[60%]"
                                />
                            </Link>
                            <Link
                                className="flex items-center justify-center  aspect-square"
                                to="http://www.xaydungaci.com.vn/"
                                target="_blank"
                            >
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/ktcn-set-tvu.appspot.com/o/3iL3_ACI.png?alt=media&token=59b8d54d-10ab-4fc0-9bb7-a47eed48a2f5"
                                    className="object-cover w-[60%]"
                                />
                            </Link>
                            <Link
                                className="flex items-center justify-center  aspect-square"
                                to="http://www.adsdyes.com/oled.html"
                                target="_blank"
                            >
                                <img
                                    src="https://firebasestorage.googleapis.com/v0/b/ktcn-set-tvu.appspot.com/o/YPq9_Mylang.png?alt=media&token=4d8106d4-dba8-4b69-a7dd-a8157f1816ff"
                                    className="object-cover w-[60%]"
                                />
                            </Link>
                        </div>
                    </di>
                </div>

                {/* Tuyển sinh */}
                <div className="flex flex-col-reverse md:flex-row w-full items-center gap-14 p-6 lg:p-20">
                    <div className="flex-1 flex flex-col gap-5">
                        <div className="text-[28px] flex flex-col items-center">
                            <i className="fa-solid fa-graduation-cap text-4xl text-sky-600 mb-2"></i>
                            <span className="font-extrabold text-orange-500">TUYỂN SINH</span>
                            <span className="font-bold -mt-1">trên toàn quốc với</span>
                        </div>
                        <dl className="w-full flex flex-col md:flex-row items-center justify-evenly gap-10 border-1 border-gray-300 rounded-2xl p-10 lg:py-5 px-8">
                            <div className="flex max-w-xs flex-col gap-y-3 items-center">
                                <dt className="text-base leading-7 text-gray-600">Ngành <strong>Bậc Đại học</strong></dt>
                                <dd className="order-first text-5xl font-bold tracking-tight text-orange-500 sm:text-5xl">
                                    08
                                </dd>
                            </div>
                            <Divider className="w-[100px] md:hidden" />
                            <Divider orientation="vertical" className="h-[50px] hidden md:block" />
                            <div className="flex max-w-xs flex-col gap-y-3 items-center">
                                <dt className="text-base leading-7 text-gray-600">Ngành <strong>Bậc Thạc sĩ</strong></dt>
                                <dd className="order-first text-5xl font-bold tracking-tight text-orange-500 sm:text-5xl">
                                    02
                                </dd>
                            </div>
                            <Divider className="w-[100px] md:hidden" />
                            <Divider orientation="vertical" className="h-[50px] hidden md:block" />
                            <div className="flex max-w-xs flex-col gap-y-3 items-center">
                                <dt className="text-base leading-7 text-gray-600">Ngành <strong>Bậc Tiến sĩ</strong></dt>
                                <dd className="order-first text-5xl font-bold tracking-tight text-orange-500 sm:text-5xl">
                                    01
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="m-auto max-w-[1000px] gap-4 grid grid-cols-12 px-8 mb-10 sm:mb-16">
                    <Card isFooterBlurred className="w-full aspect-square col-span-12 sm:col-span-6">
                        <Image
                            removeWrapper
                            alt="Card example background"
                            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                            src={DH}
                        />
                        <CardFooter className="absolute bg-black/20 bottom-0 z-10 justify-between">
                            <div className="flex flex-col ml-1">
                                <p className="text-tiny text-white">Tuyển sinh</p>
                                <p className="text-lg text-white font-bold">Đại học</p>
                            </div>
                            <Button radius="full" size="sm" className="font-medium bg-orange-500 text-white">Xem thêm<i className="fa-solid fa-angle-right"></i></Button>
                        </CardFooter>
                    </Card>
                    <Card isFooterBlurred className="w-full aspect-square col-span-12 sm:col-span-6">
                        <Image
                            removeWrapper
                            alt="Relaxing app background"
                            className="z-0 w-full h-full object-cover"
                            src={SDH}
                        />
                        <CardFooter className="absolute bg-black/20 bottom-0 z-10 justify-between">
                            <div className="flex flex-col ml-1">
                                <p className="text-tiny text-white">Tuyển sinh</p>
                                <p className="text-lg text-white font-bold">Sau Đại học</p>
                            </div>
                            <Button radius="full" size="sm" className="font-medium bg-orange-500 text-white">Xem thêm<i className="fa-solid fa-angle-right"></i></Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Các bộ môn trực thuộc */}
                <div className="p-1 sm:px-5 md:px-10 lg:p-20 flex flex-col gap-8 py-20">
                    <p className="font-bold text-[22px] m-auto uppercase text-orange-500 px-5 text-center">{t("home.title_1")}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-x-10 w-[95%] m-auto">
                        {
                            departments.map((department, index) => {
                                return (
                                    <Link
                                        className={`flex w-full justify-between items-center border-[1.5px] border-gray-200 hover:bg-orange-600 hover:text-[white] group/item rounded-lg p-3 px-4`}
                                        key={index}
                                    >
                                        <div className="flex gap-4 items-center">
                                            {department.icon}
                                            <span className="font-semibold text-wrap text-left">{department.name}</span>
                                        </div>
                                        <i className="fa-solid fa-angle-right text-orange-600 group-hover/item:text-[white]"></i>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Tin tức */}
                <div className="p-2 sm:px-5 md:p-10 lg:px-20 flex flex-col gap-10">
                    <div className="News w-full flex flex-col">
                        <div className="flex p-4 justify-between items-center">
                            <p className="font-semibold text-[18px]"><i className="fa-solid fa-newspaper mr-3 text-orange-500"></i>{t("News.text_new_1")}</p>
                            <Link to="/news" className="opacity-70 text-[16px]">{t("News.text_new_2")}<i className="fa-solid fa-arrow-right-long ml-2"></i></Link>
                        </div>
                        <div className="grid gap-2 w-full grid-cols-1 md:grid-cols-2">
                            {newsDataFitlered.length === 0 ? <Spinner size="md" /> :
                                newsDataFitlered.map(news => (
                                    <Link key={news.id_new} className="w-full flex gap-4 group/news p-4 hover:bg-gray-100" to={`/news-detail/${news.id_new}`}>
                                        <Image
                                            loading="lazy"
                                            src={news.thumbnail}
                                            classNames={{
                                                wrapper: "w-[40%] sm:w-[25%]",
                                                img: "aspect-[4/3] w-full"
                                            }}
                                            radius="none"
                                        />
                                        <div className="flex flex-col flex-1 gap-2">
                                            <h2 className="font-medium text-justify">{i18next.language === "vi" ? news.title_vi : news.title_en}</h2>
                                            <div className="flex items-center gap-5 text-gray-400 text-[14px]">
                                                <Tooltip content={formatDateTime(news.created_at, i18next.language)} radius="sm" color="primary" showArrow>
                                                    <p><i className="fa-regular fa-clock mr-2"></i>{formatTimeAgo(news.created_at, i18next.language)}</p>
                                                </Tooltip>
                                                <Tooltip content={i18next.language === "vi" ? "Lượt xem" : "View"} radius="sm" color="primary" showArrow>
                                                    <p><i className="fa-regular fa-eye mr-2"></i>{news.view_count}</p>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>

                    {/* Sự kiện */}
                    <div className="News w-full flex flex-col">
                        <div className="flex p-4 justify-between items-center">
                            <p className="font-semibold text-[18px]"><i className="fa-solid fa-puzzle-piece mr-3 text-orange-500"></i>{t("News.text_new_3")}</p>
                            <Link to="/news" className="opacity-70 text-[16px]">{t("News.text_new_2")}<i className="fa-solid fa-arrow-right-long ml-2"></i></Link>
                        </div>
                        <div className="grid gap-2 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                            {newsDataFitlered.length === 0 ? <Spinner size="md" /> :
                                newsDataFitlered.map(news => (

                                    <Link key={news.id_new} className="w-full flex flex-col gap-3 group/news p-4 hover:bg-gray-100" to={`/news-detail/${news.id_new}`}>
                                        <Image
                                            loading="lazy"
                                            src={news.thumbnail}
                                            classNames={{
                                                img: "aspect-[4/3] w-full"
                                            }}
                                            radius="none"
                                        />
                                        <h2 className="font-medium text-justify">{i18next.language === "vi" ? news.title_vi : news.title_en}</h2>
                                        <div className="flex items-center gap-5 text-gray-400">
                                            <Tooltip content={formatDateTime(news.created_at, i18next.language)} radius="sm" color="primary" showArrow>
                                                <p><i className="fa-regular fa-clock mr-2"></i>{formatTimeAgo(news.created_at, i18next.language)}</p>
                                            </Tooltip>
                                            <Tooltip content={i18next.language === "vi" ? "Lượt xem" : "View"} radius="sm" color="primary" showArrow>
                                                <p><i className="fa-regular fa-eye mr-2"></i>{news.view_count}</p>
                                            </Tooltip>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
