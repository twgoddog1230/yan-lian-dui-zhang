'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Team, Member } from '@/types';

export default function MeetingPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [meetingDay, setMeetingDay] = useState('friday');
  const [meetingTime, setMeetingTime] = useState('10:00');
  const [meetingLocation, setMeetingLocation] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const days = [
    { value: 'monday', label: '星期一' },
    { value: 'tuesday', label: '星期二' },
    { value: 'wednesday', label: '星期三' },
    { value: 'thursday', label: '星期四' },
    { value: 'friday', label: '星期五' },
    { value: 'saturday', label: '星期六' },
    { value: 'sunday', label: '星期日' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // TODO: 從認證上下文獲取 teamId
      const dummyTeamId = 'dummy-team-id';

      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .select('*')
        .eq('id', dummyTeamId)
        .single();

      if (teamError && teamError.code !== 'PGRST116') throw teamError;

      if (teamData) {
        setTeam(teamData);
        setMeetingDay(teamData.meeting_day || 'friday');
        setMeetingTime(teamData.meeting_time || '10:00');
        setMeetingLocation(teamData.meeting_location || '');
      }

      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('*')
        .eq('team_id', dummyTeamId);

      if (membersError && membersError.code !== 'PGRST116') throw membersError;
      setMembers(membersData || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings() {
    if (!team) return;

    try {
      const { error } = await supabase
        .from('teams')
        .update({
          meeting_day: meetingDay,
          meeting_time: meetingTime,
          meeting_location: meetingLocation,
        })
        .eq('id', team.id);

      if (error) throw error;

      setSavedMessage('設定已保存！');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  if (loading) {
    return <div className="text-center py-8">載入中...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">會議設定</h1>
        <p className="text-gray-600 mt-2">設定每週會議時間和地點</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">會議時間設定</h2>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                會議日期
              </label>
              <select
                value={meetingDay}
                onChange={(e) => setMeetingDay(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                {days.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                會議時間
              </label>
              <input
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              會議地點/方式
            </label>
            <input
              type="text"
              value={meetingLocation}
              onChange={(e) => setMeetingLocation(e.target.value)}
              placeholder="例：Zoom會議、實體會議室"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {savedMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
            {savedMessage}
          </div>
        )}

        <button
          onClick={handleSaveSettings}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          💾 保存設定
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">會議三角配置</h2>
        <p className="text-gray-600 mb-4">
          主席、計時官、紀錄官的配置將在「演練配對」頁面進行管理
        </p>
        <a
          href="/dashboard/pairing"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          前往配對頁面 →
        </a>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-2">📅 會議時間參考</h3>
        <p className="text-sm text-blue-800">
          當前設定：
          <strong className="ml-2">
            {days.find((d) => d.value === meetingDay)?.label} {meetingTime}
            {meetingLocation && ` @ ${meetingLocation}`}
          </strong>
        </p>
      </div>
    </div>
  );
}
