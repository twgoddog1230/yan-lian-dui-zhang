'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TALENTS, TALENT_ORDER } from '@/types';
import type { Member, TalentType } from '@/types';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [teamId, setTeamId] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    talent: 'star' as TalentType,
    is_training: true,
    occupation: '',
    notes: '',
  });

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      // TODO: 从认证上下文获取 teamId
      const dummyTeamId = 'dummy-team-id';
      setTeamId(dummyTeamId);

      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('team_id', dummyTeamId);

      if (error && error.code !== 'PGRST116') throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Failed to load members:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!teamId) {
      console.error('Team ID not available');
      return;
    }

    try {
      const { error } = await supabase.from('members').insert([
        {
          team_id: teamId,
          ...formData,
        },
      ]);

      if (error) throw error;

      setFormData({
        name: '',
        talent: 'star',
        is_training: true,
        occupation: '',
        notes: '',
      });
      setShowForm(false);
      await loadMembers();
    } catch (error) {
      console.error('Failed to create member:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('確定要刪除此組員嗎？')) return;

    try {
      const { error } = await supabase.from('members').delete().eq('id', id);

      if (error) throw error;
      await loadMembers();
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">組員管理</h1>
          <p className="text-gray-600 mt-2">管理戰隊的組員資料</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? '取消' : '新增組員'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">新增組員</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="輸入組員姓名"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  天賦 *
                </label>
                <select
                  value={formData.talent}
                  onChange={(e) =>
                    setFormData({ ...formData, talent: e.target.value as TalentType })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {TALENT_ORDER.map((talent) => (
                    <option key={talent} value={talent}>
                      {TALENTS[talent]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  身份 *
                </label>
                <select
                  value={formData.is_training ? '1' : '0'}
                  onChange={(e) =>
                    setFormData({ ...formData, is_training: e.target.value === '1' })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="1">初訓生 🆕</option>
                  <option value="0">複訓生 🔄</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  職業
                </label>
                <input
                  type="text"
                  value={formData.occupation || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, occupation: e.target.value })
                  }
                  placeholder="例：律師、工程師"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                備考
              </label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="任何其他備註"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              新增組員
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-600">載入中...</div>
        ) : members.length === 0 ? (
          <div className="p-6 text-center text-gray-600">尚無組員</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    姓名
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    天賦
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    身份
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    職業
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {TALENTS[member.talent]}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          member.is_training
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {member.is_training ? '初訓 🆕' : '複訓 🔄'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {member.occupation || '-'}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
