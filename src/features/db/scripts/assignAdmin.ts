import dbConnect from '../dbConnect';
import { getUserByEmail, updateUserRole } from '../data/users';

const assignAdminRole = async (email: string, role: 'admin' | 'superadmin' = 'admin') => {
  try {
    await dbConnect();
    
    const user = await getUserByEmail(email);
    if (!user) {
      console.error(`User with email ${email} not found`);
      return;
    }

    await updateUserRole(user._id.toString(), role);
    console.log(`Successfully assigned ${role} role to ${email}`);
  } catch (error) {
    console.error('Error assigning admin role:', error);
  }
};

// Example usage - you can call this function with specific email addresses
const setupAdmins = async () => {
  // Add the email addresses of users you want to make admins
  const adminEmails: string[] = [
    // 'admin@example.com', // Uncomment and add actual admin emails
    // 'superadmin@example.com', // Uncomment and add actual superadmin emails
  ];

  for (const email of adminEmails) {
    await assignAdminRole(email, 'admin');
  }

  // For superadmin, use:
  // await assignAdminRole('superadmin@example.com', 'superadmin');
};

// Run the setup if this file is executed directly
if (require.main === module) {
  setupAdmins()
    .then(() => {
      console.log('Admin setup completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Admin setup failed:', error);
      process.exit(1);
    });
}

export { assignAdminRole, setupAdmins }; 