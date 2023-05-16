import StudentScheduleDetail from "./StudentScheduleDetail";
import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
function StudentScheduleManagementPage(props) {
  return (
 
     
      <div className="StudentScheduleManagementPage">
        <Routes>
          <Route exact path="/" element={<StudentScheduleDetail />} />
        </Routes>
      </div>
 
  );
}
 
export default StudentScheduleManagementPage;