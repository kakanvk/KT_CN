import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getByIdScientific } from "../../../../service/ScientificAricleService";
import { Collapse } from 'antd';
import {Avatar} from "@nextui-org/react";
import { getTeacherByID } from "../../../../service/TeacherService";

export const ScientificRecords = () => {
    const { id } = useParams();


    const [loading, setLoading] = useState(false);

    const [nameTeacher, setNameTeacher] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');
    const [academicTitle, setAcademicTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [researchGroup, setResearchGroup] = useState('');
    const [degree, setDegree] = useState('');
    const [researchArea, setResearchArea] = useState('');
    const [unit, setUnit] = useState('');
    const [address, setAddress] = useState('');
    const [ggSite, setGgSite] = useState('');
    const [ggScholar, setGgScholar] = useState('');


    const getData = async () => {
        setLoading(true);

        try {
            const response = await getTeacherByID(id);
            const responseData = response.data;

            setNameTeacher(responseData.name_teacher);
            setEmail(responseData.email);
            setPhone(responseData.phone);
            setPosition(responseData.position);
            setAcademicTitle(responseData.academic_title);
            setLanguage(responseData.language);
            setResearchGroup(responseData.research_group);
            setDegree(responseData.degree);
            setResearchArea(responseData.research_area);
            setUnit(responseData.unit);
            setAddress(responseData.address);
            setGgSite(responseData.gg_site);
            setGgScholar(responseData.gg_scholar);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);
    const items = [
        {
            key: '1',
            label: 'work process',
            children: <p>work process</p>,
        },
        {
            key: '2',
            label: 'Research projects',
            children: <p>Research projects</p>,
        },
        {
            key: '3',
            label: 'Scientific article',
            children: <p>Scientific article</p>,
        },
        {
            key: '4',
            label: 'Graduate guidance',
            children: <p>Graduate guidance</p>,
        },
        {
            key: '5',
            label: 'Teaching subject',
            children: <p>Teaching subject</p>,
        },
    ];
    return (
        <div className="flex flex-col w-full gap-10 items-center p-5">

            <div className="flex flex-col w-4/5 leading-6">
                <div className="flex flex-col gap-5 items-start lg:flex-row lg:items-center xl:flex-row xl:items-center">
                    <Avatar 
                        isBordered radius="sm" 
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d" 
                        className="w-[150px] h-[150px]"
                    />
                    <div className="flex flex-col items-start lg:px-5 xl:px-5  w-full lg:gap-0 xl:gap-10 ">

                        <div className="flex flex-col justify-start lg:flex-col xl:flex-row xl:gap-[70px]">
                            <div className="flex flex-col items-start lg:justify-between lg:w-full lg:flex-row lg:justify-start  lg:gap-[100px] lg:items-start xl:gap-[70px] xl:flex-row xl:justify-start xl:items-start">
                                <div>
                                    <div>Full Name: <span className="font-bold">{nameTeacher}</span></div> 

                                    <div>Position: <span className="font-bold">{position}</span></div>  
                                </div>
                                <div>
                                    <div>
                                        E-mail: <span className="font-bold">{email}</span>
                                    </div>  
                                    <div>
                                        Languages: <span className="font-bold">{language}</span>
                                    </div>  
                                </div>

                            </div>
                            <div>
                                Phone number: <span className="font-bold">{phone}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                Research group: <span className="font-bold">{researchGroup}</span>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="flex flex-col  lg:gap-2  lg:mt-5 xl:mt-5 xl:gap-2">
                    <div>
                        Degree: <span className="font-bold">{degree}</span> Year: 2011 - Đài Loan
                    </div>
                    <div>
                        Academic title: <span className="font-bold">{academicTitle}</span>
                    </div>
                    <div>
                        Research area: <span className="font-bold">{researchArea}</span>
                    </div>
                    
                    <div>
                        Unit: <span className="font-bold">{unit}</span>
                    </div>

                    <div>
                        Address: <span className="font-bold">{address}</span>
                    </div>
                    
                    <div>
                        Link: <span className="font-bold"> </span>
                    </div>

                    <div>
                        Google site: <span className="font-bold">{ggSite}</span>
                    </div>
                     
                    <div>
                        Link: <span className="font-bold">Google scholar:</span><Link to={ggScholar}> Read more</Link>
                    </div>
                </div>
            </div>
            <Collapse className="w-4/5" items={items} defaultActiveKey={['1']} />;
        </div>
    );
};
