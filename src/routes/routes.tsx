import Dashboard from "../pages/admin/dashboard/dashboard";
import Settings from "../pages/admin/settings/settings";
import Profile from "../pages/admin/profile/profile";
import {
  AccountBookOutlined,
  DashboardOutlined,
  ImportOutlined,
  InfoCircleOutlined,
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
import RoutesScreen from "../pages/admin/transport/TransportRoutes";
import ParksScreen from "../pages/admin/transport/Parks";
import NotificationScreen from "../pages/admin/notification/notification";
import Changepassword from "../pages/admin/profile/changepassword";
import CashOutScreen from "../pages/admin/profile/cashout";
import ProductDetailScreen from "../pages/admin/product/productdetails";
import Index from "../pages/admin/admin";
import RoleIndex from "../pages/admin/role";
import StationsScreen from "../pages/admin/transport/Stations";
import TrainsScreen from "../pages/admin/transport/Trains";
import BusesScreen from "../pages/admin/transport/Buses";
import AccountingScreen from "../pages/admin/gl_account/Index";
import GlAccountScreen from "../pages/admin/gl_account/ledger/glaccounting";
import CommissionsScreen from "../pages/admin/gl_account/commission/commissions";
import DiscountsScreen from "../pages/admin/gl_account/discount/discounts";

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
    path: "services",
    Component: TransportScreen,
    title: "Services",
    icon: <SwapOutlined />,
    children: [
      { path: "Parks", Component: ParksScreen, showInMenu: true },
      { path: "stations", Component: StationsScreen, showInMenu: true },
      { path: "routes", Component: RoutesScreen, showInMenu: true },
      { path: "trains", Component: TrainsScreen, showInMenu: true },
      { path: "buses", Component: BusesScreen, showInMenu: true },
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
      { path: "change-password", Component: Changepassword, showInMenu: false },
      { path: "cash-out", Component: CashOutScreen, showInMenu: false },
    ],
  },
];
export const businessRoutes = [
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
    path: "services",
    Component: TransportScreen,
    title: "Services",
    icon: <SwapOutlined />,
    children: [
      { path: "stations", Component: StationsScreen, showInMenu: true },
      { path: "routes", Component: RoutesScreen, showInMenu: true },
      { path: "trains", Component: TrainsScreen, showInMenu: true },
      { path: "buses", Component: BusesScreen, showInMenu: true },
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
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "change-password", Component: Changepassword, showInMenu: false },
      { path: "cash-out", Component: CashOutScreen, showInMenu: false },
    ],
  },
];
export const accountantRoutes = [
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
    path: "services",
    Component: TransportScreen,
    title: "Services",
    icon: <SwapOutlined />,
    children: [
      { path: "Parks", Component: ParksScreen, showInMenu: true },
      { path: "stations", Component: StationsScreen, showInMenu: true },
      { path: "routes", Component: RoutesScreen, showInMenu: true },
      { path: "trains", Component: TrainsScreen, showInMenu: true },
      { path: "buses", Component: BusesScreen, showInMenu: true },
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
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "change-password", Component: Changepassword, showInMenu: false },
      { path: "cash-out", Component: CashOutScreen, showInMenu: false },
    ],
  },
];
export const supportRoutes = [
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
    path: "services",
    Component: TransportScreen,
    title: "Services",
    icon: <SwapOutlined />,
    children: [
      { path: "Parks", Component: ParksScreen, showInMenu: true },
      { path: "stations", Component: StationsScreen, showInMenu: true },
      { path: "routes", Component: RoutesScreen, showInMenu: true },
      { path: "trains", Component: TrainsScreen, showInMenu: true },
      { path: "buses", Component: BusesScreen, showInMenu: true },
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
    path: "profile",
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "change-password", Component: Changepassword, showInMenu: false },
      { path: "cash-out", Component: CashOutScreen, showInMenu: false },
    ],
  },
];
export const auditRoutes = [
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
    Component: Profile,
    title: "Profile",
    icon: <ProfileOutlined />,
    children: [
      { path: "change-password", Component: Changepassword, showInMenu: false },
      { path: "cash-out", Component: CashOutScreen, showInMenu: false },
    ],
  },
];
