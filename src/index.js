import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/config/configStore";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import GlobalThemeProvider from "./style/GlobalThemeProvider";
import ScrollToTop from "./pages/ScrollTop";
import { HelmetProvider } from "react-helmet-async";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRYDSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
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
