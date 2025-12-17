import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Share2, ArrowRight, MessageCircle, Mail, ChevronRight, TrendingUp } from 'lucide-react';
import { dummyData } from '../data/dummyData';
import ReferralModal from '../components/ReferralModal';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useHaptic } from '../hooks/useHaptic';

export default function Dashboard() {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const { userProfile, earnings, onboardingStats, tradedToday, birthdays, allUsers } = dummyData;
  const { trigger: haptic } = useHaptic();

  // Mock data for sparkline
  const sparklineData = [
    { value: 100 }, { value: 120 }, { value: 110 }, { value: 140 }, { value: 130 }, { value: 160 }, { value: 180 }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <ReferralModal 
        isOpen={isReferralModalOpen} 
        onClose={() => setIsReferralModalOpen(false)} 
        partnerId={userProfile.id} 
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Hello, {userProfile.name.split(' ')[0]} 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Here's what's happening with your clients today.</p>
        </div>

        <div className="flex items-center gap-4">
            <button 
                onClick={() => {
                  haptic();
                  setIsReferralModalOpen(true);
                }}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md font-medium shadow-sm hover:bg-red-700 transition-all hover:shadow-md active:scale-95"
            >
            <Share2 className="w-4 h-4" />
            Onboard Users
            </button>
            <div className="h-10 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800">{userProfile.name}</p>
                    <p className="text-xs text-gray-500">{userProfile.id}</p>
                </div>
                <img src={userProfile.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-gray-200 shadow-sm" />
            </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Earnings Hero Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:border-primary/20 transition-colors">
            <div className="flex justify-between items-start mb-4">
                 <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Earnings</h3>
                 <span className="bg-green-50 text-success text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12%
                 </span>
            </div>
            
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">{earnings.total}</span>
            </div>
            
            <div className="h-12 mt-6 mb-2 -mx-2 opacity-60 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData}>
                        <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-gray-100">
                <div>
                    <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">Credited</span>
                    <span className="font-semibold text-sm text-gray-700">{earnings.credited}</span>
                </div>
                <div>
                    <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">Pending</span>
                    <span className="font-semibold text-sm text-gray-700">{earnings.pending}</span>
                </div>
            </div>
        </div>

        {/* 2. Onboarding Funnel */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
            <h3 className="text-lg font-bold text-gray-800 mb-8">Onboarding Pipeline</h3>
            <div className="flex items-center justify-between relative px-4">
                {/* Connecting Line */}
                <div className="absolute top-[14px] left-8 right-8 h-0.5 bg-gray-100 -z-10" />
                
                {[
                    { label: 'KYC Pending', count: onboardingStats.kycPending, color: 'bg-red-500 ring-red-100' },
                    { label: 'Bank Pending', count: onboardingStats.bankPending, color: 'bg-orange-500 ring-orange-100' },
                    { label: 'Deposit', count: onboardingStats.depositPending, color: 'bg-yellow-500 ring-yellow-100' },
                    { label: 'Trade', count: onboardingStats.purchasePending, color: 'bg-blue-500 ring-blue-100' },
                    { label: 'Onboarded', count: onboardingStats.onboarded, color: 'bg-green-500 ring-green-100' },
                ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-default">
                        <div className={clsx(
                            "w-7 h-7 rounded-full mb-3 flex items-center justify-center text-white text-xs font-bold ring-4 ring-offset-2 ring-offset-white transition-all group-hover:scale-110", 
                            step.color
                        )}>
                            {step.count}
                        </div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider group-hover:text-gray-600 transition-colors">{step.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* 3. Traded Today */}
        <div className="md:col-span-2 bg-white rounded-lg border border-gray-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Traded Today</h3>
                <span className="text-[10px] font-bold uppercase tracking-wide bg-green-50 text-success px-2 py-1 rounded border border-green-100 animate-pulse">Live</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 text-gray-500">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">Volume</th>
                            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {tradedToday.map((user) => (
                            <tr key={user.uid} className="hover:bg-gray-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{user.name}</div>
                                            <div className="text-[10px] text-gray-400 font-mono">{user.uid}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-mono font-medium text-gray-700">{user.volume}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/client-view/${user.uid}`} className="text-primary hover:text-red-700 text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Report <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* 4. Birthdays Widget */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Birthdays</h3>
                <span className="bg-pink-50 text-pink-500 p-1.5 rounded-md">
                    <MessageCircle className="w-4 h-4" />
                </span>
            </div>
            <div className="space-y-4">
                {birthdays.map((person, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg border border-gray-100 hover:border-pink-200 transition-colors group">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
                                {person.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{person.name}</p>
                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Today</p>
                            </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a 
                                href={`https://wa.me/${person.phone}?text=Happy Birthday ${person.name}!`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 text-gray-400 hover:text-[#25D366] hover:bg-green-50 rounded transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 5. Client Snapshot (Full Width) */}
        <div className="md:col-span-3 bg-white rounded-lg border border-gray-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
                <Link to="/users" className="text-xs font-bold text-primary hover:text-red-700 uppercase tracking-wide flex items-center gap-1">
                    View All <ChevronRight className="w-3 h-3" />
                </Link>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 text-gray-500">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">Client Name</th>
                            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">UID</th>
                            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider">Last Active</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {allUsers.slice(0, 3).map((user) => (
                            <tr key={user.uid} className="hover:bg-gray-50/80 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{user.uid}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                                        user.checks.onboarded ? "bg-green-50 text-green-700 border border-green-100" : "bg-orange-50 text-orange-700 border border-orange-100"
                                    )}>
                                        <span className={clsx("w-1.5 h-1.5 rounded-full", user.checks.onboarded ? "bg-green-500" : "bg-orange-500")} />
                                        {user.checks.onboarded ? 'Active' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-xs">2 hours ago</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>

      </div>
    </div>
  );
}
