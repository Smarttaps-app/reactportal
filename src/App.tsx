import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { App as Antd, ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import AppRouted from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";
import "./index.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <UserProvider>
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: "#ff9900",
                  borderRadius: 2,
                },
              }}
            >
              <Antd>
                <AppRouted />
              </Antd>
            </ConfigProvider>
          </UserProvider>
        </BrowserRouter>
      </RecoilRoot>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
