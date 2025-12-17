import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function Terminal() {
  const data = Array.from({ length: 50 }, () => ({ value: Math.random() * 100 + 50 }));

  return (
    <div className="p-8 h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-2xl h-64 mb-8 opacity-20">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={2} dot={false} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Trading Terminal</h1>
        <p className="text-gray-500 mt-2 max-w-md">Advanced charting and order execution tools are coming soon for our partners.</p>
        <button disabled className="mt-6 px-6 py-3 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed">
            Coming Soon
        </button>
    </div>
  );
}
