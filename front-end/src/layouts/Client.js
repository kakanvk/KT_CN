import Header from "../components/pages/Client/Header/Header";
import Home from "../components/pages/Client/Home/Home";
import Menu from "../components/pages/Client/Menu/Menu";
import "./Layout.css";
import { Route, Routes } from "react-router-dom";
import { Image } from "@nextui-org/react";
import Footer from "../components/pages/Client/Footer/Footer";
import About from "../components/pages/Client/About/About";
import NewsDetail from "../components/pages/Client/NewsDetail/NewsDetail";
import ActivityTVU from "../components/pages/Client/Categorization/ActivityTVU";
import Admission from "../components/pages/Client/Categorization/Admission";
import StudentSet from "../components/pages/Client/StudentSet/StudentSet";
// import NewsDetail from '../components/pages/Client/NewsDetail/NewsDetail';
import DetailListNews from "../components/pages/Client/Categorization/DetailListNews";
function Client() {
    return (
        <div className="Client">
            <div className="flex-1">
                <Header />
                <Image
                    className="w-[100vw] hidden xl:flex"
                    radius="none"
                    src="https://ktcn.tvu.edu.vn/ht96_image/bg.png"
                />
                <Menu />
                <div className="max-w-[2000px] m-auto">
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="news/category/activity-tvu"
                            element={<ActivityTVU />}
                        />
                        <Route
                            path="news/category/admission"
                            element={<Admission />}
                        />
                        <Route
                            path="news/category/undergraduate/:id"
                            element={<DetailListNews />}
                        />
                        {/* //DetailListNews */}
                        <Route path="student-set" element={<StudentSet />} />
                        <Route
                            path="/news-detail/:id"
                            element={<NewsDetail TypeNews={"News"} />}
                        />
                        <Route
                            path="/newsAdmissions-detail/:id"
                            element={<NewsDetail TypeNews={"admissionNews"} />}
                        />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Client;
