import Dashboard from "../pages/admin/dashboard/dashboard";
import Subscriptions from "../pages/admin/subscription/subscriptions";
import Games from "../pages/admin/game/games";
import Settings from "../pages/admin/settings/settings";
import Profile from "../pages/admin/profile/profile";
import SinglePlayer from "../pages/admin/player/singlePlayer";
import Instructions from "../pages/admin/instruction/instructions";
import Rules from "../pages/admin/rule/rules";
import {
  DashboardOutlined,
  ImportOutlined,
  ProfileOutlined,
  RocketOutlined,
  SettingOutlined,
  SwapOutlined,
  TagsOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import PaymentsScreen from "../pages/admin/payment/paymentsScreen";
import CustomersScreen from "../pages/admin/customer/customersScreen";

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
    Component: Games,
    title: "Products",
    icon: <RocketOutlined />,
  },
  {
    path: "ticketing",
    Component: Rules,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "parks",
    Component: Instructions,
    title: "Parks",
    icon: <SwapOutlined />,
  },
  {
    path: "settings",
    Component: Settings,
    title: "Settings",
    icon: <SettingOutlined />,
  },
  {
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
  },
];
