import React from "react";
import { render } from "react-dom";
import Layout from "./components/Layout/Layout";
import CustomTimeline from "./pages/timeline/CustomTimeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./pages/timeline/style.css";
const App = () => {
  return (
  <Layout>
    <CustomTimeline />
  </Layout>
  );


  
  };
//  export default App;
render(<App />, document.getElementById("root"));