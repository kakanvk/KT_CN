import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

import { Link } from "react-router-dom";
import { getAllTeacher } from "../../../../service/TeacherService";


const People = () => {
    const [Data, setData] = useState([]);
    const [scientificArticleData, setScientificArticleData] = useState([]);

    const getTeacher = async () => {

        const response = await getAllTeacher();
        console.log(response.data)
        setData(response.data)


        const Scientific_Article_Data =
            response.data.map((items) => {
                return {
                    key: items.id_teacher,

                    Full_Name: items.name_teacher,
                    // title: items.title,
                    // publication_date: items.publication_date,
                    // publishers: items.publishers,
                    // abstract: items.abstract,
                    // link: items.link,
                    // created_at: items.created_at,
                    // updated_at: items.updated_at,
                    // action: items.id_scientific_article,
                };
            });
        setScientificArticleData(Scientific_Article_Data)

    }

    useEffect(() => {
        getTeacher();
    }, []);

    const columns = [
        {
            title: <p className="flex gap-2">Bài báo khoa học</p>,
            dataIndex: "Full_Name",
            render: (text) => <p className="font-medium">{text}</p>,
        },
    ];
    return (
        <div className="Home p-5">
            <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-4/5">
            
                <h1 className="font-bold">
                    Personnel
                </h1>
                <div>
                    <p>
                        Units with personnel included {Data.length} lecturers, involved in teaching various subjects, specific information of the following:
                    </p>   
                </div>
                </div>
                    <div className="w-4/5">
                            <Table removeWrapper aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn>STT</TableColumn>
                                    <TableColumn>Full Name</TableColumn>
                                    <TableColumn>Degree</TableColumn>
                                    <TableColumn>Position</TableColumn>
                                    <TableColumn>Email</TableColumn>
                                    <TableColumn>Phone</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {
                                        Data.map((teacher, index ) => (
                                            <TableRow key={teacher.id_teacher}>
                                                <TableCell>
                                                    {index+1}
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/scientific-records/${teacher.id_teacher}`}>{teacher.name_teacher}</Link>
                                                </TableCell>
                                                <TableCell>
                                                    {teacher.degree}
                                                </TableCell>
                                                <TableCell>
                                                    {teacher.position}
                                                </TableCell>
                                                <TableCell>
                                                    {teacher.email}
                                                </TableCell>
                                                <TableCell>
                                                    {teacher.phone}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                    </div>
            </div>
        </div>
    );
};

export default People;
