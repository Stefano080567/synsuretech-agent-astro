export type OrgId = string;
export type WorkspaceId = string;
export type UserId = string;

export type AppRole = "editor" | "reviewer" | "supervisor";

export type Org = {
  orgId: OrgId;
  name: string;
  defaultLanguage: string; // e.g. "en", "de"
  createdAt: string; // ISO date
};

export type Workspace = {
  workspaceId: WorkspaceId;
  orgId: OrgId;
  name: string; // e.g. "Default"
  createdAt: string; // ISO date
};

export type Membership = {
  orgId: OrgId;
  userId: UserId;
  role: AppRole;
};
