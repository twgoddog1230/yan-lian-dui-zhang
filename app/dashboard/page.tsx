'use client';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">👋 歡迎，小隊長</h1>
        <p className="text-gray-600">在這裡管理您的戰隊、組員和演練配對</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <a
          href="/dashboard/members"
          className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-3xl mb-2">👥</div>
          <h3 className="font-bold text-gray-900">組員管理</h3>
          <p className="text-sm text-gray-600 mt-2">新增、編輯組員資料</p>
        </a>

        <a
          href="/dashboard/pairing"
          className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-bold text-gray-900">演練配對</h3>
          <p className="text-sm text-gray-600 mt-2">自動排序及手動調整</p>
        </a>

        <a
          href="/dashboard/meeting"
          className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-3xl mb-2">📅</div>
          <h3 className="font-bold text-gray-900">會議設定</h3>
          <p className="text-sm text-gray-600 mt-2">會議時間及三角配置</p>
        </a>

        <a
          href="/dashboard/template"
          className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-3xl mb-2">📋</div>
          <h3 className="font-bold text-gray-900">模板管理</h3>
          <p className="text-sm text-gray-600 mt-2">複製及編輯 LINE 模板</p>
        </a>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">快速說明</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>✅ <strong>天賦系統：</strong>支持 8 種羅傑漢彌頓天賦原動力系統</p>
          <p>✅ <strong>智能配對：</strong>基於 5 層優先級的自動配對演算法</p>
          <p>✅ <strong>黃金三角：</strong>自動檢測黃金三角組合以優化配對</p>
          <p>✅ <strong>避免重複：</strong>確保除非所有人都輪過，否則不重複配對</p>
          <p>✅ <strong>一鍵模板：</strong>自動生成 LINE 接龍文案，支持完全自訂</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-12">
        <p>程式開發者：老狼</p>
      </div>
    </div>
  );
}
