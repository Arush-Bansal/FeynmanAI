import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  getAllUsers, 
  getUsersByRole, 
  getActiveUsers,
  updateUserRole,
  updateUserStatus,
  deactivateUser,
  activateUser,
  
  getUserByEmail
} from '@/features/db/data/users';
import { isAdmin, isSuperAdmin } from '@/features/db/utils/adminUtils';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the current user to check admin status
    const currentUser = await getUserByEmail(session.user.email);
    
    if (!isAdmin(currentUser)) {
      return NextResponse.json(
        { error: 'Access denied. Admin privileges required.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const activeOnly = searchParams.get('active') === 'true';

    let users;
    if (role) {
      users = await getUsersByRole(role as 'user' | 'admin' | 'superadmin');
    } else if (activeOnly) {
      users = await getActiveUsers();
    } else {
      users = await getAllUsers();
    }

    return NextResponse.json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the current user to check admin status
    const currentUser = await getUserByEmail(session.user.email);
    
    if (!isAdmin(currentUser)) {
      return NextResponse.json(
        { error: 'Access denied. Admin privileges required.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, action, role, isActive } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    let updatedUser;
    
    switch (action) {
      case 'updateRole':
        if (!role) {
          return NextResponse.json(
            { error: 'Role is required for updateRole action' },
            { status: 400 }
          );
        }
        
        // Only superadmin can assign admin/superadmin roles
        if ((role === 'admin' || role === 'superadmin') && !isSuperAdmin(currentUser)) {
          return NextResponse.json(
            { error: 'Only superadmin can assign admin roles' },
            { status: 403 }
          );
        }
        
        updatedUser = await updateUserRole(userId, role);
        break;

      case 'updateStatus':
        if (typeof isActive !== 'boolean') {
          return NextResponse.json(
            { error: 'isActive boolean is required for updateStatus action' },
            { status: 400 }
          );
        }
        updatedUser = await updateUserStatus(userId, isActive);
        break;

      case 'deactivate':
        updatedUser = await deactivateUser(userId);
        break;

      case 'activate':
        updatedUser = await activateUser(userId);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: updateRole, updateStatus, deactivate, activate' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
} 