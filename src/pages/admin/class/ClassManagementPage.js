import ClassDetail from './ClassDetail';
import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
function ClassManagementPage(props) {
  return (
 
     
      <div className="ClassManagementPage">
        <Routes>
          <Route exact path="/" element={<ClassDetail />} />
        </Routes>
      </div>
 
  );
}
 
export default ClassManagementPage;