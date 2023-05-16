import AfterClassDetail from "./AfterClassDetail";
import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
function AfterClassManagementPage(props) {
  return (
 
     
      <div className="AfterClassManagementPage">
        <Routes>
          <Route exact path="/" element={<AfterClassDetail />} />
        </Routes>
      </div>
 
  );
}
 
export default AfterClassManagementPage;