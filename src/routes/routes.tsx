import Dashboard from "../pages/admin/dashboard/dashboard";
import Settings from "../pages/admin/settings/settings";
import Profile from "../pages/admin/profile/profile";
import {
  AccountBookOutlined,
  CarOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  DollarOutlined,
  ImportOutlined,
  InfoCircleOutlined,
  NotificationOutlined,
  ProfileOutlined,
  RocketOutlined,
  SettingOutlined,
  SubnodeOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import PaymentsScreen from "../pages/admin/payment/paymentsScreen";
import TicketsScreen from "../pages/admin/ticket/Index";
import CustomersScreen from "../pages/admin/customer/Index";
import TransportScreen from "../pages/admin/transport/Index";
import ProductsScreen from "../pages/admin/product/Index";
import NotificationScreen from "../pages/admin/notification/notification";
import Changepassword from "../pages/admin/profile/changepassword";
import ProductDetailScreen from "../pages/admin/product/productdetails";
import Index from "../pages/admin/admin";
import RoleIndex from "../pages/admin/role";
import StationsScreen from "../pages/admin/transport/train/Stations";
import BusesScreen from "../pages/admin/transport/bus/Buses";
import AccountingScreen from "../pages/admin/gl_account/Index";
import GlAccountScreen from "../pages/admin/gl_account/ledger/glaccounting";
import CommissionsScreen from "../pages/admin/gl_account/commission/commissions";
import DiscountsScreen from "../pages/admin/gl_account/discount/discounts";
import { TrainIcon } from "lucide-react";
import TrainsScreen from "../pages/admin/transport/train/Trains";
import BusRoutesScreen from "../pages/admin/transport/bus/BusRoutes";
import BusStationsScreen from "../pages/admin/transport/bus/parks";
import CashoutsScreen from "../pages/admin/cashout/Index";
import TrainRoutesScreen from "../pages/admin/transport/train/TrainRoutes";
import SeatsScreen from "../pages/admin/transport/train/Seats";
import TrainSchedulesScreen from "../pages/admin/transport/train/TrainSchedules";
import BusSchedulesScreen from "../pages/admin/transport/bus/BusSchedules";
import BusDashboard from "../pages/admin/dashboard/BusDashboard";
import AddCashoutAccunt from "../pages/admin/profile/AddCashoutAccount";
import BusinessDashboard from "../pages/admin/dashboard/BusinessDashboard";
import SupportTicketScreen from "../pages/admin/support";
import { IAppRoute } from "../utils/type";
import ProfileIndex from "../pages/admin/profile";

export const protectedRoutes: IAppRoute[] = [
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
    path: "cashouts",
    Component: CashoutsScreen,
    title: "cashouts",
    icon: <DeploymentUnitOutlined />,
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
    children: [
      {
        path: ":id",
        Component: ProductDetailScreen,
        showInMenu: false,
      },
    ],
  },
  {
    path: "ticketing",
    Component: TicketsScreen,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "bus-services",
    Component: TransportScreen,
    title: "Bus",
    icon: <CarOutlined />,
    children: [
      { path: "buses", Component: BusesScreen, showInMenu: true },
      { path: "bus-routes", Component: BusRoutesScreen, showInMenu: true },
      { path: "bus-parks", Component: BusStationsScreen, showInMenu: true },
      {
        path: "bus-schedules",
        Component: BusSchedulesScreen,
        showInMenu: true,
      },
    ],
  },
  {
    path: "train-services",
    Component: TransportScreen,
    title: "Train",
    icon: <TrainIcon />,
    children: [
      { path: "trains", Component: TrainsScreen, showInMenu: true },
      { path: "train-routes", Component: TrainRoutesScreen, showInMenu: true },
      { path: "train-stations", Component: StationsScreen, showInMenu: true },
      { path: "train-class", Component: SeatsScreen, showInMenu: true },
      {
        path: "train-schedules",
        Component: TrainSchedulesScreen,
        showInMenu: true,
      },
    ],
  },
  {
    path: "accounting",
    Component: AccountingScreen,
    title: "Accounting",
    icon: <AccountBookOutlined />,
    children: [
      { path: "general-ledger", Component: GlAccountScreen, showInMenu: true },
      { path: "commissions", Component: CommissionsScreen, showInMenu: true },
      { path: "discounts", Component: DiscountsScreen, showInMenu: true },
    ],
  },
  {
    path: "notification",
    Component: NotificationScreen,
    title: "Notifications",
    icon: <InfoCircleOutlined />,
  },
  {
    path: "support-tickets",
    Component: SupportTicketScreen,
    title: "Support Tickets",
    icon: <SubnodeOutlined />,
  },
  {
    path: "settings",
    Component: Settings,
    title: "Settings",
    icon: <SettingOutlined />,
    children: [
      { path: "manage-user", Component: Index, showInMenu: true },
      { path: "manage-role", Component: RoleIndex, showInMenu: true },
      { path: "mail-setting", Component: Profile, showInMenu: true },
      { path: "api-setting", Component: Profile, showInMenu: true },
    ],
  },
  {
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "", Component: Profile, showInMenu: false },
      { path: "change-password", Component: Changepassword, showInMenu: false },
      {
        path: "cash-out-account",
        Component: AddCashoutAccunt,
        showInMenu: false,
      },
    ],
  },
];

export const busproviderRoutes: IAppRoute[] = [
  {
    path: "",
    Component: BusDashboard,
    title: "Dasboard",
    icon: <DashboardOutlined />,
  },
  {
    path: "payments",
    Component: PaymentsScreen,
    title: "Payments",
    icon: <DollarOutlined />,
  },
  {
    path: "cashouts",
    Component: CashoutsScreen,
    title: "cashouts",
    icon: <DeploymentUnitOutlined />,
  },
  {
    path: "ticketing",
    Component: TicketsScreen,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "bus-services",
    Component: TransportScreen,
    title: "Bus",
    icon: <CarOutlined />,
    children: [
      { path: "buses", Component: BusesScreen, showInMenu: true },
      //{ path: "bus-routes", Component: BusRoutesScreen, showInMenu: true },
      { path: "bus-parks", Component: BusStationsScreen, showInMenu: true },
    ],
  },
  {
    path: "notification",
    Component: NotificationScreen,
    title: "Notifications",
    icon: <NotificationOutlined />,
  },
  {
    path: "profile",
    Component: ProfileIndex,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "", Component: Profile, showInMenu: false },
      { path: "change-password", Component: Changepassword, showInMenu: false },
      {
        path: "cash-out-account",
        Component: AddCashoutAccunt,
        showInMenu: false,
      },
    ],
  },
];
export const trainproviderRoutes: IAppRoute[] = [
  {
    path: "",
    Component: BusDashboard,
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
    path: "cashouts",
    Component: CashoutsScreen,
    title: "cashouts",
    icon: <DeploymentUnitOutlined />,
  },
  {
    path: "ticketing",
    Component: TicketsScreen,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "train-services",
    Component: TransportScreen,
    title: "Train",
    icon: <CarOutlined />,
    children: [
      { path: "trains", Component: TrainsScreen, showInMenu: true },
      { path: "train-routes", Component: TrainRoutesScreen, showInMenu: true },
      { path: "train-stations", Component: StationsScreen, showInMenu: true },
      //{ path: "train-class", Component: SeatsScreen, showInMenu: true },
      /*{
        path: "train-schedules",
        Component: TrainSchedulesScreen,
        showInMenu: true,
      },*/
    ],
  },
  {
    path: "notification",
    Component: NotificationScreen,
    title: "Notifications",
    icon: <InfoCircleOutlined />,
  },
  {
    path: "profile",
    Component: ProfileIndex,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "", Component: Profile, showInMenu: false },
      { path: "change-password", Component: Changepassword, showInMenu: false },
      {
        path: "cash-out-account",
        Component: AddCashoutAccunt,
        showInMenu: false,
      },
    ],
  },
];

export const businessRoutes: IAppRoute[] = [
  {
    path: "",
    Component: BusinessDashboard,
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
    path: "cashouts",
    Component: CashoutsScreen,
    title: "cashouts",
    icon: <DeploymentUnitOutlined />,
  },
  {
    path: "ticketing",
    Component: TicketsScreen,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "accounting",
    Component: AccountingScreen,
    title: "Accounting",
    icon: <AccountBookOutlined />,
    children: [
      { path: "general-ledger", Component: GlAccountScreen, showInMenu: true },
      { path: "commissions", Component: CommissionsScreen, showInMenu: true },
      { path: "discounts", Component: DiscountsScreen, showInMenu: true },
    ],
  },
  {
    path: "notification",
    Component: NotificationScreen,
    title: "Notifications",
    icon: <InfoCircleOutlined />,
  },
  {
    path: "profile",
    Component: ProfileIndex,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "", Component: Profile, showInMenu: false },
      { path: "change-password", Component: Changepassword, showInMenu: false },
      {
        path: "cash-out-account",
        Component: AddCashoutAccunt,
        showInMenu: false,
      },
    ],
  },
];
export const accountantRoutes: IAppRoute[] = [
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
    path: "cashouts",
    Component: CashoutsScreen,
    title: "cashouts",
    icon: <DeploymentUnitOutlined />,
  },
  {
    path: "ticketing",
    Component: TicketsScreen,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "accounting",
    Component: AccountingScreen,
    title: "Accounting",
    icon: <AccountBookOutlined />,
    children: [
      { path: "general-ledger", Component: GlAccountScreen, showInMenu: true },
      { path: "commissions", Component: CommissionsScreen, showInMenu: true },
      { path: "discounts", Component: DiscountsScreen, showInMenu: true },
    ],
  },
  {
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "", Component: Profile, showInMenu: false },
      { path: "change-password", Component: Changepassword, showInMenu: false },
      {
        path: "cash-out-account",
        Component: AddCashoutAccunt,
        showInMenu: false,
      },
    ],
  },
];
export const supportRoutes: IAppRoute[] = [
  {
    path: "",
    Component: Dashboard,
    title: "Dasboard",
    icon: <DashboardOutlined />,
  },
  {
    path: "customers",
    Component: CustomersScreen,
    title: "Customers",
    icon: <TagsOutlined />,
  },
  {
    path: "ticketing",
    Component: TicketsScreen,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "notification",
    Component: NotificationScreen,
    title: "Notifications",
    icon: <InfoCircleOutlined />,
  },
  {
    path: "support-tickets",
    Component: SupportTicketScreen,
    title: "Support Tickets",
    icon: <SubnodeOutlined />,
  },
  {
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "", Component: Profile, showInMenu: false },
      { path: "change-password", Component: Changepassword, showInMenu: false },
    ],
  },
];
export const auditRoutes: IAppRoute[] = [
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
    path: "ticketing",
    Component: TicketsScreen,
    title: "Tickets",
    icon: <ImportOutlined />,
  },
  {
    path: "accounting",
    Component: AccountingScreen,
    title: "Accounting",
    icon: <AccountBookOutlined />,
    children: [
      { path: "general-ledger", Component: GlAccountScreen, showInMenu: true },
      { path: "commissions", Component: CommissionsScreen, showInMenu: true },
      { path: "discounts", Component: DiscountsScreen, showInMenu: true },
    ],
  },
  {
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "", Component: Profile, showInMenu: false },
      { path: "change-password", Component: Changepassword, showInMenu: false },
    ],
  },
];
