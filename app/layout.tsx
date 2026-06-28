import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '演練隊長小幫手',
  description: '演練隊長小幫手 - 協助小隊長快速進行演練配對與會議安排',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
        <footer className="py-4 text-center text-sm text-gray-600 bg-white border-t">
          <p>程式開發者：老狼</p>
        </footer>
      </body>
    </html>
  );
}
