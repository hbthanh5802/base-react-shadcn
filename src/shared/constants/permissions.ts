/**
 * Role codes — must match the permission-service backend.
 * Admins assign roles to users/groups; each role carries a default set of permissions.
 *
 * System roles:     SYSTEM_ADMIN, ORG_ADMIN, MODULE_ADMIN
 * Business roles:   CASE_CREATOR, CASE_HANDLER, CASE_APPROVER, CASE_VIEWER
 * Participant roles: COMMITTEE_*, TBKT_*, EXPERT, APPLICANT
 */
export const ROLES = {
  // System roles
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  ORG_ADMIN: 'ORG_ADMIN',
  MODULE_ADMIN: 'MODULE_ADMIN',

  // Business roles — case processing
  CASE_CREATOR: 'CASE_CREATOR',
  CASE_HANDLER: 'CASE_HANDLER',
  CASE_APPROVER: 'CASE_APPROVER',
  CASE_VIEWER: 'CASE_VIEWER',

  // Participant roles — committee
  COMMITTEE_CHAIRMAN: 'COMMITTEE_CHAIRMAN',
  COMMITTEE_SECRETARY: 'COMMITTEE_SECRETARY',
  COMMITTEE_MEMBER: 'COMMITTEE_MEMBER',
  TBKT_HEAD: 'TBKT_HEAD',
  TBKT_MEMBER: 'TBKT_MEMBER',

  // Participant roles — other
  EXPERT: 'EXPERT',
  APPLICANT: 'APPLICANT',
} as const;

export type RoleCode = (typeof ROLES)[keyof typeof ROLES];

/**
 * Permission codes — exhaustive list of actions in the system.
 * Format: DOMAIN_ACTION, e.g. USER_VIEW, CASE_WRITE.
 * Admins can toggle individual permissions per role or per user.
 */
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'DASHBOARD_VIEW',

  // User management
  USER_VIEW: 'USER_VIEW',
  USER_CREATE: 'USER_CREATE',
  USER_UPDATE: 'USER_UPDATE',
  USER_DELETE: 'USER_DELETE',

  // Personnel management
  PERSONNEL_VIEW: 'PERSONNEL_VIEW',
  PERSONNEL_CREATE: 'PERSONNEL_CREATE',
  PERSONNEL_UPDATE: 'PERSONNEL_UPDATE',
  PERSONNEL_DELETE: 'PERSONNEL_DELETE',

  // Organization structure
  ORG_VIEW: 'ORG_VIEW',
  ORG_CREATE: 'ORG_CREATE',
  ORG_UPDATE: 'ORG_UPDATE',
  ORG_DELETE: 'ORG_DELETE',

  // Roles
  ROLE_VIEW: 'ROLE_VIEW',
  ROLE_CREATE: 'ROLE_CREATE',
  ROLE_UPDATE: 'ROLE_UPDATE',
  ROLE_DELETE: 'ROLE_DELETE',

  // Permission config
  PERMISSION_VIEW: 'PERMISSION_VIEW',
  PERMISSION_CREATE: 'PERMISSION_CREATE',
  PERMISSION_UPDATE: 'PERMISSION_UPDATE',
  PERMISSION_DELETE: 'PERMISSION_DELETE',

  // Delegation
  DELEGATION_VIEW: 'DELEGATION_VIEW',
  DELEGATION_CREATE: 'DELEGATION_CREATE',
  DELEGATION_UPDATE: 'DELEGATION_UPDATE',
  DELEGATION_DELETE: 'DELEGATION_DELETE',

  // Case management
  CASE_VIEW: 'CASE_VIEW',
  CASE_CREATE: 'CASE_CREATE',
  CASE_UPDATE: 'CASE_UPDATE',
  CASE_DELETE: 'CASE_DELETE',
  CASE_APPROVE: 'CASE_APPROVE',

  // Documents
  DOC_VIEW: 'DOC_VIEW',
  DOC_UPLOAD: 'DOC_UPLOAD',
  DOC_DELETE: 'DOC_DELETE',

  // Reporting
  REPORT_VIEW: 'REPORT_VIEW',
  REPORT_EXPORT: 'REPORT_EXPORT',

  // Workflow
  WORKFLOW_VIEW: 'WORKFLOW_VIEW',
  WORKFLOW_MANAGE: 'WORKFLOW_MANAGE',

  // Settings
  SETTING_VIEW: 'SETTING_VIEW',
  SETTING_UPDATE: 'SETTING_UPDATE',
} as const;

export type PermissionCode = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
