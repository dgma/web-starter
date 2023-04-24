import { toast } from "react-toastify";
import * as sentry from "@sentry/nextjs";

import UIError from "./UIError";

const handleGlobalSWRError = (error: unknown) => {
  if (error instanceof UIError) {
    toast.error(error.message);
    sentry.captureException(error.originalError);
  } else if (error instanceof Error) {
    console.error(error);
    toast.error("Unexpected error");
    sentry.captureException(error);
  } else if (typeof error === "string") {
    console.error(error);
    toast.error(error);
    sentry.captureMessage(error);
  }
};

export default handleGlobalSWRError;
