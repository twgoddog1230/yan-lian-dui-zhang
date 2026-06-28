'use client';

import { useState } from 'react';

export default function TemplatePage() {
  const [templateText, setTemplateText] = useState(`【第X週演練配對】
主題：天賦在生活中的影響
📅 時間：X月X日-X月X日

大家好！以下是本週演練配對：

1️⃣ 小李(複訓) ↔ 小陳(初訓)
2️⃣ 小王(複訓) ↔ 小張(初訓)
...

💝 溫馨提醒：
這週我們特別關注天賦在日常生活中的影響。
彼此分享會讓討論更深入喔！

😊 感謝大家的配合～`);

  const publicTemplates = [
    {
      name: '溫馨提醒型',
      description: '強調課程連結的溫暖風格',
      content: `【第X週演練配對】
主題：天賦在生活中的影響
📅 時間：X月X日-X月X日

大家好！以下是本週演練配對：

[配對列表]

💝 溫馨提醒：
這週我們特別關注天賦在日常生活中的影響。
彼此分享會讓討論更深入喔！

😊 感謝大家的配合～`,
    },
    {
      name: '邀請互動型',
      description: '鼓勵積極參與的邀請風格',
      content: `【第X週演練配對】
主題：天賦在生活中的影響
📅 時間：X月X日-X月X日

大家好！以下是本週演練配對：

[配對列表]

🎯 期待每位夥伴都能積極分享，
一起感受天賦的力量！

感謝大家的參與～`,
    },
    {
      name: '感謝祝福型',
      description: '鼓舞士氣和感謝的溫馨風格',
      content: `【第X週演練配對】
主題：天賦在生活中的影響
📅 時間：X月X日-X月X日

親愛的夥伴們！以下是本週演練配對：

[配對列表]

感謝大家積極參與演練，
期待看到彼此的成長！

祝福大家～💪`,
    },
  ];

  function handleCopyTemplate(text: string) {
    navigator.clipboard.writeText(text);
    alert('已複製到剪貼板！');
  }

  function handleUseTemplate(content: string) {
    setTemplateText(content);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">模板管理</h1>
        <p className="text-gray-600 mt-2">管理和複製 LINE 接龍模板</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">編輯模板</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                模板內容
              </label>
              <textarea
                value={templateText}
                onChange={(e) => setTemplateText(e.target.value)}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleCopyTemplate(templateText)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                📋 複製到剪貼板
              </button>
              <button
                onClick={() => setTemplateText('')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                🗑️ 清空
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">公版範例</h3>
            <div className="space-y-3">
              {publicTemplates.map((template, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {template.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleUseTemplate(template.content)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded"
                    >
                      使用
                    </button>
                    <button
                      onClick={() => handleCopyTemplate(template.content)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold py-1 px-2 rounded"
                    >
                      複製
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-bold text-amber-900 text-sm mb-2">💡 提示</h4>
            <p className="text-xs text-amber-800">
              使用 [配對列表] 作為佔位符，系統會自動替換為實際的配對結果。
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-3">📝 模板變數說明</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>• <code className="bg-gray-100 px-1 rounded">[配對列表]</code> - 自動插入演練配對結果</p>
          <p>• <code className="bg-gray-100 px-1 rounded">[周次]</code> - 當週週次</p>
          <p>• <code className="bg-gray-100 px-1 rounded">[主題]</code> - 演練主題</p>
          <p>• <code className="bg-gray-100 px-1 rounded">[日期範圍]</code> - 演練日期範圍</p>
        </div>
      </div>
    </div>
  );
}
