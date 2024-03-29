import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";
import { Link, useParams } from "react-router-dom";

import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Avatar,
    Input,
} from "@nextui-org/react";

import { GetProgramsByName } from "../../../../service/ProgramService";
import "./Program.css"
const ProgramDetail = () => {
    const [ContentData, setContentData] = useState("");
    const { id } = useParams();
    const getProgramByName = async () => {
        
        const response = await GetProgramsByName(id);
        setContentData(response.data[0]);

    }

    useEffect(() => {
        getProgramByName();
    }, [id]);


    return (
        <div className="Home p-5"> 
            <div className="flex flex-col items-center News w-full gap-10">
                <div className="flex items-start justify-between w-3/5">
                    <Breadcrumbs underline="hover">
                        <BreadcrumbItem>
                            <Link to="/program/chuong-trinh-dao-tao-tieng-viet">Chương trình đào tạo tiếng việt</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/program/chuong-trinh-dao-tao-tieng-anh">Chương trình đào tạo tiếng anh</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/program/chuong-trinh-dao-tao-tri-tue-nhan-tao">Chương trình đào tạo trí tuệ nhân tạo</Link>
                        </BreadcrumbItem>
                    </Breadcrumbs>
                    <div className="flex gap-2">

                    </div>
                </div>

               <div className="content_program w-3/5 leading-6"  dangerouslySetInnerHTML={{ __html: ContentData.content }} /> 
            </div>
        </div>
    );
};

export default ProgramDetail;
