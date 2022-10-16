import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/config/configStore";

import ReactGA from "react-ga";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { HelmetProvider } from "react-helmet-async";
import GlobalThemeProvider from "./style/GlobalThemeProvider";
import ScrollToTop from "./pages/ScrollTop";

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

ReactGA.initialize(TRACKING_ID);

Sentry.init({
  dsn: process.env.REACT_APP_SENTRYDSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalThemeProvider>
        <HelmetProvider>
          <ScrollToTop />
          <App />
        </HelmetProvider>
      </GlobalThemeProvider>
    </BrowserRouter>
  </Provider>,
);
