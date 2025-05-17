"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Edit, Trash2, Check, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  type AdminUser,
  type PermissionGroup,
  getAllAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getCurrentAdmin,
  getAllPermissionGroups,
  adminHasPermission,
} from "@/app/actions/admin-auth"

export default function AdminUsersPage() {
  const router = useRouter()
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([])
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [canCreate, setCanCreate] = useState(false)
  const [canEdit, setCanEdit] = useState(false)
  const [canDelete, setCanDelete] = useState(false)

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"super_admin" | "admin" | "support">("admin")
  const [status, setStatus] = useState<"active" | "inactive">("active")
  const [selectedPermissionGroups, setSelectedPermissionGroups] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [adminUsersData, permissionGroupsData, currentAdminData] = await Promise.all([
          getAllAdminUsers(),
          getAllPermissionGroups(),
          getCurrentAdmin(),
        ])

        setAdminUsers(adminUsersData)
        setPermissionGroups(permissionGroupsData)
        setCurrentAdmin(currentAdminData)

        if (currentAdminData) {
          const [canCreatePerm, canEditPerm, canDeletePerm] = await Promise.all([
            adminHasPermission(currentAdminData.id, "admin:users:create"),
            adminHasPermission(currentAdminData.id, "admin:users:edit"),
            adminHasPermission(currentAdminData.id, "admin:users:delete"),
          ])

          setCanCreate(canCreatePerm)
          setCanEdit(canEditPerm)
          setCanDelete(canDeletePerm)
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load admin users")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredAdmins = adminUsers.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("role", role)
    selectedPermissionGroups.forEach((groupId) => {
      formData.append("permissionGroups", groupId)
    })

    try {
      const result = await createAdminUser(formData)

      if (result.success) {
        setAdminUsers((prev) => [...prev, result.admin!])
        setAddDialogOpen(false)
        setSuccess("Admin user created successfully")
        resetForm()
      } else {
        setError(result.message || "Failed to create admin user")
      }
    } catch (err) {
      console.error("Error creating admin user:", err)
      setError("An unexpected error occurred")
    }
  }

  const handleEditAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!selectedAdmin) return

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    if (password) formData.append("password", password)
    formData.append("role", role)
    formData.append("status", status)
    selectedPermissionGroups.forEach((groupId) => {
      formData.append("permissionGroups", groupId)
    })

    try {
      const result = await updateAdminUser(selectedAdmin.id, formData)

      if (result.success) {
        setAdminUsers((prev) => prev.map((admin) => (admin.id === selectedAdmin.id ? result.admin! : admin)))
        setEditDialogOpen(false)
        setSuccess("Admin user updated successfully")
        resetForm()
      } else {
        setError(result.message || "Failed to update admin user")
      }
    } catch (err) {
      console.error("Error updating admin user:", err)
      setError("An unexpected error occurred")
    }
  }

  const handleDeleteAdmin = async () => {
    if (!selectedAdmin) return

    try {
      const result = await deleteAdminUser(selectedAdmin.id)

      if (result.success) {
        setAdminUsers((prev) => prev.filter((admin) => admin.id !== selectedAdmin.id))
        setDeleteDialogOpen(false)
        setSuccess("Admin user deleted successfully")
      } else {
        setError(result.message || "Failed to delete admin user")
      }
    } catch (err) {
      console.error("Error deleting admin user:", err)
      setError("An unexpected error occurred")
    }
  }

  const openEditDialog = (admin: AdminUser) => {
    setSelectedAdmin(admin)
    setName(admin.name)
    setEmail(admin.email)
    setPassword("")
    setRole(admin.role)
    setStatus(admin.status)
    setSelectedPermissionGroups(admin.permissionGroups || [])
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (admin: AdminUser) => {
    setSelectedAdmin(admin)
    setDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setPassword("")
    setRole("admin")
    setStatus("active")
    setSelectedPermissionGroups([])
    setSelectedAdmin(null)
    setShowPassword(false)
  }

  const togglePermissionGroup = (groupId: string) => {
    setSelectedPermissionGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId],
    )
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "super_admin":
        return "default"
      case "admin":
        return "secondary"
      case "support":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === "active" ? "default" : "destructive"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getPermissionGroupsForAdmin = (admin: AdminUser) => {
    return permissionGroups.filter((group) => admin.permissionGroups?.includes(group.id))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading admin users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin User Management</h1>
          <p className="text-muted-foreground">Manage administrator accounts and permissions</p>
        </div>
        {canCreate && (
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Admin User
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-500 text-green-500">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage administrator accounts and permissions</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search admin users..."
                className="w-full bg-white pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/50 p-2 text-sm font-medium">
              <div className="col-span-1">ID</div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-1">Role</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-3">Permission Groups</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {filteredAdmins.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No admin users found</div>
            ) : (
              filteredAdmins.map((admin) => (
                <div key={admin.id} className="grid grid-cols-12 items-center border-b p-3 text-sm last:border-0">
                  <div className="col-span-1 font-mono">{admin.id}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                      <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                    </Avatar>
                    <span>{admin.name}</span>
                  </div>
                  <div className="col-span-2">{admin.email}</div>
                  <div className="col-span-1">
                    <Badge variant={getRoleBadgeVariant(admin.role)}>
                      {admin.role === "super_admin" ? "Super Admin" : admin.role === "admin" ? "Admin" : "Support"}
                    </Badge>
                  </div>
                  <div className="col-span-1">
                    <Badge variant={getStatusBadgeVariant(admin.status)}>{admin.status}</Badge>
                  </div>
                  <div className="col-span-3">
                    <div className="flex flex-wrap gap-1">
                      {getPermissionGroupsForAdmin(admin).length > 0 ? (
                        getPermissionGroupsForAdmin(admin).map((group) => (
                          <Badge key={group.id} variant="outline" className="text-xs">
                            {group.name}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">No custom groups</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(admin)}
                      disabled={!canEdit && currentAdmin?.id !== admin.id}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    {canDelete && currentAdmin?.id !== admin.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => openDeleteDialog(admin)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Total: <strong>{filteredAdmins.length}</strong> admin users
          </div>
        </CardFooter>
      </Card>

      {/* Add Admin Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Admin User</DialogTitle>
            <DialogDescription>Create a new administrator account with specific permissions.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddAdmin}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Permission Groups</Label>
                <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                  {permissionGroups.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No permission groups available</p>
                  ) : (
                    <div className="space-y-2">
                      {permissionGroups.map((group) => (
                        <div key={group.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`group-${group.id}`}
                            checked={selectedPermissionGroups.includes(group.id)}
                            onCheckedChange={() => togglePermissionGroup(group.id)}
                          />
                          <div>
                            <label
                              htmlFor={`group-${group.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {group.name}
                            </label>
                            <p className="text-xs text-muted-foreground">{group.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Admin</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogDescription>Update administrator account details and permissions.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditAdmin}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-password">
                  Password <span className="text-muted-foreground">(Leave blank to keep current)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="edit-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              {currentAdmin?.role === "super_admin" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-role">Role</Label>
                    <Select value={role} onValueChange={(value) => setRole(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <Label>Permission Groups</Label>
                <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                  {permissionGroups.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No permission groups available</p>
                  ) : (
                    <div className="space-y-2">
                      {permissionGroups.map((group) => (
                        <div key={group.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`edit-group-${group.id}`}
                            checked={selectedPermissionGroups.includes(group.id)}
                            onCheckedChange={() => togglePermissionGroup(group.id)}
                          />
                          <div>
                            <label
                              htmlFor={`edit-group-${group.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {group.name}
                            </label>
                            <p className="text-xs text-muted-foreground">{group.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Admin Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the admin user
              <strong> {selectedAdmin?.name}</strong> and remove their access to the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAdmin} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
