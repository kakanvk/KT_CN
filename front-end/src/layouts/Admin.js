
import logo from "../assets/KTCN-in.png"
import './Layout.css';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from "../components/pages/Admin/Navbar/Navbar";
import Post from "../components/pages/Admin/Post/Post";
import { useState } from "react";
import { message, Spin } from 'antd';
import UserManager from "../components/pages/Admin/UserManager/UserManager";
import PostStored from "../components/pages/Admin/Post/PostStored";
import CategoryManager from "../components/pages/Admin/CategoryManager/CategoryManager";
import UpdatePost from "../components/pages/Admin/Post/UpdatePost";
import CreatePost from "../components/pages/Admin/Post/CreatePost";
import PostCategory from "../components/pages/Admin/CategoryManager/PostCategory";
import UpdateCategory from "../components/pages/Admin/CategoryManager/UpdateCategory";
import DepartmentManager from "../components/pages/Admin/DepartmentManager/DepartmentManager.js";
import UpdateDepartment from "../components/pages/Admin/DepartmentManager/UpdateDepartment.js";
import CreateDepartment from "../components/pages/Admin/DepartmentManager/CreateDepartment.js";
import Program from "../components/pages/Admin/ProgramManager/Program.js";
import CreateProgram from "../components/pages/Admin/ProgramManager/CreateProgram.js";
import UpdateProgram from "../components/pages/Admin/ProgramManager/UpdateProgram.js";
import Major from "../components/pages/Admin/MajorManager/Major.js";
import CreateMajors from "../components/pages/Admin/MajorManager/CreateMajors.js";
import UpdateMajors from "../components/pages/Admin/MajorManager/UpdateMajors.js";
import Subject from "../components/pages/Admin/SubjectManager/Subject.js";
import CreateSubject from "../components/pages/Admin/SubjectManager/CreateSubject.js";
import UpdateSubject from "../components/pages/Admin/SubjectManager/UpdateSubject.js"; 
import WorkProcess from "../components/pages/Admin/WorkProcessManager/WorkProcess.js";
import CreateWorkProcess from "../components/pages/Admin/WorkProcessManager/CreateWorkProcess.js";
import UpdateWorkProcess from "../components/pages/Admin/WorkProcessManager/UpdateWorkProcess.js";
import ScientificArticle from "../components/pages/Admin/ScientificArticleManager/ScientificArticle.js";
import CreateScientificArticle from "../components/pages/Admin/ScientificArticleManager/CreateScientificArticle.js";
import UpdateScientificArticle from "../components/pages/Admin/ScientificArticleManager/UpdateScientificArticle.js";
import ResearchProjects from "../components/pages/Admin/ResearchProjects/ResearchProjects.js";
import CreateResearchProjects from "../components/pages/Admin/ResearchProjects/CreateResearchProjects.js";
import UpdateResearchProjects from "../components/pages/Admin/ResearchProjects/UpdateResearchProjects.js";
import UpdateTeacher from "../components/pages/Admin/TeacherManager/UpdateTeacher.js";
import Teacher from "../components/pages/Admin/TeacherManager/Teacher.js";
import CreateTeacher from "../components/pages/Admin/TeacherManager/CreateTeacher.js";
function Admin(props) {

  const [collapsedNav, setCollapsedNav] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);

  const { user } = props;

  const successNoti = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const errorNoti = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  return (
    <div className="Admin flex h-[100vh]">
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <Navbar collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} user={user}/>
      <div className='Admin-Content flex-1 h-full overflow-auto p-5 px-7'>
        <Routes>
          <Route path="/post" element={<Post successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"News"} />} />
          <Route path="/post/stored" element={<PostStored successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"News"} />} />
          <Route path="/post/create" element={<CreatePost collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} TypeNews={"News"}/>} />
          <Route path="/post/update/:id" element={<UpdatePost collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} successNoti={successNoti} errorNoti={errorNoti} TypeNews={"News"}/>} />

          <Route path="/teacher" element={<Teacher successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"News"} />} />
          <Route path="/teacher/create" element={<CreateTeacher successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"News"} />} />
          <Route path="/teacher/update/:id" element={<UpdateTeacher collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} successNoti={successNoti} errorNoti={errorNoti} TypeNews={"News"}/>} />

          <Route path="/program" element={<Program successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/program/create" element={<CreateProgram collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} TypeNews={"program"}/>} />
          <Route path="/program/update/:id" element={<UpdateProgram collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} successNoti={successNoti} errorNoti={errorNoti} TypeNews={"program"}/>} />

          <Route path="/major" element={<Major successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/major/create" element={<CreateMajors successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/major/update/:id" element={<UpdateMajors collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} successNoti={successNoti} errorNoti={errorNoti}/>} />
          
          <Route path="/subject" element={<Subject successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/subject/create" element={<CreateSubject collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/subject/update/:id" element={<UpdateSubject collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} successNoti={successNoti} errorNoti={errorNoti}/>} />

          <Route path="/postAdmissions" element={<Post successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"admissionNews"} />} />
          <Route path="/postAdmissions/createAdmissions" element={<CreatePost collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} TypeNews={"admissionNews"}/>} />
          <Route path="/postAdmissions/storedAdmissions" element={<PostStored successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} TypeNews={"admissionNews"} />} />
          <Route path="/postAdmissions/updateAdmissions/:id" element={<UpdatePost collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} setSpinning={setSpinning} successNoti={successNoti} errorNoti={errorNoti} TypeNews={"admissionNews"}/>} />
   
          <Route path="/category" element={<CategoryManager successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/category/create" element={<PostCategory successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/category/update/:id" element={<UpdateCategory successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />

          <Route path="/department" element={<DepartmentManager successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/department/update/:id" element={<UpdateDepartment successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
          <Route path="/department/create" element={<CreateDepartment successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />

          <Route path="/user" element={<UserManager collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning}/>} />
        
          <Route path="/work-process" element={<WorkProcess collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />
          <Route path="/work-process/create" element={<CreateWorkProcess collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />
          <Route path="/work-process/update/:id" element={<UpdateWorkProcess collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />

          <Route path="/scientific-article" element={<ScientificArticle collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />
          <Route path="/scientific-article/create" element={<CreateScientificArticle collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />
          <Route path="/scientific-article/update/:id" element={<UpdateScientificArticle collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />

          <Route path="/research-projects" element={<ResearchProjects collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />
          <Route path="/research-projects/create" element={<CreateResearchProjects collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />
          <Route path="/research-projects/update/:id" element={<UpdateResearchProjects collapsedNav={collapsedNav} setCollapsedNav={setCollapsedNav} successNoti={successNoti} errorNoti={errorNoti} setSpinning={setSpinning} />} />

        </Routes>
      </div>
    </div>
  );
}

export default Admin;
