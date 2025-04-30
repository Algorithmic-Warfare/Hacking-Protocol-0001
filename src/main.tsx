import { ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EveWorldProvider } from "@eveworld/contexts";
import { ErrorNotice, ErrorNoticeTypes } from "@eveworld/ui-components";

import EntityView from "./components/EntityView";

import App from "./App";
import MUDSyncStatus from "./components/MUDSyncStatus";
import InventoryLogs from "./components/InventoryLogs";
import InventoryPackages from "./components/InventoryPackages";
import PackageCreator from "./components/PackageCreator";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "0px !important",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          letterSpacing: 0,
        },
        message: {
          padding: "8px 16px !important",
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "*",
        element: <EntityView />,
      },
      {
        path: "inventory-logs",
        element: <InventoryLogs />,
      },
      {
        path: "inventory-packages",
        element: <InventoryPackages />,
      },
      {
        path: "package-creator",
        element: <PackageCreator />,
      },
      {
        path: "blocks",
        element: <MUDSyncStatus />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    fallback={
      <ErrorNotice
        type={ErrorNoticeTypes.MESSAGE}
        errorMessage="Anomaly detected: See developer console for details"
      />
    }
  >
    <EveWorldProvider>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </EveWorldProvider>
    ,
  </ErrorBoundary>
);
