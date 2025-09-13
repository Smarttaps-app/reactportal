import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { App as Antd, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import AppRouted from "./routes/AppRoutes";
import "./index.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  cellPaddingBlock: 5,
                  cellFontSize: 10,
                  headerBg: "#ff9900",
                  headerColor: "#ffffff",
                },
                Card: {
                  borderRadius: 12,
                  bodyPadding: 16,
                  bodyPaddingSM: 8,
                },
                Statistic: {
                  contentFontSize: 16,
                  titleFontSize: 14,
                },
                Input: {
                  paddingBlock: 4,
                  paddingBlockLG: 8,
                  paddingBlockSM: 8,
                },
                InputNumber: {
                  paddingBlock: 4,
                  paddingBlockLG: 8,
                  paddingBlockSM: 8,
                },
                Form: {
                  verticalLabelPadding: "0 0 5px",
                  labelHeight: 24,
                  itemMarginBottom: 12,
                },
              },
              token: {
                // Seed Token
                colorPrimary: "#ff9900",
                borderRadius: 5,
              },
            }}
          >
            <Antd>
              <AppRouted />
            </Antd>
          </ConfigProvider>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
