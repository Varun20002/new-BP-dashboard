import { useState } from 'react';
import { Copy, Upload, Share2, Send, CheckCircle2, FileText } from 'lucide-react';
import Modal from './ui/Modal';
import clsx from 'clsx';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerId: string;
}

type Tab = 'direct' | 'assisted' | 'bulk';

export default function ReferralModal({ isOpen, onClose, partnerId }: ReferralModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('direct');
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const referralLink = `coindcx.com/ref/${partnerId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
        setSent(false);
        onClose();
    }, 2000);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'text/csv' || droppedFile?.name.endsWith('.csv')) {
      setFile(droppedFile);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Referral Link">
      {/* Tabs */}
      <div className="flex border-b border-gray-100 mb-6">
        {[
            { id: 'direct', label: 'Direct Link' },
            { id: 'assisted', label: 'Assisted Onboarding' },
            { id: 'bulk', label: 'Bulk Upload' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={clsx(
              "flex-1 pb-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {activeTab === 'direct' && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <code className="text-sm text-gray-700 font-mono">{referralLink}</code>
              <button
                onClick={handleCopy}
                className="text-sm font-medium text-primary hover:text-red-700 flex items-center gap-2"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors">
                    <Share2 className="w-5 h-5" />
                    WhatsApp
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    <Share2 className="w-5 h-5" />
                    Other
                </button>
            </div>
          </div>
        )}

        {activeTab === 'assisted' && (
          <form onSubmit={handleMagicLink} className="space-y-4">
             {!sent ? (
                <>
                    <div className="space-y-4">
                        <input required placeholder="Client Name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                        <input required type="tel" placeholder="Phone Number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                        <input required type="email" placeholder="Email Address" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                        <input placeholder="PAN Number (Optional)" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                        <Send className="w-4 h-4" />
                        Generate & Send Magic Link
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                        This will send an SMS to the client. They only need to do E-Sign & Selfie.
                    </p>
                </>
             ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-center animate-in fade-in zoom-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Magic Link Sent!</h4>
                    <p className="text-gray-500 mt-2">The client has received the SMS to start onboarding.</p>
                </div>
             )}
          </form>
        )}

        {activeTab === 'bulk' && (
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-primary/50 transition-colors cursor-pointer h-[300px]"
          >
            {file ? (
                <div className="flex flex-col items-center">
                    <FileText className="w-12 h-12 text-primary mb-4" />
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                    <button onClick={() => setFile(null)} className="mt-4 text-red-600 text-sm font-medium hover:underline">Remove</button>
                </div>
            ) : (
                <>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-gray-900 font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-1">CSV file with Name and Phone Number columns</p>
                    <input type="file" accept=".csv" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

