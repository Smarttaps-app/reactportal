import Dashboard from "../pages/admin/dashboard/dashboard";
import Settings from "../pages/admin/settings/settings";
import Profile from "../pages/admin/profile/profile";
import {
  AccountBookOutlined,
  CarOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  DollarOutlined,
  GitlabOutlined,
  ImportOutlined,
  InfoCircleOutlined,
  NotificationOutlined,
  ProfileOutlined,
  RedEnvelopeOutlined,
  RocketOutlined,
  SettingOutlined,
  SubnodeOutlined,
  TagsOutlined,
  TranslationOutlined,
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
import StationsScreen from "../pages/admin/transport/train/Stations";
import BusesScreen from "../pages/admin/transport/bus/Buses";
import AccountingScreen from "../pages/admin/gl_account/Index";
import GlAccountScreen from "../pages/admin/gl_account/ledger/glaccounting";
import CommissionsScreen from "../pages/admin/gl_account/commission/commissions";
import DiscountsScreen from "../pages/admin/gl_account/discount/discounts";
import { PersonStanding } from "lucide-react";
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
import CashoutWithdraw from "../pages/admin/profile/CashoutWithdraw";
import CashoutLimitIncrease from "../pages/admin/profile/CashoutLimitIncrease";
import AdminPaymentsScreen from "../pages/admin/payment/AdminpaymentsScreen";
import AdminCashoutsScreen from "../pages/admin/cashout/AdminCashouts";
import ProviderIndex from "../pages/admin/provider";
import RoleIndex from "../pages/admin/role";
import BusTypesScreen from "../pages/admin/transport/bus/BusTypes";
import ProviderBusesScreen from "../pages/bus_provider/bus/ProviderBuses";
import ProviderBusTypesScreen from "../pages/bus_provider/bus/ProviderBusTypes";
import ProviderBusRoutesScreen from "../pages/bus_provider/bus/ProviderBusRoutes";
import ProviderBusStationsScreen from "../pages/bus_provider/bus/ProviderParks";
import ProviderBusSchedulesScreen from "../pages/bus_provider/bus/ProviderBusSchedules";
import PostingRulesScreen from "../pages/admin/gl_account/posting_rule/PostingRules";
import ChartOfAccounts from "../pages/admin/gl_account/ChartOfAccounts";
import BalanceSheet from "../pages/admin/gl_account/BalanceSheet";
import ProfitLoss from "../pages/admin/gl_account/ProfitLoss";
import TrialBalance from "../pages/admin/gl_account/TrialBalance";
import GLTransactions from "../pages/admin/gl_account/revenue/GLTransactions";

export const protectedRoutes: IAppRoute[] = [
  {
    path: "",
    Component: Dashboard,
    title: "Dasboard",
    icon: <DashboardOutlined />,
  },
  {
    path: "payments",
    Component: AdminPaymentsScreen,
    title: "Payments",
    icon: <DollarOutlined />,
  },
  {
    path: "revenue",
    Component: GLTransactions,
    title: "Revenue",
    icon: <RedEnvelopeOutlined />,
  },
  {
    path: "cashouts",
    Component: AdminCashoutsScreen,
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
    path: "service-provider",
    Component: ProviderIndex,
    title: "Service Provider",
    icon: <GitlabOutlined />,
  },
  {
    path: "admins",
    Component: Index,
    title: "Admins",
    icon: <PersonStanding />,
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
    path: "bus",
    Component: TransportScreen,
    title: "Bus",
    icon: <CarOutlined />,
    children: [
      { path: "bus-types", Component: BusTypesScreen, showInMenu: true },
      { path: "bus-list", Component: BusesScreen, showInMenu: true },
      { path: "bus-routes", Component: BusRoutesScreen, showInMenu: true },
      { path: "bus-parks", Component: BusStationsScreen, showInMenu: true },
      {
        path: "bus-trips",
        Component: BusSchedulesScreen,
        showInMenu: true,
      },
    ],
  },
  {
    path: "train-services",
    Component: TransportScreen,
    title: "Train",
    icon: <TranslationOutlined />,
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
      {
        path: "gl-transactions",
        Component: GLTransactions,
        showInMenu: true,
      },
      {
        path: "posting-rules",
        Component: PostingRulesScreen,
        showInMenu: true,
      },
      {
        path: "chart-of-account",
        Component: ChartOfAccounts,
        showInMenu: true,
      },
      { path: "balance-sheet", Component: BalanceSheet, showInMenu: true },
      { path: "profit-loss", Component: ProfitLoss, showInMenu: true },
      { path: "trial-balance", Component: TrialBalance, showInMenu: true },
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
    path: "bus",
    Component: TransportScreen,
    title: "Bus",
    icon: <CarOutlined />,
    children: [
      {
        path: "bus-types",
        Component: ProviderBusTypesScreen,
        showInMenu: true,
      },
      { path: "bus-list", Component: ProviderBusesScreen, showInMenu: true },
      {
        path: "bus-routes",
        Component: ProviderBusRoutesScreen,
        showInMenu: true,
      },
      {
        path: "bus-parks",
        Component: ProviderBusStationsScreen,
        showInMenu: true,
      },
      {
        path: "bus-trips",
        Component: ProviderBusSchedulesScreen,
        showInMenu: true,
      },
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
      {
        path: "cash-out-limit",
        Component: CashoutLimitIncrease,
        showInMenu: false,
      },
      {
        path: "cash-out-withdraw",
        Component: CashoutWithdraw,
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
    path: "train-services",
    Component: TransportScreen,
    title: "Train",
    icon: <CarOutlined />,
    children: [
      { path: "trains", Component: TrainsScreen, showInMenu: true },
      { path: "train-routes", Component: TrainRoutesScreen, showInMenu: true },
      { path: "train-stations", Component: StationsScreen, showInMenu: true },
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
      {
        path: "cash-out-limit",
        Component: CashoutLimitIncrease,
        showInMenu: false,
      },
      {
        path: "cash-out-withdraw",
        Component: CashoutWithdraw,
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
    icon: <DollarOutlined />,
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
