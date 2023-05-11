import React from "react";
import Layout from "../../components/Layout/Layout";
import CustomTimeline from "./CustomTimeline";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.css";


export const TimelinePage = () => {
  return (
  <Layout>
    <CustomTimeline />
  </Layout>
  );
}