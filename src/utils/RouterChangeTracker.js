import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ReactGA from "react-ga";

const RouterChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitiallized] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("qb-chaining")) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    }
    setInitiallized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};

export default RouterChangeTracker;
