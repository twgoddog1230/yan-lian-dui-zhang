# 演練隊長小幫手 - 完整設置指南

## 🚀 5分鐘快速開始

### 1️⃣ 前置準備
- Node.js 18+ 已安裝
- Supabase 帳戶已建立
- Git 已安裝

### 2️⃣ 項目安裝

```bash
cd /Users/thewolf/自己做的酷東東/016演練小幫手
npm install
```

### 3️⃣ 配置數據庫

詳見 [DATABASE_SETUP.md](./DATABASE_SETUP.md)

### 4️⃣ 環境變數設置

複製 `.env.example` 為 `.env.local`:

```bash
cp .env.example .env.local
```

編輯 `.env.local` 並填入 Supabase 認證信息：

```
NEXT_PUBLIC_SUPABASE_URL=https://你的项目.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon_key
SUPABASE_SERVICE_ROLE_KEY=你的service_role_key
```

### 5️⃣ 運行開發服務器

```bash
npm run dev
```

訪問 http://localhost:3000

---

## 📋 詳細配置指南

### 數據庫配置

#### 選項 A: 使用 Supabase（推薦）

1. 登入 [Supabase](https://supabase.com)
2. 創建新項目
3. 在 SQL Editor 中運行 `lib/database.sql`
4. 複製 Project URL 和 Keys 到 `.env.local`

#### 選項 B: 本地 PostgreSQL

若要使用本地 PostgreSQL：

1. 安裝 PostgreSQL
2. 創建數據庫：`createdb yan_lian_dui_zhang`
3. 運行 SQL 腳本：`psql yan_lian_dui_zhang < lib/database.sql`
4. 配置連接字符串

### 用戶管理

#### 創建大隊長帳戶

在 Supabase 認證中：

1. 新增用戶（Email: admin@example.com）
2. 設置密碼
3. 在 `users` 表中添加記錄：
   ```sql
   INSERT INTO users (email, role)
   VALUES ('admin@example.com', 'admin');
   ```

#### 創建小隊長帳戶

大隊長登入後，使用界面建檔或直接插入：

```sql
INSERT INTO users (email, role, team_id)
VALUES ('leader@example.com', 'team_leader', 'team-uuid');
```

### 示例數據

可選：導入示例數據用於測試

```bash
# 暫無示例數據腳本，建議手動建檔
```

---

## 🎯 功能配置

### 1. 班期設置

大隊長登入後：
1. 進入「大隊長後台」
2. 點擊「新增班期」
3. 填入班期信息

### 2. 戰隊建檔

小隊長：
1. 登入小隊長帳戶
2. 進入「組員管理」
3. 點擊「新增組員」

### 3. 會議設定

小隊長：
1. 進入「會議設定」
2. 選擇會議日期和時間
3. 填入會議地點/方式

### 4. 演練配對

小隊長：
1. 進入「演練配對」
2. 選擇週次和主題
3. 點擊「一鍵自動排序」
4. 確認保存

---

## 🔐 安全檢查清單

- [ ] `.env.local` 已添加到 `.gitignore`
- [ ] 生產環境使用強密碼
- [ ] 定期備份 Supabase 數據
- [ ] 啟用 Supabase 的雙因素認證
- [ ] 檢查 API 密鑰的洩露
- [ ] 配置 CORS 設置（如需要）

---

## 📚 目錄結構

```
.
├── app/                    # Next.js 應用
│   ├── login/             # 登入頁
│   ├── admin/             # 大隊長工作區
│   └── dashboard/         # 小隊長工作區
│       ├── members/       # 組員管理
│       ├── pairing/       # 演練配對
│       ├── meeting/       # 會議設定
│       └── template/      # 模板管理
├── lib/                   # 工具函數
│   ├── supabase.ts       # 數據庫配置
│   ├── authContext.tsx   # 認證邏輯
│   ├── pairingUtils.ts   # 配對演算法
│   └── database.sql      # 數據庫架構
├── components/            # React 組件
├── types/                # TypeScript 類型
└── styles/               # 全局樣式
```

---

## 🛠️ 開發命令

```bash
# 開發模式
npm run dev

# 構建生產版本
npm run build

# 運行生產版本
npm start

# 代碼檢查
npm run lint

# 類型檢查
npx tsc --noEmit
```

---

## 📖 使用說明

### 大隊長操作流程

1. **登入** → 大隊長帳戶
2. **設置班期** → 輸入班期名稱、開課日期、結業日期
3. **建檔小隊長** → 分配帳戶給各小隊長
4. **管理模板** → 編輯公版模板

### 小隊長操作流程

1. **登入** → 小隊長帳戶
2. **新增組員** → 輸入組員信息（姓名、天賦、初訓/複訓）
3. **設置會議** → 配置每週會議時間
4. **配對演練** → 
   - 選擇週次和主題
   - 一鍵自動排序
   - 確認並保存
5. **複製模板** → 複製配對結果到 LINE 群

---

## ❓ 常見問題

**Q: 如何添加新的天賦？**
A: 天賦由羅傑漢彌頓系統定義，共8種，不可添加。可在 `types/index.ts` 中修改。

**Q: 如何設置多個戰隊？**
A: 大隊長為每個戰隊建檔一個小隊長帳戶即可。系統支持無限戰隊。

**Q: 配對數據如何備份？**
A: Supabase 提供自動備份。也可手動導出 CSV。

**Q: 如何修改班期信息？**
A: 目前需在 Supabase 儀表板中直接修改。

---

## 🚀 下一步

1. 配置完成後，在 http://localhost:3000 測試所有功能
2. 詳見 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解部署步驟
3. 查看 [README.md](./README.md) 了解功能詳情

---

## 📞 支持

有問題嗎？

- 查看 [README.md](./README.md) 的常見問題
- 檢查 [DEPLOYMENT.md](./DEPLOYMENT.md) 的部署問題
- 聯絡開發者：老狼

**版本**: v1.0.0  
**最後更新**: 2026年6月28日
