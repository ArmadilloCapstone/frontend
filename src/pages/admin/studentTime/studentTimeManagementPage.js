import StudentTimeDetail from './studentTimeDetail';
import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
function StudentTimeManagementPage(props) {
  return (
 
     
      <div className="StudentTimeManagementPage">
        <Routes>
          <Route exact path="/" element={<StudentTimeDetail />} />
        </Routes>
      </div>
 
  );
}
 
export default StudentTimeManagementPage;