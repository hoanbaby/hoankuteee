import './style.css';

const chillItems = [
  { label: 'Lofi Focus', desc: 'Nhạc nền tập trung nhẹ nhàng' },
  { label: 'Rainy Mood', desc: 'Không gian mưa thư giãn' },
  { label: 'Night Drive', desc: 'Vibe thành phố về đêm' },
  { label: 'Sunset Acoustic', desc: 'Chill nhẹ cuối ngày' }
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
        <h2>Chill một chút</h2>
        <button id="closeChillBtn" type="button" aria-label="Đóng tab chill">×</button>
      </div>
      <p>Đây là tab riêng cho chill, mở ra mà không đổi toàn bộ giao diện Home.</p>
      <ul>
        ${chillItems.map((item) => `<li><strong>${item.label}</strong><span>${item.desc}</span></li>`).join('')}
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
