
import UserProfile from "./components/pages/Profile/UserProfile";
import Research from "./components/pages/Research/Research"
import ResearchAdd from "./components/pages/Research/ResearchAdd"
import ResearchView from "./components/pages/Research/ResearchView"
import Report from "./components/pages/Report/ReportView"

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ResearchUpload from "components/pages/Research/ResearchUpload";
import ReportResearch from "components/pages/Report/ReportResearch";
import ReportProfile from "components/pages/Report/ReportProfile";
import Profileedit from "components/pages/Profile/Profileedit";
import ReportAccount from "components/pages/Report/ReportAccount";

export  const routes  = [
    {
      path: "/research",
      name: "งานวิจัย",
      icon: "content_paste",
      component: Research,
      layout: "/admin",
    },
    {
      path: "/create",
      name: "สร้างงานวิจัย",
      icon: AddToPhotosIcon,
      component: ResearchAdd,
      layout: "/admin",
    },
    {
      path: "/aboutUs",
      name: "ข้อมูลส่วนตัว",
      component: UserProfile,
      layout: "/admin",
    },
    {
      path: "/report",
      name: "รายงาน",
      icon: LibraryBooks,
      component: Report,
      layout: "/admin",
  
    },
    {
      path: "/account",
      name: "นักวิชาการ",
      icon: LibraryBooks,
      component: ReportAccount,
      layout: "/admin",
  
    },
    {
      path: "/view/:id",
      component: ResearchView,
      layout: "/admin",
      
    },
    {
      path: "/upload/:id",
      component: ResearchUpload,
      layout: "/admin",
    },
    {
      path: "/upload/:id",
      component: ResearchUpload,
      layout: "/admin",
    },
    {
      path: "/researches/:id",
    
      component: ReportResearch,
      layout: "/admin",
    },
    {
      path: "/profile/:id",
      component: ReportProfile,
      layout: "/admin",
    },
    {
      path: "/edit",
      component: Profileedit,
      layout: "/admin",
    },
  

   
  ];

  export default routes;

  
