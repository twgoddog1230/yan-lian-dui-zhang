import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '大隊長後台 - 演練隊長小幫手',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">大隊長後台</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">演練隊長小幫手</span>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
