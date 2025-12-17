import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Wallet } from 'lucide-react';

export default function ClientView() {
  const { id } = useParams();

  return (
    <div className="p-8 max-w-7xl mx-auto">
        <Link to="/users" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Users
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Client Portfolio: {id}</h1>
            <p className="text-gray-500 mt-2">This is a static mock of the client's individual dashboard.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm mb-4">
                            <Wallet className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                        <div className="h-8 w-32 bg-gray-300 rounded" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
