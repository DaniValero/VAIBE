import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const config = {
  dsn: process.env.REACT_APP_DNS_SENTRY,
  integrations: [new BrowserTracing()],

  tracesSampleRate: 1.0,
};

const init = () => Sentry.init(config);

const capture = (error) => {
  Sentry.captureException(error);
};

export default {
  // init,
  capture,
};
