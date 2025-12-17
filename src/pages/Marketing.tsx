import { Share2, Download } from 'lucide-react';

export default function Marketing() {
  const templates = [
    { title: "Market Crash Alert", color: "bg-red-100" },
    { title: "Diwali Offer", color: "bg-orange-100" },
    { title: "New Listing: BTC", color: "bg-yellow-100" },
    { title: "Refer & Earn", color: "bg-green-100" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Marketing Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image Placeholder */}
                <div className={`h-48 w-full ${template.color} flex items-center justify-center`}>
                    <span className="text-gray-500 font-medium">{template.title} Image</span>
                </div>
                
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">{template.title}</h3>
                    <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" />
                            Save
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
