// routesConfig.ts
import {
  protectedRoutes,
  busproviderRoutes,
  businessRoutes,
  accountantRoutes,
  auditRoutes,
  supportRoutes,
} from "./routes";

export const roleRoutesMap: Record<string, any[]> = {
  superadmin: protectedRoutes,
  busprovider: busproviderRoutes,
  business: businessRoutes,
  accountant: accountantRoutes,
  auditor: auditRoutes,
  support: supportRoutes,
};
