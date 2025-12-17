import { useState } from 'react';
import { Search, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyData } from '../data/dummyData';
import clsx from 'clsx';

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { allUsers } = dummyData;

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.holdings?.some(holding => 
      holding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const StatusIcon = ({ checked }: { checked: boolean }) => (
    checked 
      ? <CheckCircle2 className="w-5 h-5 text-green-500" /> 
      : <XCircle className="w-5 h-5 text-red-400" />
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
        <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search by Name, UID, Phone, Coin..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                    <th className="px-6 py-4 w-[20%] font-medium uppercase text-xs tracking-wider">Client</th>
                    <th className="px-6 py-4 w-[15%] font-medium uppercase text-xs tracking-wider">Contact</th>
                    <th className="px-6 py-4 w-[15%] font-medium uppercase text-xs tracking-wider">Holdings</th>
                    <th className="px-4 py-4 w-[8%] font-medium text-center uppercase text-xs tracking-wider">Sign Up</th>
                    <th className="px-4 py-4 w-[8%] font-medium text-center uppercase text-xs tracking-wider">KYC</th>
                    <th className="px-4 py-4 w-[8%] font-medium text-center uppercase text-xs tracking-wider">Bank</th>
                    <th className="px-4 py-4 w-[10%] font-medium text-center uppercase text-xs tracking-wider">1st Deposit</th>
                    <th className="px-6 py-4 w-[10%] font-medium uppercase text-xs tracking-wider">Status</th>
                    <th className="px-6 py-4 w-[6%] font-medium text-right uppercase text-xs tracking-wider">Report</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                    <tr 
                        key={user.uid} 
                        onClick={() => navigate(`/client-view/${user.uid}`)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                        <td className="px-6 py-4 align-middle">
                            <div className="font-bold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500 font-mono">{user.uid}</div>
                        </td>
                        <td className="px-6 py-4 align-middle">
                            <div className="font-mono text-gray-600 text-xs">{user.phone}</div>
                        </td>
                        <td className="px-6 py-4 align-middle">
                            <div className="flex flex-wrap gap-1">
                                {user.holdings?.slice(0, 3).map((holding, idx) => (
                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                                        {holding.symbol}
                                    </span>
                                ))}
                                {(user.holdings?.length || 0) > 3 && (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-400">
                                        +{user.holdings!.length - 3}
                                    </span>
                                )}
                                {!user.holdings?.length && <span className="text-gray-300 text-xs">-</span>}
                            </div>
                        </td>
                        <td className="px-4 py-4 text-center align-middle"><div className="flex justify-center"><StatusIcon checked={user.checks.signup} /></div></td>
                        <td className="px-4 py-4 text-center align-middle"><div className="flex justify-center"><StatusIcon checked={user.checks.kyc} /></div></td>
                        <td className="px-4 py-4 text-center align-middle"><div className="flex justify-center"><StatusIcon checked={user.checks.bank} /></div></td>
                        <td className="px-4 py-4 text-center align-middle"><div className="flex justify-center"><StatusIcon checked={user.checks.deposit} /></div></td>
                        <td className="px-6 py-4 align-middle">
                             <span className={clsx(
                                "inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                                user.checks.onboarded 
                                    ? "bg-green-50 text-green-700 border-green-100" 
                                    : "bg-orange-50 text-orange-700 border-orange-100"
                            )}>
                                {user.checks.onboarded ? 'Onboarded' : 'Pending'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right align-middle">
                             <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors inline-block" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {filteredUsers.length === 0 && (
            <div className="p-12 text-center text-gray-500">
                No users found matching "{searchTerm}"
            </div>
        )}
      </div>
    </div>
  );
}
