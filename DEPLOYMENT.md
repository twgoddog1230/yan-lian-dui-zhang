# 部署指南

## 快速部署到 Vercel

### 前置要求
- GitHub 帳戶（推送代碼）
- Vercel 帳戶
- Supabase 帳戶和數據庫配置完成

### 部署步驟

#### 1. 推送到 GitHub

```bash
cd /Users/thewolf/自己做的酷東東/016演練小幫手
git init
git add .
git commit -m "Initial commit: 演練隊長小幫手 v1.0"
git branch -M main
git remote add origin https://github.com/你的用戶名/yan-lian-dui-zhang.git
git push -u origin main
```

#### 2. 連接 Vercel

1. 登入 [Vercel](https://vercel.com)
2. 點擊 **Add New** → **Project**
3. 選擇 GitHub 倉庫
4. 選擇 **Deploy**

#### 3. 配置環境變數

在 Vercel 項目設置中添加：

```
NEXT_PUBLIC_SUPABASE_URL=你的_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=你的_SERVICE_ROLE_KEY
```

#### 4. 自動部署

推送到 GitHub 時，Vercel 會自動部署。

## 本地開發環境

### 運行開發服務器

```bash
npm install
npm run dev
```

訪問 http://localhost:3000

### 構建生產版本

```bash
npm run build
npm start
```

## 環境變數配置

### .env.local（開發環境）

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

從哪裡獲取這些值：

1. **NEXT_PUBLIC_SUPABASE_URL**
   - 登入 Supabase 儀表板
   - 進入項目設置
   - 複製 Project URL

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Supabase 儀表板 → API Keys
   - 複製 anon (public) key

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Supabase 儀表板 → API Keys
   - 複製 service_role (secret) key

## 常見部署問題

### 問題 1: 環境變數未設置
**症狀**: "NEXT_PUBLIC_SUPABASE_URL is required"

**解決**: 檢查 Vercel 項目設置中的環境變數是否正確配置

### 問題 2: 數據庫連接失敗
**症狀**: "Failed to connect to database"

**解決**: 
1. 檢查 Supabase 項目是否正常運行
2. 驗證環境變數是否正確
3. 檢查防火牆設置

### 問題 3: 認證失敗
**症狀**: "Authentication error"

**解決**:
1. 確認 Supabase 中的用戶帳戶已建立
2. 檢查密碼是否正確
3. 查看 Supabase 的認證日誌

## 監測和維護

### 查看部署日誌

在 Vercel 儀表板 → Deployments → 選擇部署 → Logs

### 性能監測

1. Vercel Analytics
2. Supabase 儀表板中的性能指標

### 定期備份

1. Supabase 自動備份（查看儀表板設置）
2. 定期導出重要數據

## 性能優化建議

1. **啟用 CDN**: Vercel 自動配置 CDN
2. **數據庫優化**: 為常用查詢添加索引（已在 database.sql 中完成）
3. **圖片優化**: 使用 Next.js Image 組件
4. **API 路由緩存**: 為不常變的數據實現緩存

## 生產環境檢查清單

- [ ] 所有環境變數已設置
- [ ] 數據庫已初始化並運行
- [ ] 認證系統正常工作
- [ ] 所有頁面可以訪問
- [ ] 搜索控制台已驗證
- [ ] 錯誤監測已配置（如 Sentry）
- [ ] 備份計劃已制定

## 更新和維護

### 更新依賴包

```bash
npm update
npm audit fix
```

### 部署新版本

```bash
git add .
git commit -m "Update: 新功能或修復"
git push origin main
# Vercel 自動部署
```

## 支持和反饋

如有任何部署問題，請聯繫開發者：老狼
