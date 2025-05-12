"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  type PermissionGroup,
  getAllPermissionGroups,
  createPermissionGroup,
  updatePermissionGroup,
  deletePermissionGroup,
  getCurrentAdmin,
  adminHasPermission,
} from "@/app/actions/admin-auth"
import { PERMISSION_CATEGORIES, type Permission, getPermissionName } from "@/app/lib/permissions"

export default function PermissionGroupsPage() {
  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([])
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
  const [selectedGroup, setSelectedGroup] = useState<PermissionGroup | null>(null)

  // Form states
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [permissionGroupsData, currentAdmin] = await Promise.all([getAllPermissionGroups(), getCurrentAdmin()])

        setPermissionGroups(permissionGroupsData)

        if (currentAdmin) {
          const [canCreatePerm, canEditPerm, canDeletePerm] = await Promise.all([
            adminHasPermission(currentAdmin.id, "permission:groups:create"),
            adminHasPermission(currentAdmin.id, "permission:groups:edit"),
            adminHasPermission(currentAdmin.id, "permission:groups:delete"),
          ])

          setCanCreate(canCreatePerm)
          setCanEdit(canEditPerm)
          setCanDelete(canDeletePerm)
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load permission groups")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredGroups = permissionGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    selectedPermissions.forEach((permission) => {
      formData.append("permissions", permission)
    })

    try {
      const result = await createPermissionGroup(formData)

      if (result.success) {
        setPermissionGroups((prev) => [...prev, result.group!])
        setAddDialogOpen(false)
        setSuccess("Permission group created successfully")
        resetForm()
      } else {
        setError(result.message || "Failed to create permission group")
      }
    } catch (err) {
      console.error("Error creating permission group:", err)
      setError("An unexpected error occurred")
    }
  }

  const handleEditGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!selectedGroup) return

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    selectedPermissions.forEach((permission) => {
      formData.append("permissions", permission)
    })

    try {
      const result = await updatePermissionGroup(selectedGroup.id, formData)

      if (result.success) {
        setPermissionGroups((prev) => prev.map((group) => (group.id === selectedGroup.id ? result.group! : group)))
        setEditDialogOpen(false)
        setSuccess("Permission group updated successfully")
        resetForm()
      } else {
        setError(result.message || "Failed to update permission group")
      }
    } catch (err) {
      console.error("Error updating permission group:", err)
      setError("An unexpected error occurred")
    }
  }

  const handleDeleteGroup = async () => {
    if (!selectedGroup) return

    try {
      const result = await deletePermissionGroup(selectedGroup.id)

      if (result.success) {
        setPermissionGroups((prev) => prev.filter((group) => group.id !== selectedGroup.id))
        setDeleteDialogOpen(false)
        setSuccess("Permission group deleted successfully")
      } else {
        setError(result.message || "Failed to delete permission group")
      }
    } catch (err) {
      console.error("Error deleting permission group:", err)
      setError("An unexpected error occurred")
    }
  }

  const openEditDialog = (group: PermissionGroup) => {
    setSelectedGroup(group)
    setName(group.name)
    setDescription(group.description)
    setSelectedPermissions(group.permissions)
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (group: PermissionGroup) => {
    setSelectedGroup(group)
    setDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setSelectedPermissions([])
    setSelectedGroup(null)
  }

  const togglePermission = (permission: Permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission],
    )
  }

  const toggleCategoryPermissions = (categoryPermissions: Permission[]) => {
    const allSelected = categoryPermissions.every((p) => selectedPermissions.includes(p))

    if (allSelected) {
      // Remove all permissions in this category
      setSelectedPermissions((prev) => prev.filter((p) => !categoryPermissions.includes(p)))
    } else {
      // Add all permissions in this category
      setSelectedPermissions((prev) => {
        const newPermissions = [...prev]
        categoryPermissions.forEach((p) => {
          if (!newPermissions.includes(p)) {
            newPermissions.push(p)
          }
        })
        return newPermissions
      })
    }
  }

  const isCategorySelected = (categoryPermissions: Permission[]) => {
    return categoryPermissions.some((p) => selectedPermissions.includes(p))
  }

  const isAllCategorySelected = (categoryPermissions: Permission[]) => {
    return categoryPermissions.every((p) => selectedPermissions.includes(p))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading permission groups...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Permission Groups</h1>
          <p className="text-muted-foreground">Manage custom permission groups for admin users</p>
        </div>
        {canCreate && (
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Permission Group
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
              <CardTitle>Permission Groups</CardTitle>
              <CardDescription>Define custom sets of permissions for admin users</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search groups..."
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
              <div className="col-span-3">Description</div>
              <div className="col-span-4">Permissions</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {filteredGroups.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No permission groups found</div>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.id} className="grid grid-cols-12 items-center border-b p-3 text-sm last:border-0">
                  <div className="col-span-1 font-mono">{group.id}</div>
                  <div className="col-span-2 font-medium">{group.name}</div>
                  <div className="col-span-3">{group.description}</div>
                  <div className="col-span-4">
                    <div className="flex flex-wrap gap-1">
                      {group.permissions.length > 5 ? (
                        <>
                          {group.permissions.slice(0, 5).map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {getPermissionName(permission)}
                            </Badge>
                          ))}
                          <Badge variant="outline" className="text-xs">
                            +{group.permissions.length - 5} more
                          </Badge>
                        </>
                      ) : (
                        group.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {getPermissionName(permission)}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    {canEdit && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(group)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    )}
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => openDeleteDialog(group)}
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
            Total: <strong>{filteredGroups.length}</strong> permission groups
          </div>
        </CardFooter>
      </Card>

      {/* Add Permission Group Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Permission Group</DialogTitle>
            <DialogDescription>Create a new permission group with specific access rights.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddGroup}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Group Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <div className="border rounded-md p-4 max-h-[400px] overflow-y-auto">
                  <Accordion type="multiple" className="w-full">
                    {Object.entries(PERMISSION_CATEGORIES).map(([key, category]) => (
                      <AccordionItem key={key} value={key}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`category-${key}`}
                              checked={isAllCategorySelected(category.permissions)}
                              onCheckedChange={() => toggleCategoryPermissions(category.permissions)}
                              aria-label={`Select all ${category.name} permissions`}
                              className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                            <span className={isCategorySelected(category.permissions) ? "font-medium" : ""}>
                              {category.name}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-2">
                            {category.permissions.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox
                                  id={permission}
                                  checked={selectedPermissions.includes(permission)}
                                  onCheckedChange={() => togglePermission(permission)}
                                />
                                <label
                                  htmlFor={permission}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {getPermissionName(permission)}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                {selectedPermissions.length === 0 && (
                  <p className="text-sm text-red-500">Please select at least one permission</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={selectedPermissions.length === 0}>
                Create Group
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Permission Group Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Permission Group</DialogTitle>
            <DialogDescription>Update permission group details and access rights.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditGroup}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Group Name</Label>
                <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <div className="border rounded-md p-4 max-h-[400px] overflow-y-auto">
                  <Accordion type="multiple" className="w-full">
                    {Object.entries(PERMISSION_CATEGORIES).map(([key, category]) => (
                      <AccordionItem key={key} value={key}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`edit-category-${key}`}
                              checked={isAllCategorySelected(category.permissions)}
                              onCheckedChange={() => toggleCategoryPermissions(category.permissions)}
                              aria-label={`Select all ${category.name} permissions`}
                            />
                            <span className={isCategorySelected(category.permissions) ? "font-medium" : ""}>
                              {category.name}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-6 space-y-2">
                            {category.permissions.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`edit-${permission}`}
                                  checked={selectedPermissions.includes(permission)}
                                  onCheckedChange={() => togglePermission(permission)}
                                />
                                <label
                                  htmlFor={`edit-${permission}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {getPermissionName(permission)}
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                {selectedPermissions.length === 0 && (
                  <p className="text-sm text-red-500">Please select at least one permission</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={selectedPermissions.length === 0}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Permission Group Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the permission group
              <strong> {selectedGroup?.name}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGroup} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
