import Dashboard from "../pages/admin/dashboard/dashboard";
import Settings from "../pages/admin/settings/settings";
import Profile from "../pages/admin/profile/profile";
import {
  DashboardOutlined,
  ImportOutlined,
  ProfileOutlined,
  RocketOutlined,
  SettingOutlined,
  SwapOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import PaymentsScreen from "../pages/admin/payment/paymentsScreen";
import TicketsScreen from "../pages/admin/ticket/Index";
import CustomersScreen from "../pages/admin/customer/Index";
import TransportScreen from "../pages/admin/transport/Index";
import ProductsScreen from "../pages/admin/product/Index";
import StationScreen from "../pages/admin/transport/Stations";
import RoutesScreen from "../pages/admin/transport/TransportRoutes";

export const protectedRoutes = [
  {
    path: "",
    Component: Dashboard,
    title: "Dasboard",
    icon: <DashboardOutlined />,
  },
  {
    path: "payments",
    Component: PaymentsScreen,
    title: "Payments",
    icon: <TeamOutlined />,
  },
  {
    path: "customers",
    Component: CustomersScreen,
    title: "Customers",
    icon: <TagsOutlined />,
  },
  {
    path: "products",
    Component: ProductsScreen,
    title: "Products",
    icon: <RocketOutlined />,
  },
  {
    path: "ticketing",
    Component: TicketsScreen,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "services",
    Component: TransportScreen,
    title: "Services",
    icon: <SwapOutlined />,
    children: [
      { path: "station", Component: StationScreen },
      { path: "route", Component: RoutesScreen },
    ],
  },
  {
    path: "settings",
    Component: Settings,
    title: "Settings",
    icon: <SettingOutlined />,
    children: [
      { path: "add", Component: Profile },
      { path: "view", Component: Profile },
    ],
  },
  {
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
  },
];
