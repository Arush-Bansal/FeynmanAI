# Google Authentication Setup Guide

This guide will help you set up Google OAuth authentication for your Feynman application.

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "Feynman App")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google Identity" and enable it

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: "Feynman"
   - User support email: Your email
   - Developer contact information: Your email
   - Save and continue through the other sections

4. Create OAuth 2.0 Client ID:
   - Application type: "Web application"
   - Name: "Feynman Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://your-domain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-domain.com/api/auth/callback/google` (for production)
   - Click "Create"

5. Copy the Client ID and Client Secret

## Step 4: Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your credentials:
   ```env
   # Gemini AI API Key
   GEMINI_API_KEY=your-gemini-api-key-here

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here

   # Google OAuth Credentials
   GOOGLE_CLIENT_ID=your-google-client-id-here
   GOOGLE_CLIENT_SECRET=your-google-client-secret-here
   ```

3. Generate a secure NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

## Step 5: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
3. Click the "Sign in with Google" button in the navigation
4. You should be redirected to Google's OAuth consent screen
5. After signing in, you'll be redirected back to your app

## Features Implemented

### 1. Google Login Button
- Located in the navigation bar
- Shows user profile when signed in
- Provides sign out functionality

### 2. Protected Routes
- Dashboard page requires authentication
- Unauthenticated users are redirected to sign-in page
- Custom sign-in page with Google OAuth

### 3. Session Management
- Automatic session handling with NextAuth.js
- Persistent login state
- Secure token management

### 4. User Interface
- Loading states during authentication
- User profile display with avatar
- Responsive design matching your app's theme

## File Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   ├── auth/signin/page.tsx             # Custom sign-in page
│   └── dashboard/page.tsx               # Protected dashboard
├── components/
│   ├── GoogleLoginButton.tsx            # Login/logout button
│   ├── ProtectedRoute.tsx               # Route protection component
│   ├── Providers.tsx                    # Session provider
│   └── Navigation.tsx                   # Updated navigation
```

## Security Considerations

1. **Environment Variables**: Never commit your `.env.local` file to version control
2. **HTTPS**: Use HTTPS in production for secure authentication
3. **Domain Verification**: Verify your domain in Google Cloud Console for production
4. **Rate Limiting**: Consider implementing rate limiting for auth endpoints

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**:
   - Ensure your redirect URI exactly matches what's configured in Google Cloud Console
   - Check for trailing slashes or protocol mismatches

2. **"Client ID not found" error**:
   - Verify your GOOGLE_CLIENT_ID is correct
   - Ensure the OAuth consent screen is configured

3. **Session not persisting**:
   - Check that NEXTAUTH_SECRET is set
   - Verify NEXTAUTH_URL matches your domain

### Debug Mode

To enable debug logging, add this to your `.env.local`:
```env
DEBUG=next-auth:*
```

## Production Deployment

1. Update your Google OAuth credentials with production URLs
2. Set NEXTAUTH_URL to your production domain
3. Generate a new NEXTAUTH_SECRET for production
4. Ensure all environment variables are set in your hosting platform

## Additional Features

You can extend this authentication system by:

1. **Adding more providers**: GitHub, Facebook, etc.
2. **Database integration**: Store user data in a database
3. **Role-based access**: Implement different user roles
4. **Profile management**: Allow users to edit their profiles
5. **Email verification**: Add email verification workflows

For more information, visit the [NextAuth.js documentation](https://next-auth.js.org/). 