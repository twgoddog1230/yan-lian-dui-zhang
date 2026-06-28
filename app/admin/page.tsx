'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ClassPeriod {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  total_weeks: number;
  created_at: string;
}

export default function AdminDashboard() {
  const [classPeriods, setClassPeriods] = useState<ClassPeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    total_weeks: 0,
  });

  useEffect(() => {
    loadClassPeriods();
  }, []);

  async function loadClassPeriods() {
    try {
      const { data, error } = await supabase
        .from('class_periods')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClassPeriods(data || []);
    } catch (error) {
      console.error('Failed to load class periods:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('class_periods')
        .insert([formData]);

      if (error) throw error;

      setFormData({
        name: '',
        start_date: '',
        end_date: '',
        total_weeks: 0,
      });
      setShowForm(false);
      await loadClassPeriods();
    } catch (error) {
      console.error('Failed to create class period:', error);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">大隊長後台</h1>
        <p className="text-gray-600">管理班期、模板和小隊長帳戶</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl font-bold text-blue-600">{classPeriods.length}</div>
          <p className="text-gray-600 mt-2">班期數</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl font-bold text-green-600">0</div>
          <p className="text-gray-600 mt-2">小隊長帳戶</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl font-bold text-purple-600">0</div>
          <p className="text-gray-600 mt-2">活躍戰隊</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">班期管理</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            {showForm ? '取消' : '新增班期'}
          </button>
        </div>

        {showForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    班期名稱
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="例：2026年春季班"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    總週數
                  </label>
                  <input
                    type="number"
                    value={formData.total_weeks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        total_weeks: parseInt(e.target.value),
                      })
                    }
                    required
                    min="1"
                    placeholder="12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    開課日期
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    結業日期
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                建立班期
              </button>
            </form>
          </div>
        )}

        <div className="divide-y">
          {loading ? (
            <div className="p-6 text-center text-gray-600">載入中...</div>
          ) : classPeriods.length === 0 ? (
            <div className="p-6 text-center text-gray-600">尚無班期</div>
          ) : (
            classPeriods.map((period) => (
              <div
                key={period.id}
                className="p-6 hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{period.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {period.start_date} 至 {period.end_date} (共 {period.total_weeks} 週)
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {new Date(period.created_at).toLocaleDateString('zh-TW')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
