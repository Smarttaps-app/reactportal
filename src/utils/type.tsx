import { ReactNode } from "react";
export interface IAppRoute {
  path: string;
  Component: React.ComponentType<any>;
  title?: string;
  icon?: React.ReactNode;
  showInMenu?: boolean;
  children?: IAppRoute[];
}
export interface ICashout {
  id: number;
  walletCashout: string;
  message: string;
  source: string;
  amount: string;
  recipient: string;
  withdrawalStatus: string;
  statusCode: string;
  statusDescription: string;
  reference: string;
  reason: string;
  pin: string;
  admin_id: number;
  customerId: string;
  created_at: string;
  updated_at: string;
}
export interface IPayment {
  id: number;
  recipient: string;
  channel: string;
  payment_type: string;
  status: string;
  name: string;
  updated_at: string;
  statusMessage: string;
  created_at: string;
  amount: string;
}
export interface PaymentCardProps {
  title: string;
  sessionKey: string;
  loading: boolean;
  data: IPayment[];
  error: boolean;
  color: string;
  children?: ReactNode;
}
export interface ProductCardProps {
  title: string;
  sessionKey: string;
  loading: boolean;
  valueKey: string;
  data: IProduct[];
  error: boolean;
}
export interface IShowPaymentProps {
  payment?: IPayment;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}

export interface ICustomer {
  identifier: string;
  phonenumber: string;
  firstname: string;
  lastname: string;
  account_ratings: string;
  email: string;
  account_type: string;
  date_of_birth: string;
  nin_verified: boolean;
  bvn_verified: boolean;
  address_submitted: boolean;
  avatar: string | null;
  wallet: IWallet | null;
  created_at: string;
}
export interface ICustomerProps {
  customer?: ICustomer;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
export interface CustomerCardProps {
  title: string;
  sessionKey: string;
  valueKey: string;
  loading: boolean;
  data: ICustomer[];
  error: boolean;
}
export interface IWallet {
  walletAccount: string;
  availableBalance: string;
  id: number;
}
export interface ILogin {
  username: string;
  password: string;
}
export interface IAddRequest {
  username: string;
  password: string;
}
export interface IUser {
  identifier: string;
  lastname: string;
  firstname: string;
  phonenumber: string;
  tag: string;
  email: string;
  billerId: string;
  status: boolean;
  wallet: IWallet | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}
export interface IRole {
  id: number;
  name: string;
  tag: string;
  description: string;
  status: boolean;
}
export interface IForgotPasswordRequest {
  email: string;
}
export interface IResetPasswordRequest {
  otp: string;
  password: string;
  confirmPassword: string;
}
export interface IProduct {
  created_at: string;
  customerField: string;
  description: string;
  enabledInline: true;
  icon: string;
  id: 1;
  name: string;
  status: boolean | true;
  updated_at: string;
  vasType: string;
  billers: IBiller[] | [];
}
export interface IBiller {
  billerId: string;
  billerName: string;
  billerType: string;
  created_at: string;
  customerField: string;
  hasAddons: boolean;
  hasLookup: boolean;
  hasPackages: boolean;
  id: number;
  logo: string;
  status: boolean | true;
  maxAmountLimit: number;
  minAmountLimit: number;
  network: string;
  packages: IPackage[] | [];
  product_id: number;
  updated_at: string;
}
export interface IPackage {
  amount: string;
  billerId: string;
  created_at: string;
  currencyCode: string;
  currencySymbol: string;
  description: string;
  hasValidity: boolean;
  id: number;
  packageCode: string;
  product_type_id: number;
  status: boolean;
  updated_at: string;
  validity: string;
}
export interface IBeneficiary {
  id: number;
  nickname: string;
  customerId: string;
  transaction_type: string;
  logo: string;
  billercode: string;
  billername: string;
  updated_at: string;
  created_at: string;
}
export interface IStation {
  identifier: string;
  stationName: string;
  location: string;
  parkImage: string;
  admin_id: number;
  mode: string;
  updated_at: string;
  created_at: string;
}
export interface ITrain {
  identifier: string;
  admin_id: number;
  trainName: string;
  trainNumber: string;
  image: string;
  description: string;
  schedules: ISchedule[];
  routes: IRoute[];
  created_at: string;
  updated_at: string;
}
export interface IBus {
  identifier: string;
  admin_id: number;
  name: string;
  tv: boolean;
  camera: boolean;
  airCondition: boolean;
  base_price: string;
  seatCount: string;
  types: string | null;
  bus_number: string | null;
  routes: IBusRoute[];
  schedules: ISchedule[];
  busImage: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}
export interface ISchedule {
  identifier: string;
  admin_id: number;
  mode: string;
  daysOfOperation: string | null;
  timeOfOperation: string | null;
  departureTime: string;
  arrivalTime: string;
}
export interface ITicket {
  booked_at: string;
  bus: IBus;
  created_at: string;
  updated_at: string;
  expired_at: string;
  id: number;
  mode: string;
  price: string;
  qr_code: string;
  route: IRoute;
  schedule: ISchedule;
  status: string;
  ticket_number: string;
}
export interface IRoute {
  identifier: string;
  admin_id: number;
  routeName: string;
  sourceStation: IStation;
  startId: number;
  stopId: number;
  destinationStation: IStation;
  trains: ITrain[];
  buses: IBus[];
  seats: ISeat[];
}
export interface IBusRoute {
  identifier: string;
  admin_id: string;
  routeName: string;
  sourceStation: IStation;
  startId: number;
  stopId: number;
  destinationStation: IStation;
  baseprice: string;
  buses: IBus[];
}
export interface ISeat {
  identifier: string;
  seatNumber: string;
  classType: string;
  availabilityStatus: string;
  price: string;
  admin_id: number;
  created_at: string;
  updated_at: string;
}
export interface IPark {
  identifier: string;
  name: string;
  parkImage: string;
  address: string;
  contact: string;
  startingPoint: string;
  estimatedDeparture: string;
  estimatedArrival: string;
  destination: string;
  description: string;
  status: string;
  policy: string;
  created_at: string;
  expired_at: string;
}
export interface INotification {
  id: number;
  title: string;
  type: string;
  message: string;
  created_at: string;
  updated_at: string;
  isRead: boolean;
}
export interface ISetting {
  access_token_expire_minutes: number;
  secret_key: string;
  algorithm: string;
  mail_username: string;
  mail_password: string;
  mail_from: string;
  mail_port: string;
  mail_server: string;
  mail_from_name: string;
  paystack_url: string;
  paystack_token: string;
}
export interface IAddProps<T> {
  payload?: T;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
export interface IChangePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
export interface ILedger {
  id: number;
  code: string;
  name: string;
  gl_type: string;
  gl_balance: string;
  journal_entries: IJournal[];
}
export interface IJournal {
  id: number;
  amount: string;
  is_debit: boolean;
  account_id: string;
  admin_id: string;
  created_at: string;
  updated_at: string;
}
export interface ICommission {
  id: number;
  commission_rate: string;
  commission_type: string;
  product_type_id: string;
  glcode: string;
  admin_id: string;
  created_at: string;
  updated_at: string;
}
export interface IDiscount {
  id: number;
  provider_discount_rate: string;
  provider_discount_type: string;
  product_type_id: string;
  gl_to_provider: string;
  admin_id: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}
export interface AddCashoutBank {
  bankCode: string;
  accountNumber: string;
  pin: string;
}
export interface IBank {
  code: string;
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}
export interface IComment {
  id: number;
  comment: string;
  attachment: string;
  ticket_id: number;
  user_id: number;
  admin_id: string;
  created_at: string;
  updated_at: string;
}
export interface ISupportTicket {
  id: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  admin: { firstname: string; lastname: string } | null;
  user: { firstname: string; lastname: string } | null;
  comments: IComment[];
  assigned_to: string;
  created_at: string;
  updated_at: string;
}
