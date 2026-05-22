import './style.css';

const chillTracks = [
  {
    title: 'Midnight Breeze',
    artist: 'Lofi Harbor',
    mood: 'Focus · Calm',
    length: '03:42'
  },
  {
    title: 'Rain on Glass',
    artist: 'Slow Neon',
    mood: 'Rainy · Relax',
    length: '04:18'
  },
  {
    title: 'Sunset Echo',
    artist: 'Cozy Tapes',
    mood: 'Warm · Acoustic',
    length: '02:56'
  },
  {
    title: 'Night Ride',
    artist: 'City Pulse',
    mood: 'Urban · Dreamy',
    length: '03:25'
  }
];

document.querySelector('#app').innerHTML = `
  <div class="page-shell">
    <header class="topbar">
      <div class="brand">HOAN <span>ART</span></div>
      <nav class="menu" aria-label="Top menu">
        <a href="#" class="active">Home</a>
        <a href="#">About</a>
        <a href="#">Showreel</a>
        <a href="#">Portfolio</a>
        <a href="#">Contact</a>
        <button id="chillTabBtn" class="menu-chill" type="button">Chill một chút</button>
      </nav>
    </header>

    <main class="content-grid">
      <section class="hero">
        <p class="eyebrow">MEDIA EDITOR & MOTION DESIGNER</p>
        <h1>Bringing Vision to <em>Life</em></h1>
        <p class="lead">Nguyễn Văn Hoan · Professional Media Editor & Motion Designer</p>
        <p class="sub">Từ cinematic edits đến motion graphics, mình kể câu chuyện bằng hình ảnh rõ ràng và cảm xúc.</p>
      </section>

      <aside class="profile-card">
        <div class="avatar"></div>
        <p>Hoan Art</p>
      </aside>

      <section class="panel showreel">
        <h3>Showreel</h3>
        <div class="video-placeholder">BRINGING VISION TO LIFE</div>
      </section>

      <section class="panel about">
        <h3>About me</h3>
        <p>Mình giúp brand và creators tạo video đẹp, đúng mood, đúng mục tiêu.</p>
      </section>

      <section class="panel skills">
        <h3>Skills & services</h3>
        <ul>
          <li>Video Editing</li>
          <li>Motion Graphics</li>
          <li>Color Grading</li>
          <li>Branding</li>
        </ul>
      </section>
    </main>

    <section id="chillPanel" class="chill-panel" aria-hidden="true">
      <div class="chill-head">
        <div>
          <p class="badge">Music tab</p>
          <h2>Chill một chút</h2>
          <p class="chill-sub">Không gian nghe nhạc riêng, hiện đại, không ảnh hưởng giao diện trang chủ.</p>
        </div>
        <button id="closeChillBtn" type="button" aria-label="Đóng tab chill">×</button>
      </div>

      <div class="now-playing">
        <div class="cover-art"></div>
        <div class="track-meta">
          <strong>Midnight Breeze</strong>
          <span>Lofi Harbor</span>
          <div class="progress">
            <i></i>
          </div>
          <div class="time-row"><small>1:14</small><small>3:42</small></div>
        </div>
      </div>

      <div class="player-actions" aria-label="Player controls">
        <button type="button">⏮</button>
        <button type="button" class="play">▶</button>
        <button type="button">⏭</button>
      </div>

      <ul class="playlist">
        ${chillTracks
          .map(
            (track, idx) => `
          <li class="${idx === 0 ? 'is-active' : ''}">
            <div>
              <strong>${track.title}</strong>
              <span>${track.artist} · ${track.mood}</span>
            </div>
            <time>${track.length}</time>
          </li>`
          )
          .join('')}
      </ul>
    </section>
  </div>
`;

const chillPanel = document.getElementById('chillPanel');
const chillTabBtn = document.getElementById('chillTabBtn');
const closeChillBtn = document.getElementById('closeChillBtn');

chillTabBtn?.addEventListener('click', () => {
  chillPanel?.classList.add('open');
  chillPanel?.setAttribute('aria-hidden', 'false');
});

closeChillBtn?.addEventListener('click', () => {
  chillPanel?.classList.remove('open');
  chillPanel?.setAttribute('aria-hidden', 'true');
});
