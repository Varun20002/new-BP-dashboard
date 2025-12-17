import { LayoutDashboard, Users, Wallet, TrendingUp, Terminal, CircleHelp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'All Users', path: '/users', icon: Users },
    { name: 'Earnings', path: '/earnings', icon: Wallet },
    { name: 'Marketing', path: '/marketing', icon: TrendingUp },
    { name: 'Terminal', path: '/terminal', icon: Terminal },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] z-20">
      <div className="h-16 flex items-center px-8 border-b border-gray-100">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-black">Coin</span>
          <span className="text-[#D32F2F]">DCX</span>
        </span>
        <span className="ml-2 text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">Partner</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-red-50 text-primary'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              )
            }
          >
            <item.icon className="w-[18px] h-[18px]" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
          <CircleHelp className="w-[18px] h-[18px]" />
          Help & Support
        </button>
      </div>
    </div>
  );
}
