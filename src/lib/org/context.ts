import type { OrgId, AppRole } from "./types";

export type OrgContext = {
  orgId: OrgId;
  role: AppRole;
};

export const DEFAULT_DEMO_CONTEXT: OrgContext = {
  orgId: "demo-org",
  role: "editor",
};

export function resolveOrgContext(input?: Partial<OrgContext>): OrgContext {
  return {
    orgId: input?.orgId ?? DEFAULT_DEMO_CONTEXT.orgId,
    role: input?.role ?? DEFAULT_DEMO_CONTEXT.role,
  };
}
