import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getByIdScientific } from "../../../../service/ScientificAricleService";

export const DetailScientificArticle = () => {
    const { id } = useParams();
    const [dataScientificArticle, setDataScientificArticle] = useState();
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        try {
            const response = await getByIdScientific(id);
            setDataScientificArticle(response.data[0]);
            console.log("new data: ", response.data[0]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

   
    return (
        <div className="flex gap-6 flex-col mx-16 m-6">
            <div className="text-center text-2xl w-full font-semibold text-[#E95A13]">
                <h1>{dataScientificArticle?.title}</h1>
            </div>
            <div>
                <span className="font-semibold">Authors: </span>
                {dataScientificArticle?.name_teacher}
            </div>
            <div>
                <span className="font-semibold">Publication date: </span>
                {dataScientificArticle?.publication_date}
            </div>
            <div>
                <span className="font-semibold">Name of Publishers: </span>
                {dataScientificArticle?.publishers}
            </div>
            <div className="flex gap-1">
                <span className="font-semibold"> Abstract: </span>
                {dataScientificArticle?.abstract}
            </div>
            <div>
                <span className="font-semibold">Link: </span>
                <Link
                    className="text-cyan-600 hover:text-black hover:font-medium"
                    to={dataScientificArticle?.link}
                >
                    {dataScientificArticle?.title}
                </Link>
            </div>
        </div>
    );
};
