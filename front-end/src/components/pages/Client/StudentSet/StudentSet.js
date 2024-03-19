import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";

import i18next from "i18next";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import { Image, Tooltip, Select, SelectItem } from "@nextui-org/react";
import { EmailAuthCredential } from "firebase/auth";
import { getSixNewsByIdCategory } from "../../../../service/StudentSetApiService";

const StudentSet = (props) => {
    const { t } = useTranslation();

    const [testSchedule, setTestSchedule] = useState([]);
    const [learnBurns, setLearnBurns] = useState([]);
    const [tuition, setTuition] = useState([]);
    const [notification, setNotification] = useState([]);
    const [studentHandbook, setStudentHandbook] = useState([]);
    const [recruitment, setRecruitment] = useState([]);
    const [rules, setRules] = useState([]);
    const [form, setForm] = useState([]);
    const fetchData = async () => {
        try {
            const NewsData = await getSixNewsByIdCategory();
            console.log(NewsData);
            setTestSchedule(
                NewsData.data
                    .filter((item) => item.id_category === 3)
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
            setLearnBurns(
                NewsData.data
                    .filter((item) => item.id_category === 4)
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
            setTuition(
                NewsData.data
                    .filter((item) => item.id_category === 5)
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
            setNotification(
                NewsData.data
                    .filter((item) => item.id_category === 6)
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
            setStudentHandbook(
                NewsData.data
                    .filter((item) => item.id_category === 7)
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
            setRecruitment(
                NewsData.data
                    .filter((item) => item.id_admission_news)
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
            setRules(
                NewsData.data
                    .filter((item) => item.id_category === 9)
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
            setForm(
                NewsData.data
                    .filter((item) => item.id_category === 10)
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const departmentDataTest = [
        { value: "1", label: "Department 1" },
        { value: "2", label: "Department 2" },
        { value: "3", label: "Department 3" },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-[#f5f5f5]">
            <div className="pt-[25px] w-full m-auto">
                <h1 className="text-center font-bold text-2xl text-[#e95a13]">
                    {t("StudentSet.tital.title1")}
                </h1>
            </div>

            <div className="flex flex-col sm:p-[30px]  lg:flex-row lg:justify-center p-[20px] gap-[30px] xl:px-[70px] xl:justify-center ">
                <div className="w-full flex flex-col gap-[30px] sm:m-auto lg:w-full xl:w-full">
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 bg-[#e95a13] mb-4">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title2")}
                            </p>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[15px]">
                            {testSchedule.length !== 0 ? (
                                testSchedule.map((item) => (
                                    <div key={item.id_new}>
                                        <Link
                                            to={`/news-detail/${item.id_new}`}
                                        >
                                            {i18next.language === "vi"
                                                ? item.title_vi
                                                : item.title_en}
                                        </Link>
                                        <div className="flex items-center gap-5 text-gray-400 text-[14px]">
                                            <Tooltip
                                                content={formatDateTime(
                                                    item.created_at,
                                                    i18next.language
                                                )}
                                                radius="sm"
                                                color="primary"
                                                showArrow
                                            >
                                                <p>
                                                    <i className="fa-regular fa-calendar-days mr-2"></i>
                                                    {formatTimeAgo(
                                                        item.created_at,
                                                        i18next.language
                                                    )}
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : i18next.language === "vi" ? (
                                <p>Không có bài viết nào</p>
                            ) : (
                                <p>No articles available</p>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <div>
                                <Link
                                    to={`/news/category/undergraduate/3}`}
                                    className="text-blue-500 font-medium"
                                >
                                    {t("StudentSet.button.watch")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 bg-[#e95a13] mb-4">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title3")}
                            </p>
                        </div>
                        <div className="w-full py-[10px] pl-10 flex flex-col gap-[10px]">
                            {learnBurns.length !== 0 ? (
                                learnBurns.map((item) => (
                                    <div key={item.id_new}>
                                        <Link to={`/news-detail/4`}>
                                            {i18next.language === "vi"
                                                ? item.title_vi
                                                : item.title_en}
                                        </Link>
                                        <div className="flex items-center gap-5 text-gray-400 text-[14px]">
                                            <Tooltip
                                                content={formatDateTime(
                                                    item.created_at,
                                                    i18next.language
                                                )}
                                                radius="sm"
                                                color="primary"
                                                showArrow
                                            >
                                                <p>
                                                    <i className="fa-regular fa-calendar-days mr-2"></i>
                                                    {formatTimeAgo(
                                                        item.created_at,
                                                        i18next.language
                                                    )}
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : i18next.language === "vi" ? (
                                <p>Không có bài viết nào</p>
                            ) : (
                                <p>No articles available</p>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <div>
                                <Link
                                    to={`/news/category/undergraduate/4`}
                                    className="text-blue-500 font-medium"
                                >
                                    {t("StudentSet.button.watch")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 bg-[#e95a13] mb-4">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title4")}
                            </p>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[15px]">
                            {tuition.length !== 0 ? (
                                tuition.map((item) => (
                                    <div key={item.id_new}>
                                        <Link
                                            to={`/news-detail/${item.id_new}`}
                                        >
                                            {i18next.language === "vi"
                                                ? item.title_vi
                                                : item.title_en}
                                        </Link>
                                        <div className="flex items-center gap-5 text-gray-400 text-[14px]">
                                            <Tooltip
                                                content={formatDateTime(
                                                    item.created_at,
                                                    i18next.language
                                                )}
                                                radius="sm"
                                                color="primary"
                                                showArrow
                                            >
                                                <p>
                                                    <i className="fa-regular fa-calendar-days mr-2"></i>
                                                    {formatTimeAgo(
                                                        item.created_at,
                                                        i18next.language
                                                    )}
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : i18next.language === "vi" ? (
                                <p>Không có bài viết nào</p>
                            ) : (
                                <p>No articles available</p>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <div>
                                <Link
                                    to={`/news/category/undergraduate/5`}
                                    className="text-blue-500 font-medium"
                                >
                                    {t("StudentSet.button.watch")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 bg-[#e95a13] mb-4">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title5")}
                            </p>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[15px]">
                            {notification.length !== 0 ? (
                                notification.map((item) => (
                                    <div key={item.id_new}>
                                        <Link
                                            to={`/news-detail/${item.id_new}`}
                                        >
                                            {i18next.language === "vi"
                                                ? item.title_vi
                                                : item.title_en}
                                        </Link>
                                        <div className="flex items-center gap-5 text-gray-400 text-[14px]">
                                            <Tooltip
                                                content={formatDateTime(
                                                    item.created_at,
                                                    i18next.language
                                                )}
                                                radius="sm"
                                                color="primary"
                                                showArrow
                                            >
                                                <p>
                                                    <i className="fa-regular fa-calendar-days mr-2"></i>
                                                    {formatTimeAgo(
                                                        item.created_at,
                                                        i18next.language
                                                    )}
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : i18next.language === "vi" ? (
                                <p>Không có bài viết nào</p>
                            ) : (
                                <p>No articles available</p>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <div>
                                <Link
                                    to={`/news/category/undergraduate/6`}
                                    className="text-blue-500 font-medium"
                                >
                                    {t("StudentSet.button.watch")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 bg-[#e95a13] mb-4">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title6")}
                            </p>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[15px]">
                            {studentHandbook.length !== 0 ? (
                                studentHandbook.map((item) => (
                                    <div key={item.id_new}>
                                        <Link
                                            to={`/news-detail/${item.id_new}`}
                                        >
                                            {i18next.language === "vi"
                                                ? item.title_vi
                                                : item.title_en}
                                        </Link>
                                        <div className="flex items-center gap-5 text-gray-400 text-[14px]">
                                            <Tooltip
                                                content={formatDateTime(
                                                    item.created_at,
                                                    i18next.language
                                                )}
                                                radius="sm"
                                                color="primary"
                                                showArrow
                                            >
                                                <p>
                                                    <i className="fa-regular fa-calendar-days mr-2"></i>
                                                    {formatTimeAgo(
                                                        item.created_at,
                                                        i18next.language
                                                    )}
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : i18next.language === "vi" ? (
                                <p>Không có bài viết nào</p>
                            ) : (
                                <p>No articles available</p>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <div>
                                <Link
                                    to={`/news/category/undergraduate/7`}
                                    className="text-blue-500 font-medium"
                                >
                                    {t("StudentSet.button.watch")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 bg-[#e95a13] mb-4">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title7")}
                            </p>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[15px]">
                            {recruitment.length !== 0 ? (
                                recruitment.map((item) => (
                                    <div key={item.id_admission_news}>
                                        <Link
                                            to={`/newsAdmissions-detail/${item.id_admission_news}`}
                                        >
                                            {i18next.language === "vi"
                                                ? item.title_vi
                                                : item.title_en}
                                        </Link>
                                        <div className="flex items-center gap-5 text-gray-400 text-[14px]">
                                            <Tooltip
                                                content={formatDateTime(
                                                    item.created_at,
                                                    i18next.language
                                                )}
                                                radius="sm"
                                                color="primary"
                                                showArrow
                                            >
                                                <p>
                                                    <i className="fa-regular fa-calendar-days mr-2"></i>
                                                    {formatTimeAgo(
                                                        item.created_at,
                                                        i18next.language
                                                    )}
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : i18next.language === "vi" ? (
                                <p>Không có bài viết nào</p>
                            ) : (
                                <p>No articles available</p>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <div>
                                <Link
                                    to={`/news/category/admission`}
                                    className="text-blue-500 font-medium"
                                >
                                    {t("StudentSet.button.watch")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col gap-[70px] p-5 bg-[#ffffff]  sm:w-full sm: mx-auto lg:w-[400px]  xl:w-[500px] ">
                    <div className="flex flex-col gap-[20px]">
                        <div className="w-full p-3 bg-[#e95a13]">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title8")}
                            </p>
                        </div>
                        <Select
                            label={t("StudentSet.button.label1")}
                            placeholder={t("StudentSet.button.placeholder1")}
                            labelPlacement="outside"
                            className="w-full rounded-sm"
                            disableSelectorIconRotation
                        >
                            {departmentDataTest.map((department) => (
                                <SelectItem
                                    key={department.value}
                                    value={department.value}
                                >
                                    {department.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label={t("StudentSet.button.label2")}
                            placeholder={t("StudentSet.button.placeholder2")}
                            labelPlacement="outside"
                            className="w-full rounded-sm"
                            disableSelectorIconRotation
                        >
                            {departmentDataTest.map((department) => (
                                <SelectItem
                                    key={department.value}
                                    value={department.value}
                                >
                                    {department.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className="flex flex-col gap-[20px]">
                        <div className="w-full p-3 bg-[#e95a13]">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title9")}
                            </p>
                        </div>
                        <Select
                            label={t("StudentSet.button.label1")}
                            placeholder={t("StudentSet.button.placeholder1")}
                            labelPlacement="outside"
                            className="w-full rounded-sm"
                            disableSelectorIconRotation
                        >
                            {departmentDataTest.map((department) => (
                                <SelectItem
                                    key={department.value}
                                    value={department.value}
                                >
                                    {department.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label={t("StudentSet.button.label2")}
                            placeholder={t("StudentSet.button.placeholder2")}
                            labelPlacement="outside"
                            className="w-full rounded-sm"
                            disableSelectorIconRotation
                        >
                            {departmentDataTest.map((department) => (
                                <SelectItem
                                    key={department.value}
                                    value={department.value}
                                >
                                    {department.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className="flex flex-col gap-[20px]">
                        <div className="w-full p-3 bg-[#e95a13] ">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title10")}
                            </p>
                        </div>

                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[15px]">
                            {form.length !== 0 ? (
                                form.map((item) => (
                                    <div
                                        key={item.id_new}
                                        className="flex items-center"
                                    >
                                        <i class="fa-solid fa-bullseye mr-4 text-blue-500"></i>
                                        <div
                                            className="text-blue-500 font-medium"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    i18next.language === "vi"
                                                        ? item.content_vi
                                                        : item.content_en,
                                            }}
                                        />
                                    </div>
                                ))
                            ) : i18next.language === "vi" ? (
                                <p>Không có bài viết nào</p>
                            ) : (
                                <p>No articles available</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[20px]">
                        <div className="w-full p-3 bg-[#e95a13]">
                            <p className="text-left text-sm font-bold text-[#ffffff]">
                                {t("StudentSet.tital.title11")}
                            </p>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[15px]">
                            {rules.length !== 0 ? (
                                rules.map((item) => (
                                    <div key={item.id_new}>
                                        <Link
                                            to={`/news-detail/${item.id_new}`}
                                        >
                                            {i18next.language === "vi"
                                                ? item.title_vi
                                                : item.title_en}
                                        </Link>
                                        <div className="flex items-center justify-end gap-5 text-gray-400 text-[14px]">
                                            <Tooltip
                                                content={formatDateTime(
                                                    item.created_at,
                                                    i18next.language
                                                )}
                                                radius="sm"
                                                color="primary"
                                                showArrow
                                            >
                                                <p>
                                                    <i className="fa-regular fa-calendar-days mr-2"></i>
                                                    {formatTimeAgo(
                                                        item.created_at,
                                                        i18next.language
                                                    )}
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : i18next.language === "vi" ? (
                                <p>Không có bài viết nào</p>
                            ) : (
                                <p>No articles available</p>
                            )}
                        </div>
                        <div className="w-full flex justify-end">
                            <div>
                                <Link
                                    to={`/news/category/undergraduate/9`}
                                    className="text-blue-500 font-medium"
                                >
                                    {t("StudentSet.button.watch")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSet;
