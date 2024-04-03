import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;

const NewDetail = () => {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);

    useEffect(() => {
        // Thực hiện fetch dữ liệu chi tiết tin tức từ API hoặc bất kỳ nguồn dữ liệu nào khác ở đây
        // Ví dụ: fetch(`url_api/${id}`)
        //         .then(response => response.json())
        //         .then(data => setNewsDetail(data));

        // Giả sử dữ liệu chi tiết tin tức trả về từ API
        const dummyData = [
            { id: 1, title: 'Europe Street beat', description: 'www.instagram.com', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non bibendum odio, in tempus libero.' },
            // Thêm các tin tức khác nếu cần
        ];
        const foundNews = dummyData.find(news => news.id === parseInt(id));
        if (foundNews) {
            setNewsDetail(foundNews); 
        }
    }, [id]); 

    return (
        <div>
            {newsDetail ? (
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={newsDetail.imageUrl} />}
                >
                    <Meta title={newsDetail.title} description={newsDetail.description} />
                    <p>{newsDetail.content}</p>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default NewDetail;
