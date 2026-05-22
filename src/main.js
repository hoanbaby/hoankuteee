import './style.css';

const tracks = [
  { title: 'Midnight City Lights', artist: 'Nova Waves', duration: '3:42', mood: 'Lofi House' },
  { title: 'Coffee & Clouds', artist: 'Annie Rains', duration: '2:58', mood: 'Chillhop' },
  { title: 'Dusk Drive', artist: 'Velvet Lane', duration: '4:05', mood: 'Synthwave' },
  { title: 'Silent Seaside', artist: 'Kaito Bloom', duration: '3:24', mood: 'Ambient' },
  { title: 'Neon Balcony', artist: 'Juno Y', duration: '3:11', mood: 'Indie Pop' }
];

document.querySelector('#app').innerHTML = `
  <div class="noise"></div>
  <main class="music-page">
    <header class="topbar glass">
      <div class="brand">chill<span>.mood</span></div>
      <nav>
        <a class="active" href="#">Khám phá</a>
        <a href="#playlist">Playlist</a>
        <a href="#vibes">Vibes</a>
      </nav>
      <button class="icon-btn" aria-label="Profile">🎧</button>
    </header>

    <section class="hero">
      <div>
        <p class="badge">NOW PLAYING · CHILL SESSION</p>
        <h1>Không gian nghe nhạc hiện đại, chill đúng điệu.</h1>
        <p class="sub">Thiết kế đậm chất 2026: gradient neon, glassmorphism và trải nghiệm mượt mà như app streaming.</p>
        <div class="hero-actions">
          <button class="primary">▶ Phát ngay</button>
          <button class="ghost">＋ Thêm vào thư viện</button>
        </div>
      </div>
      <div class="player-card glass">
        <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop" alt="Album cover"/>
        <div class="player-meta">
          <strong>Moonlight Reflection</strong>
          <span>by Luma Collective</span>
        </div>
        <div class="progress"><span></span></div>
        <div class="player-controls"><button>⏮</button><button class="play">⏯</button><button>⏭</button></div>
      </div>
    </section>

    <section id="playlist" class="playlist glass">
      <div class="section-head">
        <h2>Daily Chill Playlist</h2>
        <small>${tracks.length} bài hát</small>
      </div>
      <div class="track-list">
        ${tracks
          .map(
            (track, index) => `
            <article class="track">
              <span class="idx">${String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>${track.title}</strong>
                <p>${track.artist} · ${track.mood}</p>
              </div>
              <span class="duration">${track.duration}</span>
            </article>
          `
          )
          .join('')}
      </div>
    </section>

    <section id="vibes" class="vibes">
      <article class="vibe-card glass"><h3>Lofi Focus</h3><p>Nhẹ nhàng, không lời, tối ưu khi làm việc.</p></article>
      <article class="vibe-card glass"><h3>Night Drive</h3><p>Synthwave thành phố về đêm, đậm cinematic.</p></article>
      <article class="vibe-card glass"><h3>Rainy Mood</h3><p>Ambient + tiếng mưa cho những ngày cần bình yên.</p></article>
    </section>
  </main>
`;
