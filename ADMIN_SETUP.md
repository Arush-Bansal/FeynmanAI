# Admin Setup Guide

This guide explains how to set up and use the admin functionality in the Feynman application.

## Overview

The admin system includes three user roles:
- **User**: Regular application user (default)
- **Admin**: Can manage users and content
- **Super Admin**: Can manage everything, including assigning admin roles

## Database Changes

The User model has been updated with the following new fields:
- `role`: 'user' | 'admin' | 'superadmin' (default: 'user')
- `isActive`: boolean (default: true)

## Setting Up Admin Users

### Method 1: Using the Script

1. Edit `src/features/db/scripts/assignAdmin.ts`
2. Uncomment and add the email addresses of users you want to make admins:

```typescript
const adminEmails: string[] = [
  'admin@example.com',
  'superadmin@example.com',
];
```

3. Run the script:
```bash
npx tsx src/features/db/scripts/assignAdmin.ts
```

### Method 2: Direct Database Update

You can also directly update the database using MongoDB commands:

```javascript
// Connect to your MongoDB database
// Update a user to admin role
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin", isActive: true } }
);

// Update a user to superadmin role
db.users.updateOne(
  { email: "superadmin@example.com" },
  { $set: { role: "superadmin", isActive: true } }
);
```

## Admin Dashboard

Once you have admin users set up, they can access the admin dashboard at `/admin`.

### Features:
- View all users
- Change user roles (admin/superadmin only)
- Activate/deactivate users
- Filter users by role or status

### API Endpoints

- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/users?role=admin` - Get users by role
- `GET /api/admin/users?active=true` - Get only active users
- `PATCH /api/admin/users` - Update user role or status

### Security

- Only authenticated users can access admin endpoints
- Only admin/superadmin users can view the admin dashboard
- Only superadmin users can assign admin/superadmin roles
- Regular admins can only assign user roles

## Usage Examples

### Making a User an Admin
```javascript
// API call
fetch('/api/admin/users', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user_id_here',
    action: 'updateRole',
    role: 'admin'
  })
});
```

### Deactivating a User
```javascript
// API call
fetch('/api/admin/users', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user_id_here',
    action: 'updateStatus',
    isActive: false
  })
});
```

## Utility Functions

The admin utilities (`src/features/db/utils/adminUtils.ts`) provide helper functions:

- `isAdmin(user)` - Check if user is admin or superadmin
- `isSuperAdmin(user)` - Check if user is superadmin
- `isActiveUser(user)` - Check if user is active
- `canManageUsers(user)` - Check if user can manage other users
- `canManageContent(user)` - Check if user can manage content
- `canManageSystem(user)` - Check if user can manage system settings

## Next Steps

1. Set up your first admin user using one of the methods above
2. Access the admin dashboard at `/admin`
3. Use the dashboard to manage other users
4. Consider adding more admin features like content management, analytics, etc. 