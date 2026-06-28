-- 用戶表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'team_leader')),
  team_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 班期表
CREATE TABLE class_periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_weeks INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 戰隊表
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  leader_id UUID NOT NULL REFERENCES users(id),
  class_period_id UUID NOT NULL REFERENCES class_periods(id),
  meeting_day VARCHAR(20),
  meeting_time TIME,
  meeting_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 副隊長表
CREATE TABLE team_co_leaders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id),
  user_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- 組員表
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id),
  name VARCHAR(255) NOT NULL,
  talent VARCHAR(50) NOT NULL CHECK (talent IN ('star', 'supporter', 'dealmaker', 'trader', 'accumulator', 'lord', 'mechanic', 'creator')),
  is_training BOOLEAN NOT NULL DEFAULT true,
  occupation VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 配對歷史表
CREATE TABLE pairings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id),
  week INTEGER NOT NULL,
  member1_id UUID NOT NULL REFERENCES members(id),
  member2_id UUID NOT NULL REFERENCES members(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(team_id, week, member1_id, member2_id)
);

-- 會議三角表
CREATE TABLE meeting_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id),
  week INTEGER NOT NULL,
  chairman_id UUID NOT NULL REFERENCES members(id),
  timekeeper_id UUID NOT NULL REFERENCES members(id),
  recorder_id UUID NOT NULL REFERENCES members(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(team_id, week)
);

-- 模板表
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id),
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 創建索引以提高查詢性能
CREATE INDEX idx_users_team_id ON users(team_id);
CREATE INDEX idx_teams_leader_id ON teams(leader_id);
CREATE INDEX idx_members_team_id ON members(team_id);
CREATE INDEX idx_pairings_team_id ON pairings(team_id);
CREATE INDEX idx_pairings_week ON pairings(team_id, week);
CREATE INDEX idx_meeting_roles_team_id ON meeting_roles(team_id);
CREATE INDEX idx_templates_team_id ON templates(team_id);

-- 創建更新時間戳的觸發器函數
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 為相關表創建觸發器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_roles_updated_at BEFORE UPDATE ON meeting_roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
