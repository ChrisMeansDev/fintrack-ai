'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login'); // redirect to login if no token
    } else {
      setLoading(false); // user is logged in
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // remove JWT
    router.push('/login'); // redirect to login
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h1>
        <p className="mb-6 text-gray-700">You are logged in and can access protected content.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}