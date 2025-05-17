// Define all possible permissions in the system
export const PERMISSIONS = {
  // User management permissions
  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_EDIT: "users:edit",
  USERS_DELETE: "users:delete",

  // Transaction permissions
  TRANSACTIONS_VIEW: "transactions:view",
  TRANSACTIONS_APPROVE: "transactions:approve",
  TRANSACTIONS_CANCEL: "transactions:cancel",
  TRANSACTIONS_REFUND: "transactions:refund",

  // Account permissions
  ACCOUNTS_VIEW: "accounts:view",
  ACCOUNTS_CREATE: "accounts:create",
  ACCOUNTS_EDIT: "accounts:edit",
  ACCOUNTS_FREEZE: "accounts:freeze",
  ACCOUNTS_UNFREEZE: "accounts:unfreeze",

  // Admin user permissions
  ADMIN_USERS_VIEW: "admin:users:view",
  ADMIN_USERS_CREATE: "admin:users:create",
  ADMIN_USERS_EDIT: "admin:users:edit",
  ADMIN_USERS_DELETE: "admin:users:delete",

  // Permission group permissions
  PERMISSION_GROUPS_VIEW: "permission:groups:view",
  PERMISSION_GROUPS_CREATE: "permission:groups:create",
  PERMISSION_GROUPS_EDIT: "permission:groups:edit",
  PERMISSION_GROUPS_DELETE: "permission:groups:delete",

  // Settings permissions
  SETTINGS_VIEW: "settings:view",
  SETTINGS_EDIT: "settings:edit",

  // Reports permissions
  REPORTS_VIEW: "reports:view",
  REPORTS_EXPORT: "reports:export",

  // System permissions
  SYSTEM_LOGS_VIEW: "system:logs:view",
  SYSTEM_MAINTENANCE: "system:maintenance",
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

// Group permissions by category for UI display
export const PERMISSION_CATEGORIES = {
  USER_MANAGEMENT: {
    name: "User Management",
    description: "Manage platform users",
    permissions: [PERMISSIONS.USERS_VIEW, PERMISSIONS.USERS_CREATE, PERMISSIONS.USERS_EDIT, PERMISSIONS.USERS_DELETE],
  },
  TRANSACTION_MANAGEMENT: {
    name: "Transaction Management",
    description: "Manage payment transactions",
    permissions: [
      PERMISSIONS.TRANSACTIONS_VIEW,
      PERMISSIONS.TRANSACTIONS_APPROVE,
      PERMISSIONS.TRANSACTIONS_CANCEL,
      PERMISSIONS.TRANSACTIONS_REFUND,
    ],
  },
  ACCOUNT_MANAGEMENT: {
    name: "Account Management",
    description: "Manage user accounts and balances",
    permissions: [
      PERMISSIONS.ACCOUNTS_VIEW,
      PERMISSIONS.ACCOUNTS_CREATE,
      PERMISSIONS.ACCOUNTS_EDIT,
      PERMISSIONS.ACCOUNTS_FREEZE,
      PERMISSIONS.ACCOUNTS_UNFREEZE,
    ],
  },
  ADMIN_MANAGEMENT: {
    name: "Admin Management",
    description: "Manage admin users",
    permissions: [
      PERMISSIONS.ADMIN_USERS_VIEW,
      PERMISSIONS.ADMIN_USERS_CREATE,
      PERMISSIONS.ADMIN_USERS_EDIT,
      PERMISSIONS.ADMIN_USERS_DELETE,
    ],
  },
  PERMISSION_MANAGEMENT: {
    name: "Permission Management",
    description: "Manage permission groups",
    permissions: [
      PERMISSIONS.PERMISSION_GROUPS_VIEW,
      PERMISSIONS.PERMISSION_GROUPS_CREATE,
      PERMISSIONS.PERMISSION_GROUPS_EDIT,
      PERMISSIONS.PERMISSION_GROUPS_DELETE,
    ],
  },
  SETTINGS: {
    name: "Settings",
    description: "Manage system settings",
    permissions: [PERMISSIONS.SETTINGS_VIEW, PERMISSIONS.SETTINGS_EDIT],
  },
  REPORTS: {
    name: "Reports",
    description: "Access and export reports",
    permissions: [PERMISSIONS.REPORTS_VIEW, PERMISSIONS.REPORTS_EXPORT],
  },
  SYSTEM: {
    name: "System",
    description: "System-level operations",
    permissions: [PERMISSIONS.SYSTEM_LOGS_VIEW, PERMISSIONS.SYSTEM_MAINTENANCE],
  },
}

// Get a human-readable name for a permission
export function getPermissionName(permission: Permission): string {
  const parts = permission.split(":")
  if (parts.length !== 2) return permission

  const [category, action] = parts
  return `${action.charAt(0).toUpperCase() + action.slice(1)} ${category}`
}

// Default permission sets for built-in roles
export const DEFAULT_ROLE_PERMISSIONS = {
  super_admin: Object.values(PERMISSIONS),
  admin: [
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_CREATE,
    PERMISSIONS.USERS_EDIT,
    PERMISSIONS.TRANSACTIONS_VIEW,
    PERMISSIONS.TRANSACTIONS_APPROVE,
    PERMISSIONS.TRANSACTIONS_CANCEL,
    PERMISSIONS.ACCOUNTS_VIEW,
    PERMISSIONS.ACCOUNTS_CREATE,
    PERMISSIONS.ACCOUNTS_EDIT,
    PERMISSIONS.ACCOUNTS_FREEZE,
    PERMISSIONS.ACCOUNTS_UNFREEZE,
    PERMISSIONS.ADMIN_USERS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    PERMISSIONS.SETTINGS_VIEW,
  ],
  support: [PERMISSIONS.USERS_VIEW, PERMISSIONS.TRANSACTIONS_VIEW, PERMISSIONS.ACCOUNTS_VIEW, PERMISSIONS.REPORTS_VIEW],
}

// Helper function to check if a user has a specific permission
export function hasPermission(userPermissions: Permission[], permission: Permission): boolean {
  return userPermissions.includes(permission)
}

// Helper function to check if a user has all of the specified permissions
export function hasAllPermissions(userPermissions: Permission[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission))
}

// Helper function to check if a user has any of the specified permissions
export function hasAnyPermission(userPermissions: Permission[], permissions: Permission[]): boolean {
  return permissions.some((permission) => userPermissions.includes(permission))
}
