// src/lib/org/guards.ts
// Sprint 1: Write guards to protect org-bound operations

import type { OrgContext } from "./context";

/**
 * Ensures that write operations are executed with a valid org context.
 * Demo v1.0 remains read-only and unaffected.
 */
export function requireOrgContext(
  context?: OrgContext
): asserts context is OrgContext {
  if (!context || !context.orgId) {
    throw new Error(
      "Write operation requires a valid org context (orgId missing)."
    );
  }
}
