import './style.css';

const chillTracks = [
  { title: 'Midnight Breeze', artist: 'Lofi Harbor', mood: 'Focus · Calm', length: '03:42' },
  { title: 'Rain on Glass', artist: 'Slow Neon', mood: 'Rainy · Relax', length: '04:18' },
  { title: 'Sunset Echo', artist: 'Cozy Tapes', mood: 'Warm · Acoustic', length: '02:56' },
  { title: 'Night Ride', artist: 'City Pulse', mood: 'Urban · Dreamy', length: '03:25' },
  { title: 'Cloud Notes', artist: 'Amber Keys', mood: 'Sleep · Soft', length: '05:01' }
];

const routes = [
  { key: 'home', label: 'Home', hash: '#/' },
  { key: 'about', label: 'About', hash: '#/about' },
  { key: 'showreel', label: 'Showreel', hash: '#/showreel' },
  { key: 'portfolio', label: 'Portfolio', hash: '#/portfolio' },
  { key: 'contact', label: 'Contact', hash: '#/contact' },
  { key: 'chill', label: 'Chill một chút', hash: '#/chill', className: 'menu-chill' }
];

const pageConfigs = {
  home: {
    badge: 'Trang chủ',
    title: 'Bringing Vision to <em>Life</em>',
    lead: 'Nguyễn Văn Hoan · Professional Media Editor & Motion Designer',
    text: 'Từ cinematic edits đến motion graphics, mình kể câu chuyện bằng hình ảnh rõ ràng, nghệ thuật và giàu cảm xúc.',
    cta: [
      ['Xem Showreel', '#/showreel'],
      ['Liên hệ dự án', '#/contact']
    ],
    stats: [
      ['120+', 'Dự án đã hoàn thành'],
      ['6+ năm', 'Kinh nghiệm thực chiến'],
      ['24h', 'Phản hồi brief ban đầu']
    ],
    cards: [
      ['Visual Storytelling', 'Xây dựng narrative có cảm xúc và rõ ràng.'],
      ['Art Direction', 'Định hướng hình ảnh đồng bộ thương hiệu.'],
      ['Motion & Edit', 'Kết hợp edit + motion cho video hiện đại.']
    ]
  },
  about: {
    badge: 'About',
    title: 'Câu chuyện nghề của <em>Hoan</em>',
    lead: 'Tập trung vào video thương hiệu, social content và short-form storytelling.',
    text: 'Mình làm việc cùng creators và brands để biến brief thành sản phẩm chỉn chu: từ concept, nhịp dựng, màu sắc đến motion chi tiết.',
    cards: [
      ['6+ năm kinh nghiệm', 'Làm việc xuyên suốt nhiều ngách nội dung.'],
      ['Quy trình rõ ràng', 'Brief → Scriptboard → Edit → Delivery.'],
      ['Tinh thần cộng tác', 'Lắng nghe và tối ưu theo mục tiêu truyền thông.']
    ]
  },
  showreel: {
    badge: 'Showreel',
    title: 'Tuyển tập các dự án <em>nổi bật</em>',
    lead: 'Một không gian riêng để trình bày các sản phẩm motion/video tiêu biểu.',
    text: 'Mỗi project được trình bày với mục tiêu, insight khán giả và cách mình xử lý hình ảnh để tạo sự khác biệt.',
    cards: [
      ['Brand Film', 'Video giới thiệu thương hiệu theo hướng cinematic.'],
      ['Social Ads', 'Nội dung ngắn tối ưu attention trong 3 giây đầu.'],
      ['Event Recap', 'Ghi lại năng lượng sự kiện qua nhịp dựng nhanh.']
    ]
  },
  portfolio: {
    badge: 'Portfolio',
    title: 'Danh mục dự án theo <em>dịch vụ</em>',
    lead: 'Tách rõ từng nhóm dịch vụ để khách hàng xem nhanh đúng nhu cầu.',
    text: 'Bạn có thể duyệt theo nhóm Video Editing, Motion Graphics, Branding Visual và Color Grading.',
    cards: [
      ['Video Editing', 'Case study trước/sau khi dựng.'],
      ['Motion Graphics', 'Typography, transitions, UI animation.'],
      ['Color Grading', 'Mood màu phù hợp từng ngành hàng.']
    ]
  },
  contact: {
    badge: 'Contact',
    title: 'Kết nối để bắt đầu dự án <em>mới</em>',
    lead: 'Trang liên hệ riêng giúp khách hàng gửi yêu cầu nhanh hơn.',
    text: 'Bạn có thể gửi mô tả ngắn về mục tiêu video, timeline và ngân sách để mình phản hồi proposal phù hợp.',
    cards: [
      ['Email', 'hoan.art.work@gmail.com'],
      ['Zalo / Phone', '09xx xxx xxx'],
      ['Thời gian phản hồi', 'Trong vòng 24 giờ làm việc.']
    ]
  }
};

const getRouteKey = () => {
  const hash = window.location.hash || '#/';
  const match = routes.find((route) => route.hash === hash);
  return match?.key || 'home';
};

const renderMenu = (activeRoute) =>
  routes
    .map((route) => {
      const classNames = [route.className, route.key === activeRoute ? 'active' : ''].filter(Boolean).join(' ');
      return `<a href="${route.hash}" class="${classNames}">${route.label}</a>`;
    })
    .join('');

const renderStandardPage = (routeKey) => {
  const page = pageConfigs[routeKey] || pageConfigs.home;
  const isHome = routeKey === 'home';

  return `
    <main class="single-page glass ${isHome ? 'home-page' : ''}">
      <p class="eyebrow">${page.badge}</p>
      <h1>${page.title}</h1>
      <p class="lead">${page.lead}</p>
      <p class="sub">${page.text}</p>

      ${
        isHome
          ? `
        <div class="home-actions">
          ${page.cta
            .map(([label, hash], idx) => `<a href="${hash}" class="btn ${idx === 0 ? 'btn-primary' : 'btn-secondary'}">${label}</a>`)
            .join('')}
        </div>
        <div class="home-stats">
          ${page.stats
            .map(
              ([value, label]) => `
            <article class="stat-card glass">
              <strong>${value}</strong>
              <span>${label}</span>
            </article>`
            )
            .join('')}
        </div>`
          : ''
      }

      <div class="page-cards">
        ${page.cards
          .map(
            ([title, desc]) => `
            <article class="panel glass">
              <h3>${title}</h3>
              <p>${desc}</p>
            </article>`
          )
          .join('')}
      </div>
    </main>
  `;
};

const renderChillPage = () => `
  <section class="chill-panel" aria-hidden="false">
    <div class="chill-layout">
      <div>
        <div class="chill-head">
          <div>
            <p class="badge">Music page</p>
            <h2>Chill một chút</h2>
            <p class="chill-sub">Không gian nghe nhạc tối giản, hiện đại và đồng bộ màu với giao diện trang chủ.</p>
          </div>
        </div>

        <div class="now-playing">
          <div class="cover-art"></div>
          <div class="track-meta">
            <strong>Midnight Breeze</strong>
            <span>Lofi Harbor · Focus · Calm</span>
            <div class="progress" aria-label="Playback progress"><i></i></div>
            <div class="time-row"><small>1:14</small><small>3:42</small></div>
          </div>
        </div>

        <div class="player-actions" aria-label="Player controls">
          <button type="button" aria-label="Previous">⏮</button>
          <button type="button" class="play" aria-label="Play">▶</button>
          <button type="button" aria-label="Next">⏭</button>
        </div>

        <div class="chill-stats">
          <article>
            <strong>24</strong>
            <span>Tracks curated</span>
          </article>
          <article>
            <strong>02h 11m</strong>
            <span>Total runtime</span>
          </article>
          <article>
            <strong>Lo-fi / Ambient</strong>
            <span>Main genres</span>
          </article>
        </div>
      </div>

      <aside class="playlist-wrap">
        <div class="playlist-head">
          <h3>Playlist</h3>
          <small>Updated weekly</small>
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
      </aside>
    </div>
  </section>
`;

const renderApp = () => {
  const routeKey = getRouteKey();
  document.querySelector('#app').innerHTML = `
    <div class="page-shell ${routeKey === 'chill' ? 'chill-mode' : ''}">
      <div class="bg-glow bg-glow-1"></div>
      <div class="bg-glow bg-glow-2"></div>

      <header class="topbar glass">
        <div class="brand">HOAN <span>ART</span></div>
        <nav class="menu" aria-label="Top menu">${renderMenu(routeKey)}</nav>
      </header>

      ${routeKey === 'chill' ? renderChillPage() : renderStandardPage(routeKey)}
    </div>
  `;
};

window.addEventListener('hashchange', renderApp);
renderApp();
