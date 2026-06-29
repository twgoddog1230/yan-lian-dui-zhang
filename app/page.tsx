'use client';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#4f46e5' }}>演練隊長小幫手</h1>
        <p style={{ color: '#4b5563', marginBottom: '2rem' }}>協助小隊長快速進行演練配對與會議安排</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button onClick={() => window.location.href = '/login?role=admin'} style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', color: 'white', backgroundColor: '#3b82f6', cursor: 'pointer', border: 'none', fontSize: '1rem' }}>大隊長登入</button>
          <button onClick={() => window.location.href = '/login?role=team_leader'} style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', color: 'white', backgroundColor: '#22c55e', cursor: 'pointer', border: 'none', fontSize: '1rem' }}>小隊長登入</button>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2rem' }}>程式開發者：老狼</p>
      </div>
    </div>
  );
}
