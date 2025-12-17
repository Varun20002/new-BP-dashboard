import { useState } from 'react';
import { UserPlus, Search, Info, Copy, TrendingUp, Phone, MessageCircle } from 'lucide-react';
import { dummyData } from '../data/dummyData';
import clsx from 'clsx';

// Utility to parse "₹ 1,20,000" -> 120000
const parseCurrency = (str: string) => {
  return parseFloat(str.replace(/[^0-9.]/g, ''));
};

// Utility to format 120000 -> "₹ 1,20,000" (Indian Locale)
const formatCurrency = (num: number) => {
  return '₹ ' + num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
};

export default function Earnings() {
  const { earnings } = dummyData;
  const { stats, recoverable, history } = earnings;
  const [timeFilter, setTimeFilter] = useState('7D');
  const [searchTerm, setSearchTerm] = useState('');

  // Scaling logic for filters
  const getMultiplier = (filter: string) => {
    switch (filter) {
        case 'Today': return 0.05; // 5% of total
        case '7D': return 0.20;    // 20% of total
        case '30D': return 0.50;   // 50% of total
        case '90D': return 0.80;   // 80% of total
        case 'All': default: return 1.0;
    }
  };

  const multiplier = getMultiplier(timeFilter);

  // Calculate dynamic stats
  const dynamicStats = {
    totalUsers: Math.ceil(stats.totalUsers * multiplier),
    spotVolume: formatCurrency(parseCurrency(stats.spotVolume) * multiplier),
    futuresVolume: formatCurrency(parseCurrency(stats.futuresVolume) * multiplier),
    perpsVolume: formatCurrency(parseCurrency(stats.perpsVolume) * multiplier),
    credited: formatCurrency(parseCurrency(earnings.credited) * multiplier),
    pending: formatCurrency(parseCurrency(earnings.pending) * multiplier),
    total: formatCurrency(parseCurrency(earnings.total) * multiplier),
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">

      {/* 1. Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">Partner Statistics</h1>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-[10px] font-bold text-green-700 uppercase tracking-wide">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-[#4F46E5] bg-[#4F46E5]/5 hover:bg-[#4F46E5]/10 border border-[#4F46E5]/10 rounded-lg text-sm font-semibold transition-colors">
            <UserPlus className="w-4 h-4" />
            Refer Partner and Earn 6000
          </button>

          <div className="flex bg-gray-100/80 p-1 rounded-lg">
            {['Today', '7D', '30D', '90D', 'All'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={clsx(
                  "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
                  timeFilter === period
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Metrics Strip */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100">
          {[
            { label: 'SPOT VOLUME', value: dynamicStats.spotVolume },
            { label: 'FUTURES VOLUME', value: dynamicStats.futuresVolume },
            { label: 'US PERPS VOLUME', value: dynamicStats.perpsVolume },
            { label: 'INCOME CREDITED', value: dynamicStats.credited, color: 'text-[#059669]' },
            { label: 'INCOME PENDING', value: dynamicStats.pending, color: 'text-[#D97706]', subLabel: 'YET TO BE CREDITED' },
            { label: 'TOTAL INCOME', value: dynamicStats.total, color: 'text-[#059669]' },
          ].map((stat, idx) => (
             <div key={idx} className="px-4 py-6 flex flex-col items-center text-center group hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-1 mb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                    <Info className="w-3 h-3 text-gray-300 hover:text-gray-500 cursor-help" />
                </div>
                {stat.subLabel && <span className="text-[9px] font-bold text-gray-300 uppercase -mt-2 mb-2 tracking-wide">{stat.subLabel}</span>}
                <div className={clsx("text-lg font-bold tracking-tight", stat.color || "text-gray-900")}>
                    {stat.value}
                </div>
             </div>
          ))}
        </div>
      </div>

       {/* 3. Recoverable Revenue (Secondary) */}
       <div className="bg-gradient-to-r from-orange-50/40 to-yellow-50/40 rounded-xl border border-orange-100/60 p-5 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-orange-200 transition-colors">
          <div className="flex items-center gap-5">
             <div className="p-3 bg-white rounded-xl shadow-sm border border-orange-100">
                <TrendingUp className="w-6 h-6 text-orange-500" />
             </div>
             <div>
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    Revenue Opportunity 
                    <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded-full">ACTION REQUIRED</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                    <span className="text-gray-900 font-bold">₹ {recoverable.totalAmount.toLocaleString()}</span> recoverable from {recoverable.userCount} users stuck in onboarding.
                </p>
             </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
             {recoverable.actionList.slice(0, 2).map((user, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <div>
                        <div className="text-xs font-bold text-gray-900">{user.name}</div>
                        <div className="text-[10px] font-medium text-red-500">{user.stage}</div>
                    </div>
                     <div className="flex gap-1 border-l border-gray-100 pl-3 ml-1">
                         <a href={`tel:${user.phone}`} className="p-1.5 hover:bg-green-50 rounded-md text-gray-400 hover:text-green-600 transition-colors"><Phone className="w-3.5 h-3.5"/></a>
                         <a href={`https://wa.me/${user.phone}`} className="p-1.5 hover:bg-green-50 rounded-md text-gray-400 hover:text-green-600 transition-colors"><MessageCircle className="w-3.5 h-3.5"/></a>
                     </div>
                </div>
             ))}
             <button className="flex-shrink-0 px-4 py-2 text-xs font-bold text-primary hover:bg-red-50 rounded-lg transition-colors">View All &rarr;</button>
          </div>
       </div>

      {/* 4. Transactions Table */}
      <div className="space-y-6 pt-4">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
           <div className="relative w-full md:w-[480px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search by name or UID" 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#4F46E5]/10 focus:border-[#4F46E5] outline-none transition-all placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
           </div>
           
           <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                   <button className="px-4 py-2.5 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
                        PREVIOUS
                   </button>
                   <button className="px-4 py-2.5 text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        NEXT
                   </button>
               </div>
               <button className="flex items-center gap-2 px-6 py-2.5 bg-[#4F46E5] text-white rounded-lg text-sm font-bold hover:bg-[#4338CA] shadow-sm hover:shadow active:scale-95 transition-all">
                    <Copy className="w-4 h-4" />
                    Copy referral link
               </button>
           </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Name / UID</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Order type</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 group">
                                <Info className="w-3 h-3 text-gray-400 group-hover:text-gray-600" /> Volume
                            </div>
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 group">
                                <Info className="w-3 h-3 text-gray-400 group-hover:text-gray-600" /> Earnings
                            </div>
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700 group">
                                <Info className="w-3 h-3 text-gray-400 group-hover:text-gray-600" /> Total Earnings
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {history.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="font-bold text-sm text-gray-900">{row.client}</div>
                                <div className="text-[10px] text-gray-400 font-mono font-medium mt-0.5">{row.uid}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={clsx(
                                    "inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide",
                                    row.type === 'Spot' ? "bg-blue-50 text-blue-700" :
                                    row.type === 'Futures' ? "bg-purple-50 text-purple-700" :
                                    "bg-orange-50 text-orange-700"
                                )}>
                                    {row.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.volume}</td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-bold text-green-600">{row.earnings}</span>
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.totalEarnings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Pagination / Empty State Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-center text-xs text-gray-400 font-medium">
                Showing {history.length} results
            </div>
        </div>
      </div>

    </div>
  );
}
