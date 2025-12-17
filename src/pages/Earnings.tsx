import { TrendingUp, AlertCircle, Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { dummyData } from '../data/dummyData';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Earnings() {
  const { earnings } = dummyData;
  const { recoverable } = earnings;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Earnings & Recovery</h1>
        <p className="text-gray-500 mt-1">Track your revenue and recover lost opportunities.</p>
      </div>

      {/* Recoverable Revenue Section (The "North Star") */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-yellow-100 flex items-start justify-between">
            <div>
                <div className="flex items-center gap-2 text-yellow-800 font-semibold mb-1">
                    <TrendingUp className="w-5 h-5" />
                    <span>Opportunity</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">₹ {recoverable.totalAmount.toLocaleString()}</h2>
                <p className="text-yellow-700 text-sm mt-1">Recoverable revenue from {recoverable.userCount} users stuck in onboarding.</p>
            </div>
            <div className="p-3 bg-white/50 rounded-lg backdrop-blur-sm">
                 <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Probability Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recoverable.breakdown.map((item, idx) => (
                    <div key={idx} className={clsx(
                        "bg-white p-4 rounded-lg border-l-4 shadow-sm",
                        item.color === 'green' ? 'border-l-green-500' :
                        item.color === 'yellow' ? 'border-l-yellow-500' : 'border-l-red-500'
                    )}>
                        <p className="text-xs font-semibold text-gray-500 uppercase">{item.probability} Probability</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">₹ {item.value.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.count} Users</p>
                    </div>
                ))}
            </div>

            {/* Action List */}
            <div className="bg-white rounded-lg border border-yellow-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-yellow-100/50 border-b border-yellow-100">
                    <h3 className="text-sm font-semibold text-gray-800">Priority Action List</h3>
                </div>
                <div className="divide-y divide-gray-50 max-h-[200px] overflow-y-auto">
                    {recoverable.actionList.map((action, idx) => (
                        <div key={idx} className="p-3 hover:bg-gray-50 flex items-center justify-between group">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{action.name}</p>
                                <p className="text-xs text-red-500 font-medium">Stuck at: {action.stage}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href={`tel:${action.phone}`} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md">
                                    <Phone className="w-4 h-4" />
                                </a>
                                <a href={`https://wa.me/${action.phone}`} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md">
                                    <MessageCircle className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Earnings History Table */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Earnings History</h3>
        </div>
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
                <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Client</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium text-right">Report</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {earnings.history.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{item.client}</td>
                        <td className="px-6 py-4">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{item.type}</span>
                        </td>
                        <td className="px-6 py-4 font-medium text-green-600">{item.amount}</td>
                        <td className="px-6 py-4 text-right">
                             <Link to="/client-view/mock-id" className="text-primary hover:underline text-xs font-medium inline-flex items-center gap-1">
                                View Report <ArrowRight className="w-3 h-3" />
                             </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </section>
    </div>
  );
}
