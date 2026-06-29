'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">演練隊長小幫手</h1>
        <p className="text-gray-600 mb-8">協助小隊長快速進行演練配對與會議安排</p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/login?role=admin')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
          >
            大隊長登入
          </button>
          <button
            onClick={() => router.push('/login?role=team_leader')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
          >
            小隊長登入
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-8">程式開發者：老狼</p>
      </div>
    </div>
  );
}
