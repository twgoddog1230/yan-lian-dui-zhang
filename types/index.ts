// 天賦列表（順時針）
export type TalentType =
  | 'star'
  | 'supporter'
  | 'dealmaker'
  | 'trader'
  | 'accumulator'
  | 'lord'
  | 'mechanic'
  | 'creator';

export const TALENTS: Record<TalentType, string> = {
  star: '明星',
  supporter: '支持者',
  dealmaker: '媒合者',
  trader: '商人',
  accumulator: '積蓄者',
  lord: '地主',
  mechanic: '技師',
  creator: '創作者',
};

export const TALENT_ORDER: TalentType[] = [
  'star',
  'supporter',
  'dealmaker',
  'trader',
  'accumulator',
  'lord',
  'mechanic',
  'creator',
];

// 黃金三角組合
export const GOLDEN_TRIANGLES: Record<TalentType, TalentType[]> = {
  star: ['dealmaker', 'lord'],
  supporter: ['trader', 'mechanic'],
  dealmaker: ['accumulator', 'creator'],
  trader: ['lord', 'star'],
  accumulator: ['mechanic', 'supporter'],
  lord: ['creator', 'dealmaker'],
  mechanic: ['star', 'trader'],
  creator: ['supporter', 'accumulator'],
};

// 用戶角色
export type UserRole = 'admin' | 'team_leader';

// 用戶基本資訊
export interface User {
  id: string;
  email: string;
  role: UserRole;
  team_id?: string;
  created_at: string;
}

// 戰隊信息
export interface Team {
  id: string;
  name: string;
  created_at: string;
  leader_id: string;
  co_leaders?: string[];
  meeting_time?: string;
  meeting_day?: string;
  meeting_location?: string;
}

// 組員信息
export interface Member {
  id: string;
  team_id: string;
  name: string;
  talent: TalentType;
  is_training: boolean; // true=初訓, false=複訓
  occupation?: string;
  notes?: string;
  created_at: string;
}

// 配對記錄
export interface Pairing {
  id: string;
  team_id: string;
  week: number;
  member1_id: string;
  member2_id: string;
  created_at: string;
}

// 班期設定
export interface ClassPeriod {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  total_weeks: number;
  created_at: string;
}

// 會議三角安排
export interface MeetingRole {
  id: string;
  team_id: string;
  week: number;
  chairman_id: string;
  timekeeper_id: string;
  recorder_id: string;
  created_at: string;
}

// 模板
export interface Template {
  id: string;
  team_id: string;
  name: string;
  content: string;
  is_public: boolean;
  created_at: string;
}

// 配對結果
export interface PairingResult {
  pair_id: string;
  member1: Member;
  member2: Member;
  relation_type: 'golden_triangle' | 'similar_talent' | 'same_occupation' | 'none';
}
