'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { generateAutoPairings, getPairingRelationType } from '@/lib/pairingUtils';
import { TALENTS } from '@/types';
import type { Member, PairingResult } from '@/types';

export default function PairingPage() {
  const [week, setWeek] = useState(1);
  const [theme, setTheme] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [pairings, setPairings] = useState<Array<[Member, Member]>>([]);
  const [pairingHistory, setPairingHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [teamId, setTeamId] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // TODO: 从认证上下文获取 teamId
      const dummyTeamId = 'dummy-team-id';
      setTeamId(dummyTeamId);

      // 加载组员
      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('*')
        .eq('team_id', dummyTeamId);

      if (membersError && membersError.code !== 'PGRST116') throw membersError;
      setMembers(membersData || []);

      // 加载配对历史
      const { data: pairingsData, error: pairingsError } = await supabase
        .from('pairings')
        .select('*')
        .eq('team_id', dummyTeamId);

      if (pairingsError && pairingsError.code !== 'PGRST116') throw pairingsError;
      setPairingHistory(pairingsData || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAutoSort() {
    if (members.length < 2) {
      alert('至少需要 2 位組員');
      return;
    }

    const result = generateAutoPairings(members, pairingHistory);
    setPairings(result);
    setShowResults(true);
  }

  async function handleSavePairings() {
    if (!teamId || pairings.length === 0) return;

    try {
      const pairingRecords = pairings.map(([member1, member2]) => ({
        team_id: teamId,
        week,
        member1_id: member1.id,
        member2_id: member2.id,
      }));

      const { error } = await supabase
        .from('pairings')
        .insert(pairingRecords);

      if (error) throw error;

      alert('配對已保存！');
      setPairings([]);
      setShowResults(false);
      await loadData();
    } catch (error) {
      console.error('Failed to save pairings:', error);
      alert('保存失敗');
    }
  }

  if (loading) {
    return <div className="text-center py-8">載入中...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">演練配對</h1>
        <p className="text-gray-600 mt-2">第 {week} 週演練配對安排</p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  週次
                </label>
                <select
                  value={week}
                  onChange={(e) => setWeek(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => (
                    <option key={w} value={w}>
                      第 {w} 週
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  演練主題
                </label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="例：天賦在生活中的影響"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  日期範圍
                </label>
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="例：6/29-7/5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>組員統計：</strong> 共 {members.length} 人 (初訓：
                {members.filter((m) => m.is_training).length}, 複訓：
                {members.filter((m) => !m.is_training).length})
              </p>
            </div>
          </div>

          <button
            onClick={handleAutoSort}
            disabled={members.length < 2}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
          >
            🤖 一鍵自動排序
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-green-200 bg-green-50 p-6">
            <h2 className="text-lg font-bold text-green-900 mb-4">✅ 配對完成</h2>
            <div className="space-y-3">
              {pairings.map((pair, idx) => {
                const [member1, member2] = pair;
                const relationType = getPairingRelationType(
                  member1.talent,
                  member2.talent,
                  member1.occupation,
                  member2.occupation,
                );
                const relationLabel =
                  relationType === 'golden_triangle'
                    ? '🔺 黃金三角'
                    : relationType === 'similar_talent'
                      ? '○ 相似天賦'
                      : relationType === 'same_occupation'
                        ? '💼 職業互補'
                        : '';

                return (
                  <div key={idx} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="font-bold text-indigo-600">{idx + 1}️⃣</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {member1.name}
                          <span className="text-xs text-gray-600 ml-2">
                            ({member1.is_training ? '🆕' : '🔄'} {TALENTS[member1.talent]})
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 ml-4">
                          ↔ {member2.name}
                          <span className="text-xs text-gray-600 ml-2">
                            ({member2.is_training ? '🆕' : '🔄'} {TALENTS[member2.talent]})
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-purple-600">
                      {relationLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowResults(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              ← 返回重新排序
            </button>
            <button
              onClick={handleSavePairings}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg"
            >
              ✅ 確認保存配對
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
