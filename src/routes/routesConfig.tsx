// routesConfig.ts
import { IAppRoute } from "../utils/type";
import {
  protectedRoutes,
  busproviderRoutes,
  businessRoutes,
  accountantRoutes,
  auditRoutes,
  supportRoutes,
  trainproviderRoutes,
} from "./routes";

export const roleRoutesMap: Record<string, IAppRoute[]> = {
  superadmin: protectedRoutes,
  busprovider: busproviderRoutes,
  trainprovider: trainproviderRoutes,
  business: businessRoutes,
  accountant: accountantRoutes,
  auditor: auditRoutes,
  support: supportRoutes,
};
