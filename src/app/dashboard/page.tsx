// src/app/dashboard/page.tsx
"use client";

import Chatbot from "@/components/Chatbot";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to your FinTrack dashboard. Track your finances and interact with your AI assistant here.
        </p>
      </header>

      {/* Main Dashboard Cards */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Account Overview</h2>
          <p className="text-gray-700">View your current balance, recent transactions, and account health.</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Investments</h2>
          <p className="text-gray-700">Monitor your portfolio, market trends, and investment performance.</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Budget Tracker</h2>
          <p className="text-gray-700">Set budgets, track expenses, and see your spending habits over time.</p>
        </div>
      </main>

      {/* Optional Additional Section */}
      <section className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>No pending alerts</li>
          <li>All accounts are in good standing</li>
        </ul>
      </section>

      {/* Chatbot Window */}
      <Chatbot />
    </div>
  );
}