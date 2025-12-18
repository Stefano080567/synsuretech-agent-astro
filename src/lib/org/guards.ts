import type { OrgContext } from "./context";

export function requireOrgContext(
  context?: OrgContext
): asserts context is OrgContext {
  if (!context || !context.orgId) {
    throw new Error("Write operation requires a valid org context (orgId missing).");
  }
}
