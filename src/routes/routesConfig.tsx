// routesConfig.ts
import {
  protectedRoutes,
  busproviderRoutes,
  businessRoutes,
  accountantRoutes,
  auditRoutes,
  supportRoutes,
  trainproviderRoutes,
} from "./routes";

export const roleRoutesMap: Record<string, any[]> = {
  superadmin: protectedRoutes,
  busprovider: busproviderRoutes,
  trainprovider: trainproviderRoutes,
  business: businessRoutes,
  accountant: accountantRoutes,
  auditor: auditRoutes,
  support: supportRoutes,
};
