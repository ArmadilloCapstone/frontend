import TeacherDetail from './TeacherDetail';
import EditTeacher from './EditTeacher';
import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
function TeacherManagementPage(props) {
  return (
 
     
      <div className="TeacherManagementPage">
        <Routes>
          <Route exact path="/" element={<TeacherDetail />} />
          <Route exact path="/EditTeacher/editID/:id" element={<EditTeacher />} />
        </Routes>
      </div>
 
  );
}
 
export default TeacherManagementPage;