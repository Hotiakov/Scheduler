import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import "dayjs/locale/ru";

import { ErrorBoundary } from "./app/provider/ErrorBoundary";
import { StoreProvider } from "./app/provider/StoreProvider";
import { DateProvider } from "app/provider/DateProvider";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import App from "./app/App";

import "./app/styles/index.scss";
import { closeSnackbar, SnackbarProvider } from "notistack";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StoreProvider>
    <BrowserRouter>
      <DateProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <ErrorBoundary>
          <SnackbarProvider
            autoHideDuration={5000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            action={(snackbarId) => (
              <button onClick={() => closeSnackbar(snackbarId)}>
                <HighlightOffIcon color='error'/>
              </button>
            )}
          >
            <App />
          </SnackbarProvider>
          </ErrorBoundary>
        </LocalizationProvider>
      </DateProvider>
    </BrowserRouter>
  </StoreProvider>
);
