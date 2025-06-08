import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Dashboard from "pages/dashboard";
import ContentManagement from "pages/content-management";
import ContentUpload from "pages/content-upload";
import SearchResults from "pages/search-results";
import AnalyticsDashboard from "pages/analytics-dashboard";
import Homepage from "pages/homepage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/content-management" element={<ContentManagement />} />
          <Route path="/content-upload" element={<ContentUpload />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;