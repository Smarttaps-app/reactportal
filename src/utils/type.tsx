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
export interface ICustomer {
  id: number;
  phonenumber: string;
  firstname: string;
  lastname: string;
  created_at: string;
}
export interface ILead {
  id: number;
  msisdn: string;
  score: string;
  duration: string;
  finished_at: string;
}
export interface ISubmitGameRequest {
  tag: string;
  answer: string;
  duration: number;
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
  status: boolean;
}
export interface IPlayer {
  id: string;
  msisdn: string;
  status: boolean;
  created_at: string;
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
export interface IRule {
  id: number | 0;
  title: string;
  message: string;
  code: string;
  mode: string;
  status: boolean | true;
  created_at: string;
}
export interface IInstruction {
  id: number | 0;
  title: string;
  message: string;
  code: string;
  mode: string;
  status: boolean | true;
  created_at: string;
}
export interface IGameState {
  msisdn: string;
  status: boolean | false;
  quiz: IQuiz | null;
  answer: string | "";
  error: string | "";
  secondsRemaining: number | 0;
  timerRunning: boolean | false;
}
export interface IQuiz {
  question: string;
  duration: string;
  len: string | null;
}
export interface RootState {
  game: IGameState;
}
export type AppDispatch = typeof store.dispatch;
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
