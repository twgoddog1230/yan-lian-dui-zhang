# 數據庫設置指南

## 前置要求
- Supabase 帳戶
- 創建一個新的 Supabase 項目

## 設置步驟

### 1. 在 Supabase 中創建數據庫

1. 登入 [Supabase](https://supabase.com)
2. 創建一個新項目
3. 等待項目初始化完成
4. 複製項目的 URL 和 anon key

### 2. 運行 SQL 初始化腳本

1. 在 Supabase 儀表板中，進入 **SQL Editor**
2. 點擊 **New Query**
3. 複製 `lib/database.sql` 的全部內容
4. 粘貼到編輯器中
5. 點擊 **Run** 執行腳本

### 3. 配置環境變數

1. 在項目根目錄創建 `.env.local` 文件
2. 添加以下內容：

```
NEXT_PUBLIC_SUPABASE_URL=你的_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=你的_SERVICE_ROLE_KEY
```

3. 替換為您的 Supabase 項目信息

### 4. 初始化班期資料（可選）

運行以下 SQL 來創建初始班期：

```sql
INSERT INTO class_periods (name, start_date, end_date, total_weeks)
VALUES 
  ('2026年春季班', '2026-04-01', '2026-07-09', 12),
  ('2026年秋季班', '2026-09-01', '2026-11-30', 12);
```

## 表結構說明

### users (用戶表)
- 存儲大隊長和小隊長帳戶
- role: 'admin'（大隊長） 或 'team_leader'（小隊長）

### teams (戰隊表)
- 存儲各個戰隊的基本信息
- leader_id: 指向主要隊長

### members (組員表)
- 存儲戰隊的組員信息
- talent: 8種天賦之一

### pairings (配對歷史表)
- 記錄每週的演練配對
- 用於實現「避免重複」的優先級

### meeting_roles (會議三角表)
- 存儲每週的會議三角安排

### templates (模板表)
- 存儲公版和自訂模板

## 常用查詢

### 查詢某戰隊的所有組員
```sql
SELECT * FROM members WHERE team_id = '你的_team_id';
```

### 查詢某週的配對記錄
```sql
SELECT * FROM pairings WHERE team_id = '你的_team_id' AND week = 3;
```

### 查詢組員的配對歷史
```sql
SELECT * FROM pairings 
WHERE team_id = '你的_team_id' 
  AND (member1_id = '組員_id' OR member2_id = '組員_id')
ORDER BY week;
```
