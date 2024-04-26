import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import {
  PageNotExist,
  OrganisationInfo,
  Opportunities,
  CodingSheets,
  LandingPage2,
} from "./Screen";
import ScrollToTop from "./Components/ScrollToTop";
import GoToTop from "./Components/GoToTop";

import CoursesReview from "./Screen/CoursesReview";
import OnlineAssessment from "./Screen/OnlineAssessment";

import ResumeSection from "./Screen/ResumeSection";
import CoreSubjectsTracker from "./Screen/CoreSubjectsTracker";
import MockAssessment from "./Screen/MockAssessment";
import LandingPage from "./Screen/LandingPage";
import Auth from "./Screen/Auth";

const App = ({ currentThemeDark }) => {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/about-us" element={<OrganisationInfo />} />
        <Route
          path="/organisation-information/:showpage"
          element={<OrganisationInfo />}
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/coding-sheets/:sheetname" element={<CodingSheets />} />
        <Route path="/courses-review" element={<CoursesReview />} />
        <Route path="/online-assessment" element={<OnlineAssessment />} />
        <Route
          path="/core-subjects-tracker/:subjectName"
          element={<CoreSubjectsTracker />}
        />
        <Route path="/mock-assessment" element={<MockAssessment />} />

        <Route path="/resume-questions" element={<ResumeSection />} />

        <Route path="*" element={<PageNotExist />} />
      </Routes>
      <GoToTop />
    </div>
  );
};

export default App;
