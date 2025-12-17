import { useParams, Link } from 'react-router-dom';
import { dummyData } from '../data/dummyData';
import { 
  History, FileText, Wallet, BarChart3, ArrowLeftRight, Download, 
  ChevronLeft, AlertTriangle, TrendingUp 
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function ClientView() {
  const { id } = useParams();
  const user = dummyData.allUsers.find(u => u.uid === id);
  const [activeSection, setActiveSection] = useState('Portfolio History');
  const [activeTab, setActiveTab] = useState('Deposits'); // For Portfolio History only

  if (!user) return <div className="p-8">User not found</div>;

  const sidebarItems = [
    { name: 'Portfolio History', icon: History },
    { name: 'Order History', icon: FileText },
    { name: 'Margin History', icon: Wallet },
    { name: 'Futures Orders', icon: BarChart3 },
    { name: 'Futures Positions', icon: BarChart3 },
    { name: 'Futures Trades', icon: BarChart3 },
    { name: 'Insta History', icon: ArrowLeftRight },
    { name: 'Conversion', icon: ArrowLeftRight },
    { name: 'TDS Summary', icon: Download },
  ];

  // Helper to render the correct table based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'Portfolio History':
        const history = (user.portfolioHistory || []).filter(item => 
            activeTab === 'Deposits' ? item.action === 'Deposit' : item.action === 'Withdrawal'
        );
        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[400px]">
                <div className="flex items-center gap-8 border-b border-gray-200 px-6 mb-0">
                    {['Deposits', 'Withdrawals'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "py-4 text-xs font-bold uppercase tracking-wider transition-all relative",
                                activeTab === tab ? "text-orange-600" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {tab}
                            {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-t-full" />}
                        </button>
                    ))}
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Token</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {history.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.token}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">{row.quantity}</td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-500">{row.date}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase", row.status === 'Completed' ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700")}>{row.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {history.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No records found.</div>}
            </div>
        );

      case 'Order History':
        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[400px] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pair</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(user.orderHistory || []).map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.pair}</td>
                                <td className="px-6 py-4"><span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase", row.type === 'Buy' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>{row.type}</span></td>
                                <td className="px-6 py-4 text-sm font-mono text-gray-700">{row.price}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{row.amount}</td>
                                <td className="px-6 py-4"><span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase">{row.status}</span></td>
                                <td className="px-6 py-4 text-xs text-gray-500">{row.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(user.orderHistory || []).length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No records found.</div>}
            </div>
        );
        
      case 'Futures Positions':
        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[400px] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Symbol</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Side / Lev</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Entry Price</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mark Price</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">PNL (ROE)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(user.futuresPositions || []).map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.symbol}</td>
                                <td className="px-6 py-4 text-xs font-bold"><span className={row.side === 'Long' ? "text-green-600" : "text-red-600"}>{row.side}</span> <span className="text-gray-400 mx-1">|</span> {row.leverage}</td>
                                <td className="px-6 py-4 text-sm font-mono text-gray-700">{row.entryPrice}</td>
                                <td className="px-6 py-4 text-sm font-mono text-gray-700">{row.markPrice}</td>
                                <td className="px-6 py-4 text-sm font-mono font-bold">
                                    <span className={row.pnl.includes('+') ? "text-green-600" : "text-red-600"}>{row.pnl}</span>
                                    <span className="text-xs text-gray-400 ml-2">({row.roe})</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(user.futuresPositions || []).length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No records found.</div>}
            </div>
        );

      case 'TDS Summary':
         return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[400px] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Trade Value</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">TDS (1%)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(user.tdsSummary || []).map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-xs font-medium text-gray-500">{row.date}</td>
                                <td className="px-6 py-4 text-xs font-mono text-gray-900">{row.orderId}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">{row.tradeValue}</td>
                                <td className="px-6 py-4 text-sm font-bold text-red-600">{row.tdsDeducted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(user.tdsSummary || []).length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No records found.</div>}
            </div>
         );

      default:
        return <div className="p-12 text-center text-gray-400 italic bg-white rounded-lg border border-gray-200 min-h-[400px] flex items-center justify-center">Mock data for {activeSection} not yet implemented.</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9F9F9] overflow-hidden">
      
      {/* 1. Top Warning Banner */}
      <div className="bg-orange-50 border-b border-orange-100 px-6 py-2 flex items-center justify-center gap-2 text-xs font-medium text-orange-800">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>View Only Mode: You are viewing client data. Actions such as trading or withdrawing are disabled.</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-gray-100">
                <Link to="/users" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wide transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back to Users
                </Link>
            </div>
            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
                {sidebarItems.map((item) => (
                    <button 
                        key={item.name}
                        onClick={() => setActiveSection(item.name)}
                        className={clsx(
                            "w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-lg transition-all tracking-wide text-left",
                            activeSection === item.name 
                                ? "text-orange-600 bg-orange-50 border-r-2 border-orange-600 rounded-r-none" 
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        )}
                    >
                        <item.icon className={clsx("w-4 h-4", activeSection === item.name ? "text-orange-500" : "text-gray-400")} />
                        {item.name}
                    </button>
                ))}
            </nav>
        </div>

        {/* 3. Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{activeSection}</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500">Client:</span>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
                                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="text-xs font-bold text-gray-900">{user.name}</span>
                                <span className="text-[10px] text-gray-400 font-mono">({user.uid})</span>
                            </div>
                        </div>
                    </div>

                    {/* Wallet Card */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm min-w-[240px]">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Portfolio Value</p>
                        <div className="text-2xl font-bold text-gray-900 tracking-tight">{user.walletBalance || '₹ 0.00'}</div>
                        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-green-600 bg-green-50 w-fit px-1.5 py-0.5 rounded">
                            <TrendingUp className="w-3 h-3" /> +2.4% Today
                        </div>
                    </div>
                </div>

                {/* Dynamic Content */}
                {renderContent()}

            </div>
        </div>
      </div>
    </div>
  );
}
