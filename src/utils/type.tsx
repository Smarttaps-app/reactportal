export interface IPayment {
  id: number;
  recipient: string;
  channel: string;
  payment_type: string;
  status: string;
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
export interface IProductProps {
  product?: IProduct;
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
export interface ICustomer {
  id: number;
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
export interface IStation {
  id: number;
  stationName: string;
  location: string;
  updated_at: string;
  created_at: string;
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
  id: number;
  lastname: string;
  firstname: string;
  phonenumber: string;
  tag: string;
  email: string;
  status: boolean;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}
export interface IRoute {
  id: string;
  routeName: string;
  sourceStation: IStation;
  destinationStation: IStation;
  trains: any[];
  buses: any[];
}
export interface ISubscription {
  id: number;
  msisdn: string;
  status: boolean;
  frequency: string;
  created_at: string;
  expired_at: string;
}
export interface IGame {
  id: number;
  question: string;
  answers: string;
  status: boolean;
  duration: string;
  created_at: string;
  mode: string;
  instructions: number;
  rule: number;
  length: string | "0";
}
export interface IProduct {
  created_at: string;
  customerField: string;
  description: string;
  enabledInline: true;
  icon: string;
  id: 1;
  name: string;
  status: true;
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
export interface ITicket {
  question: string;
  duration: string;
  len: string | null;
}
export interface ITicket {
  question: string;
  duration: string;
  len: string | null;
}
export interface INotification {
  question: string;
  duration: string;
  len: string | null;
}
export interface IAddProps {
  isOpen?: boolean;
  onCancel: () => void;
  onOK?: () => void;
}
export interface IForgotPasswordRequest {
  email: string;
}
export interface IResetPasswordRequest {
  otp: string;
  password: string;
  confirmPassword: string;
}
