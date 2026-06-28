# 5分鐘快速開始

## ⚡ 最快開始方法

### 方法 1: 使用 Mock 數據（完全本地，無需 Supabase）

如果你想快速體驗功能而不用配置 Supabase：

1. **編輯 `.env.local`（選項 A：不配置 Supabase）**
   ```
   # 暫時留空，程式會使用 Mock 數據
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

2. **運行開發服務器**
   ```bash
   npm run dev
   ```

3. **訪問應用**
   - 打開 http://localhost:3000
   - 點擊「小隊長登入」
   - 使用測試帳戶登入（稍後配置）

---

### 方法 2: 完整配置（推薦長期使用）

#### A. 建立 Supabase 項目

1. 進入 https://supabase.com
2. 點擊「New Project」
3. 填入項目名稱、密碼、地區
4. 等待 5-10 分鐘

#### B. 初始化數據庫

1. 在 Supabase 儀表板找到「SQL Editor」
2. 點擊「New Query」
3. 複製 `lib/database.sql` 的全部內容
4. 粘貼到編輯器
5. 點擊「Run」

#### C. 獲取 API Keys

1. 進入「Settings → API」
2. 複製以下三個值：
   - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
   - `anon (public) key` → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - `service_role (secret) key` → SUPABASE_SERVICE_ROLE_KEY

#### D. 配置環境變數

編輯 `.env.local`：

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

#### E. 創建測試帳戶

在 Supabase 儀表板中：

1. 進入「Authentication → Users」
2. 點擊「Add user」
3. Email: `admin@test.com`
4. Password: `Admin123!`
5. 點擊「Create user」

在 SQL Editor 中運行：

```sql
-- 創建大隊長帳戶
INSERT INTO users (email, role)
VALUES ('admin@test.com', 'admin');

-- 創建班期
INSERT INTO class_periods (name, start_date, end_date, total_weeks)
VALUES ('2026年春季班', '2026-04-01', '2026-07-09', 12);

-- 創建戰隊
INSERT INTO teams (name, leader_id, class_period_id, meeting_day, meeting_time)
SELECT 
  '演練隊A',
  u.id,
  cp.id,
  'friday',
  '10:00'
FROM users u, class_periods cp
WHERE u.email = 'admin@test.com'
LIMIT 1;

-- 創建小隊長帳戶
INSERT INTO users (email, role, team_id)
SELECT 'leader@test.com', 'team_leader', id
FROM teams
WHERE name = '演練隊A'
LIMIT 1;
```

再在 Supabase 中新增用戶：
- Email: `leader@test.com`
- Password: `Leader123!`

---

## 🎮 開始使用

### 運行程式

```bash
npm run dev
```

訪問 http://localhost:3000

---

## 👑 大隊長操作（第一次使用）

### 1. 登入
- 點擊「大隊長登入」
- Email: `admin@test.com`
- Password: `Admin123!`

### 2. 設置班期
- 進入「大隊長後台」
- 點擊「新增班期」
- 填入：
  - 班期名稱：「2026年春季班」
  - 開課日期：「2026-04-01」
  - 結業日期：「2026-07-09」
  - 總週數：「12」
- 點擊「建立班期」

✅ 完成！班期已建立

---

## 👥 小隊長操作（第一次使用）

### 1. 登入
- 點擊「小隊長登入」
- Email: `leader@test.com`
- Password: `Leader123!`

### 2. 新增組員
1. 點擊「組員管理」
2. 點擊「新增組員」
3. 填入組員信息：
   - 姓名：「小李」
   - 天賦：「明星」
   - 身份：「複訓生 🔄」
   - 職業：「律師」
4. 點擊「新增組員」

重複添加更多組員（至少2人進行配對）

### 3. 設置會議時間
1. 點擊「會議設定」
2. 選擇會議日期：「星期五」
3. 選擇會議時間：「10:00」
4. 填入會議地點：「Zoom會議」
5. 點擊「保存設定」

### 4. 進行演練配對
1. 點擊「演練配對」
2. 填入信息：
   - 週次：「1」
   - 演練主題：「為何加入學兄？」
   - 日期範圍：「6/29-7/5」
3. 點擊「🤖 一鍵自動排序」
4. 檢查配對結果
5. 點擊「✅ 確認保存配對」

✅ 完成！配對已保存

### 5. 複製模板到 LINE
1. 點擊「模板管理」
2. 選擇公版範例（例：「溫馨提醒型」）
3. 點擊「使用」
4. 修改主題和日期
5. 點擊「📋 複製到剪貼板」
6. 在 LINE 群中粘貼並發送

---

## 🎯 完整操作流程（每週重複）

### 周一
1. 小隊長進入「演練配對」
2. 選擇下週（第2週）
3. 點擊「一鍵自動排序」
4. 保存配對

### 周二-周四
1. 複製模板到 LINE 群
2. 組員確認配對對象

### 周五（會議日）
1. 會議按照設定時間進行
2. 會議後進入下週循環

---

## 📱 在手機上使用

程式已優化為響應式設計，可在手機瀏覽器中使用：

1. 在手機瀏覽器中訪問：http://你的電腦IP:3000
2. 所有功能都可在手機上使用
3. 點擊「模板管理」可複製文案到 LINE

---

## ⚙️ 常見問題

**Q: 我只想測試，不想配置 Supabase？**
A: 暫時留空 `.env.local` 的 Supabase 值，程式會使用本地 Mock 數據

**Q: 忘記密碼怎麼辦？**
A: 在 Supabase 儀表板重新設置密碼

**Q: 如何在團隊中分享？**
A: 部署到 Vercel（見 DEPLOYMENT.md）

**Q: 可以添加多少組員？**
A: 無上限，系統支持任何數量

---

## 🚀 下一步

1. ✅ 運行 `npm run dev`
2. ✅ 測試所有功能
3. ✅ 部署到 Vercel（見 DEPLOYMENT.md）
4. ✅ 邀請小隊長使用

祝使用愉快！🎉
