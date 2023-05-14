import ParentDetail from './ParentDetail';
import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
function ParentManagementPage(props) {
  return (
 
     
      <div className="ParentManagementPage">
        <Routes>
          <Route exact path="/" element={<ParentDetail />} />
        </Routes>
      </div>
 
  );
}
 
export default ParentManagementPage;