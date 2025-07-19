"use client"
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black opacity-90"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <Navigation />

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">Profile</h1>
        </div>

        <div className="bg-gray-900/50 border-gray-700 backdrop-blur-sm shadow-2xl rounded-lg p-8">
          <div className="flex items-center gap-6">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            )}
            <div>
              <h2 className="text-3xl font-bold text-white">{session.user?.name}</h2>
              <p className="text-lg text-gray-300">{session.user?.email}</p>
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="mt-4 border-gray-600 text-white hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
