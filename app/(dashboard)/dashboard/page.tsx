'use client';

import { useSession } from 'next-auth/react';
import { ProtectedRoute } from "@/app/components/auth/ProtectedRoute";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <main className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to DevHub, {session?.user?.name}!
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {session?.user?.name}</p>
                <p><strong>Email:</strong> {session?.user?.email}</p>
                {session?.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full bg-primary-pink text-white py-2 px-4 rounded hover:bg-primary-green transition-colors">
                  Create Project
                </button>
                <button className="w-full bg-primary-blue text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                  Write Post
                </button>
                <button className="w-full bg-primary-green text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                  Find Developers
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity yet.</p>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 