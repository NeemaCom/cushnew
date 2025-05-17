"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { type Permission, DEFAULT_ROLE_PERMISSIONS } from "@/app/lib/permissions"

// Permission group type
export type PermissionGroup = {
  id: string
  name: string
  description: string
  permissions: Permission[]
  createdAt: Date
  updatedAt?: Date
}

// In a real app, this would be stored in a database
export type AdminUser = {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  role: "super_admin" | "admin" | "support"
  permissionGroups?: string[] // IDs of permission groups
  avatar?: string
  lastLogin?: Date
  createdAt: Date
  status: "active" | "inactive"
}

// Mock admin users database
const adminUsers: Map<string, AdminUser> = new Map([
  [
    "1",
    {
      id: "1",
      name: "Super Admin",
      email: "admin@cushpay.com",
      password: "admin123",
      role: "super_admin",
      createdAt: new Date("2023-01-01"),
      status: "active",
    },
  ],
  [
    "2",
    {
      id: "2",
      name: "John Admin",
      email: "john@cushpay.com",
      password: "john123",
      role: "admin",
      permissionGroups: ["1"],
      createdAt: new Date("2023-03-15"),
      status: "active",
    },
  ],
  [
    "3",
    {
      id: "3",
      name: "Sarah Support",
      email: "sarah@cushpay.com",
      password: "sarah123",
      role: "support",
      permissionGroups: ["2"],
      createdAt: new Date("2023-05-20"),
      status: "active",
    },
  ],
])

// Mock permission groups database
const permissionGroups: Map<string, PermissionGroup> = new Map([
  [
    "1",
    {
      id: "1",
      name: "User Management",
      description: "Can manage users and their accounts",
      permissions: ["users:view", "users:create", "users:edit", "accounts:view", "accounts:edit", "transactions:view"],
      createdAt: new Date("2023-01-15"),
    },
  ],
  [
    "2",
    {
      id: "2",
      name: "Customer Support",
      description: "Basic permissions for support staff",
      permissions: ["users:view", "transactions:view", "accounts:view"],
      createdAt: new Date("2023-02-10"),
    },
  ],
  [
    "3",
    {
      id: "3",
      name: "Transaction Management",
      description: "Can manage and approve transactions",
      permissions: ["transactions:view", "transactions:approve", "transactions:cancel", "transactions:refund"],
      createdAt: new Date("2023-03-05"),
    },
  ],
])

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email and password are required" }
  }

  // Find admin user by email
  let foundAdmin: AdminUser | undefined

  for (const admin of adminUsers.values()) {
    if (admin.email === email) {
      foundAdmin = admin
      break
    }
  }

  // Check credentials
  if (!foundAdmin || foundAdmin.password !== password) {
    return { success: false, message: "Invalid email or password" }
  }

  // Check if admin is active
  if (foundAdmin.status !== "active") {
    return { success: false, message: "Your account is inactive. Please contact the super admin." }
  }

  // Update last login
  foundAdmin.lastLogin = new Date()

  // Create admin session
  cookies().set({
    name: "admin_session",
    value: foundAdmin.id,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 4, // 4 hours
  })

  return { success: true }
}

export async function logoutAdmin() {
  cookies().delete("admin_session")
  redirect("/admin/login")
}

export async function checkAdminSession() {
  const session = cookies().get("admin_session")
  return session?.value ? true : false
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const session = cookies().get("admin_session")
  if (!session?.value) return null

  const admin = adminUsers.get(session.value)
  return admin || null
}

// Admin user management functions
export async function getAllAdminUsers() {
  return Array.from(adminUsers.values())
}

export async function getAdminUser(id: string) {
  return adminUsers.get(id) || null
}

export async function createAdminUser(formData: FormData) {
  const currentAdmin = await getCurrentAdmin()

  // Only super_admin can create new admin users
  if (!currentAdmin || currentAdmin.role !== "super_admin") {
    return { success: false, message: "Unauthorized: Only super admins can create new admin users" }
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as "super_admin" | "admin" | "support"
  const permissionGroupIds = formData.getAll("permissionGroups") as string[]

  if (!name || !email || !password || !role) {
    return { success: false, message: "All fields are required" }
  }

  // Check if email already exists
  for (const admin of adminUsers.values()) {
    if (admin.email === email) {
      return { success: false, message: "An admin with this email already exists" }
    }
  }

  // Validate permission groups
  if (permissionGroupIds.length > 0) {
    for (const groupId of permissionGroupIds) {
      if (!permissionGroups.has(groupId)) {
        return { success: false, message: `Permission group with ID ${groupId} does not exist` }
      }
    }
  }

  const newAdmin: AdminUser = {
    id: (adminUsers.size + 1).toString(),
    name,
    email,
    password, // In a real app, this would be hashed
    role,
    permissionGroups: permissionGroupIds.length > 0 ? permissionGroupIds : undefined,
    createdAt: new Date(),
    status: "active",
  }

  adminUsers.set(newAdmin.id, newAdmin)

  return { success: true, admin: newAdmin }
}

export async function updateAdminUser(id: string, formData: FormData) {
  const currentAdmin = await getCurrentAdmin()

  // Check permissions
  if (!currentAdmin) {
    return { success: false, message: "Unauthorized" }
  }

  // Only super_admin can edit other admins, or admins can edit themselves
  if (currentAdmin.role !== "super_admin" && currentAdmin.id !== id) {
    return { success: false, message: "Unauthorized: You can only edit your own profile" }
  }

  const admin = adminUsers.get(id)
  if (!admin) {
    return { success: false, message: "Admin user not found" }
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as "super_admin" | "admin" | "support"
  const status = formData.get("status") as "active" | "inactive"
  const permissionGroupIds = formData.getAll("permissionGroups") as string[]

  if (!name || !email || !role || !status) {
    return { success: false, message: "Required fields are missing" }
  }

  // Check if email already exists (for other users)
  for (const existingAdmin of adminUsers.values()) {
    if (existingAdmin.email === email && existingAdmin.id !== id) {
      return { success: false, message: "An admin with this email already exists" }
    }
  }

  // Validate permission groups
  if (permissionGroupIds.length > 0) {
    for (const groupId of permissionGroupIds) {
      if (!permissionGroups.has(groupId)) {
        return { success: false, message: `Permission group with ID ${groupId} does not exist` }
      }
    }
  }

  // Update admin user
  const updatedAdmin: AdminUser = {
    ...admin,
    name,
    email,
    role: currentAdmin.role === "super_admin" ? role : admin.role, // Only super_admin can change roles
    status: currentAdmin.role === "super_admin" ? status : admin.status, // Only super_admin can change status
    permissionGroups: permissionGroupIds.length > 0 ? permissionGroupIds : admin.permissionGroups,
  }

  // Only update password if provided
  if (password) {
    updatedAdmin.password = password // In a real app, this would be hashed
  }

  adminUsers.set(id, updatedAdmin)

  return { success: true, admin: updatedAdmin }
}

export async function deleteAdminUser(id: string) {
  const currentAdmin = await getCurrentAdmin()

  // Only super_admin can delete admin users
  if (!currentAdmin || currentAdmin.role !== "super_admin") {
    return { success: false, message: "Unauthorized: Only super admins can delete admin users" }
  }

  // Cannot delete yourself
  if (currentAdmin.id === id) {
    return { success: false, message: "You cannot delete your own account" }
  }

  if (!adminUsers.has(id)) {
    return { success: false, message: "Admin user not found" }
  }

  adminUsers.delete(id)

  return { success: true }
}

// Permission group management functions
export async function getAllPermissionGroups() {
  return Array.from(permissionGroups.values())
}

export async function getPermissionGroup(id: string) {
  return permissionGroups.get(id) || null
}

export async function createPermissionGroup(formData: FormData) {
  const currentAdmin = await getCurrentAdmin()

  // Only super_admin can create permission groups
  if (!currentAdmin || !(await adminHasPermission(currentAdmin.id, "permission:groups:create"))) {
    return { success: false, message: "Unauthorized: You don't have permission to create permission groups" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const permissions = formData.getAll("permissions") as Permission[]

  if (!name || permissions.length === 0) {
    return { success: false, message: "Name and at least one permission are required" }
  }

  // Check if name already exists
  for (const group of permissionGroups.values()) {
    if (group.name === name) {
      return { success: false, message: "A permission group with this name already exists" }
    }
  }

  const newGroup: PermissionGroup = {
    id: (permissionGroups.size + 1).toString(),
    name,
    description,
    permissions,
    createdAt: new Date(),
  }

  permissionGroups.set(newGroup.id, newGroup)

  return { success: true, group: newGroup }
}

export async function updatePermissionGroup(id: string, formData: FormData) {
  const currentAdmin = await getCurrentAdmin()

  // Check permissions
  if (!currentAdmin || !(await adminHasPermission(currentAdmin.id, "permission:groups:edit"))) {
    return { success: false, message: "Unauthorized: You don't have permission to edit permission groups" }
  }

  const group = permissionGroups.get(id)
  if (!group) {
    return { success: false, message: "Permission group not found" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const permissions = formData.getAll("permissions") as Permission[]

  if (!name || permissions.length === 0) {
    return { success: false, message: "Name and at least one permission are required" }
  }

  // Check if name already exists (for other groups)
  for (const existingGroup of permissionGroups.values()) {
    if (existingGroup.name === name && existingGroup.id !== id) {
      return { success: false, message: "A permission group with this name already exists" }
    }
  }

  // Update permission group
  const updatedGroup: PermissionGroup = {
    ...group,
    name,
    description,
    permissions,
    updatedAt: new Date(),
  }

  permissionGroups.set(id, updatedGroup)

  return { success: true, group: updatedGroup }
}

export async function deletePermissionGroup(id: string) {
  const currentAdmin = await getCurrentAdmin()

  // Check permissions
  if (!currentAdmin || !(await adminHasPermission(currentAdmin.id, "permission:groups:delete"))) {
    return { success: false, message: "Unauthorized: You don't have permission to delete permission groups" }
  }

  if (!permissionGroups.has(id)) {
    return { success: false, message: "Permission group not found" }
  }

  // Check if any admin users are using this permission group
  for (const admin of adminUsers.values()) {
    if (admin.permissionGroups?.includes(id)) {
      return {
        success: false,
        message: "Cannot delete this permission group because it is assigned to one or more admin users",
      }
    }
  }

  permissionGroups.delete(id)

  return { success: true }
}

// Permission checking functions
export async function adminHasPermission(adminId: string, permission: Permission): Promise<boolean> {
  const admin = adminUsers.get(adminId)
  if (!admin) return false

  // Super admins have all permissions
  if (admin.role === "super_admin") return true

  // Check role-based permissions
  const rolePermissions = DEFAULT_ROLE_PERMISSIONS[admin.role] || []
  if (rolePermissions.includes(permission)) return true

  // Check permission groups
  if (admin.permissionGroups && admin.permissionGroups.length > 0) {
    for (const groupId of admin.permissionGroups) {
      const group = permissionGroups.get(groupId)
      if (group && group.permissions.includes(permission)) {
        return true
      }
    }
  }

  return false
}

export async function getAdminPermissions(adminId: string): Promise<Permission[]> {
  const admin = adminUsers.get(adminId)
  if (!admin) return []

  // Super admins have all permissions
  if (admin.role === "super_admin") {
    return Object.values(DEFAULT_ROLE_PERMISSIONS.super_admin)
  }

  // Start with role-based permissions
  const permissions = new Set<Permission>(DEFAULT_ROLE_PERMISSIONS[admin.role] || [])

  // Add permissions from permission groups
  if (admin.permissionGroups && admin.permissionGroups.length > 0) {
    for (const groupId of admin.permissionGroups) {
      const group = permissionGroups.get(groupId)
      if (group) {
        group.permissions.forEach((p) => permissions.add(p))
      }
    }
  }

  return Array.from(permissions)
}
