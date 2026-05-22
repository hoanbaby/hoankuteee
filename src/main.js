import './style.css';

const musicState = {
  loading: false,
  error: '',
  items: [],
  keyword: '',
  currentIndex: 0,
  youtubeInput: '',
  youtubeEmbedUrl: '',
  youtubeSearchUrl: ''
};

const routes = [
  { key: 'home', label: 'Home', hash: '#/' },
  { key: 'about', label: 'About', hash: '#/about' },
  { key: 'showreel', label: 'Showreel', hash: '#/showreel' },
  { key: 'portfolio', label: 'Portfolio', hash: '#/portfolio' },
  { key: 'contact', label: 'Contact', hash: '#/contact' },
  { key: 'chill', label: 'Chill một chút', hash: '#/chill', className: 'menu-chill' }
];

const pageConfigs = { home: { badge: 'Media Editor & Motion Designer', title: 'Bringing Vision to <em>Life</em>', lead: 'Nguyễn Văn Hoan · Professional Media Editor & Motion Designer', text: 'Biến concept thành khung hình có chiều sâu: cinematic edit, motion art và visual storytelling đồng bộ branding.', cta: [['View Showreel', '#/showreel'], ['Contact Me', '#/contact']], stats: [['200+', 'Projects completed'], ['6+ years', 'Creative experience'], ['24h', 'First response']], services: [['Video Editing', 'Cinematic editing kể chuyện giàu cảm xúc.'], ['Motion Graphics', 'Animation hiện đại giúp nội dung nổi bật.'], ['Color Grading', 'Tinh chỉnh màu sắc chuyên sâu, nhất quán mood.'], ['Branding Visual', 'Định hình visual identity cho creator và brand.']], categories: ['Cinematic Film Edit', 'Product Commercial', 'Motion Graphics', 'Brand Film', 'Music Video', 'Social Content'] }, about: { badge: 'About', title: 'Câu chuyện nghề của <em>Hoan</em>', lead: 'Tập trung vào video thương hiệu, social content và short-form storytelling.', text: 'Mình làm việc cùng creators và brands để biến brief thành sản phẩm chỉn chu: từ concept, nhịp dựng, màu sắc đến motion chi tiết.', cards: [['6+ năm kinh nghiệm', 'Làm việc xuyên suốt nhiều ngách nội dung.'], ['Quy trình rõ ràng', 'Brief → Scriptboard → Edit → Delivery.'], ['Tinh thần cộng tác', 'Lắng nghe và tối ưu theo mục tiêu truyền thông.']] }, showreel: { badge: 'Showreel', title: 'Tuyển tập các dự án <em>nổi bật</em>', lead: 'Một không gian riêng để trình bày các sản phẩm motion/video tiêu biểu.', text: 'Mỗi project được trình bày với mục tiêu, insight khán giả và cách mình xử lý hình ảnh để tạo sự khác biệt.', cards: [['Brand Film', 'Video giới thiệu thương hiệu theo hướng cinematic.'], ['Social Ads', 'Nội dung ngắn tối ưu attention trong 3 giây đầu.'], ['Event Recap', 'Ghi lại năng lượng sự kiện qua nhịp dựng nhanh.']] }, portfolio: { badge: 'Portfolio', title: 'Danh mục dự án theo <em>dịch vụ</em>', lead: 'Tách rõ từng nhóm dịch vụ để khách hàng xem nhanh đúng nhu cầu.', text: 'Bạn có thể duyệt theo nhóm Video Editing, Motion Graphics, Branding Visual và Color Grading.', cards: [['Video Editing', 'Case study trước/sau khi dựng.'], ['Motion Graphics', 'Typography, transitions, UI animation.'], ['Color Grading', 'Mood màu phù hợp từng ngành hàng.']] }, contact: { badge: 'Contact', title: 'Kết nối để bắt đầu dự án <em>mới</em>', lead: 'Trang liên hệ riêng giúp khách hàng gửi yêu cầu nhanh hơn.', text: 'Bạn có thể gửi mô tả ngắn về mục tiêu video, timeline và ngân sách để mình phản hồi proposal phù hợp.', cards: [['Email', 'hoan.art.work@gmail.com'], ['Zalo / Phone', '09xx xxx xxx'], ['Thời gian phản hồi', 'Trong vòng 24 giờ làm việc.']] } };

const getRouteKey = () => routes.find((route) => route.hash === (window.location.hash || '#/'))?.key || 'home';
const renderMenu = (activeRoute) => routes.map((route) => `<a href="${route.hash}" class="${[route.className, route.key === activeRoute ? 'active' : ''].filter(Boolean).join(' ')}">${route.label}</a>`).join('');
const renderHomePage = () => { const page = pageConfigs.home; return `<main class="home-art glass"><section class="hero-art"><div class="hero-copy"><p class="eyebrow">${page.badge}</p><h1>${page.title}</h1><p class="lead">${page.lead}</p><p class="sub">${page.text}</p><div class="home-actions">${page.cta.map(([label, hash], idx) => `<a href="${hash}" class="btn ${idx === 0 ? 'btn-primary' : 'btn-secondary'}">${label}</a>`).join('')}</div></div><aside class="portrait-card"><div class="portrait-frame"><div class="portrait-glow"></div><div class="portrait-inner">HOAN ART</div></div><p>CREATE · EDIT · INSPIRE</p></aside></section><section class="stats-services"><div class="home-stats">${page.stats.map(([value, label]) => `<article class="stat-card glass"><strong>${value}</strong><span>${label}</span></article>`).join('')}</div><div class="services-grid glass">${page.services.map(([title, desc]) => `<article><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></section><section class="portfolio-strip glass"><p class="strip-title">Portfolio Preview</p><div class="strip-grid">${page.categories.map((item) => `<span>${item}</span>`).join('')}</div></section></main>`; };

const renderStandardPage = (routeKey) => { if (routeKey === 'home') return renderHomePage(); const page = pageConfigs[routeKey]; return `<main class="single-page glass"><p class="eyebrow">${page.badge}</p><h1>${page.title}</h1><p class="lead">${page.lead}</p><p class="sub">${page.text}</p><div class="page-cards">${page.cards.map(([title, desc]) => `<article class="panel glass"><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></main>`; };

const getCurrentTrack = () => musicState.items[musicState.currentIndex] || null;

const renderTrackList = () => {
  if (musicState.loading) return '<p class="youtube-state">Đang tìm bài hát từ Deezer...</p>';
  if (musicState.error) return `<p class="youtube-state error">${musicState.error}</p>`;
  if (!musicState.items.length) return '<p class="youtube-state">Nhập từ khóa để tìm bài hát.</p>';
  return `<ul class="playlist">${musicState.items.map((track, idx) => `<li data-track-index="${idx}" class="${idx === musicState.currentIndex ? 'is-active' : ''}"><div class="track-info"><strong>${track.title}</strong><span>${track.artist} · ${track.album}</span></div><time>Preview 30s</time></li>`).join('')}</ul>`;
};

const searchSongs = async (keyword) => {
  musicState.loading = true;
  musicState.error = '';
  musicState.keyword = keyword;
  renderApp();
  try {
    const res = await fetch(`/api/deezer-search?q=${encodeURIComponent(keyword)}`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message || 'Không tìm được bài hát.');
    musicState.items = payload;
    musicState.currentIndex = 0;
    const first = payload[0];
    if (first) musicState.youtubeSearchUrl = first.youtubeSearchUrl;
  } catch (error) {
    musicState.error = error.message;
  } finally {
    musicState.loading = false;
    renderApp();
  }
};

const renderYoutubeSection = () => {
  const current = getCurrentTrack();
  return `<div class="youtube-block"><h3>Nghe full / MV trên YouTube</h3>
    <div class="search-row">
      <input id="youtube-input" type="text" placeholder="Dán link YouTube để phát iframe" value="${musicState.youtubeInput}">
      <button id="youtube-embed-btn" type="button">Phát</button>
    </div>
    ${current?.youtubeSearchUrl ? `<a class="yt-search-link" target="_blank" rel="noreferrer" href="${current.youtubeSearchUrl}">Tìm MV của bài này trên YouTube</a>` : ''}
    ${musicState.youtubeEmbedUrl ? `<iframe class="youtube-frame" src="${musicState.youtubeEmbedUrl}" title="YouTube player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : '<p class="youtube-state">Chưa có video được gắn. Hãy dán link YouTube để phát bằng iframe.</p>'}
  </div>`;
};

const renderChillPanel = () => {
  const current = getCurrentTrack();
  return `<section class="chill-panel"><div class="chill-layout"><div><div class="chill-head"><div><p class="badge">Music page</p><h2>Tìm bài hát & nghe thử 30 giây</h2><p class="chill-sub">Web gọi Deezer API lấy tên bài, ca sĩ, ảnh album và preview 30s.</p></div><a class="btn-home" href="#/">← Về trang chủ</a></div><div class="search-row"><input id="track-search" type="text" placeholder="Ví dụ: Sơn Tùng M-TP" value="${musicState.keyword}"><button id="search-btn" type="button">Tìm</button></div><div class="now-playing"><div class="cover-art" style="background-image:url('${current?.albumCover || ''}'); background-size:cover; background-position:center;"></div><div class="track-meta"><strong>${current?.title || 'Chưa chọn bài'}</strong><span>${current ? `${current.artist} · ${current.album}` : 'Tìm bài để xem kết quả từ Deezer.'}</span><audio id="chill-audio" controls ${current?.preview ? `src="${current.preview}"` : ''}></audio></div></div>${renderYoutubeSection()}</div><aside class="playlist-wrap"><div class="playlist-head"><h3>Kết quả từ Deezer</h3><small>Preview 30 giây</small></div>${renderTrackList()}</aside></div></section>`;
};

const bindChillEvents = () => {
  const searchBtn = document.querySelector('#search-btn');
  const input = document.querySelector('#track-search');
  searchBtn?.addEventListener('click', () => searchSongs(input?.value?.trim() || ''));
  input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') searchSongs(input.value.trim()); });

  document.querySelectorAll('[data-track-index]').forEach((item) => item.addEventListener('click', () => {
    musicState.currentIndex = Number(item.getAttribute('data-track-index'));
    const track = getCurrentTrack();
    musicState.youtubeSearchUrl = track?.youtubeSearchUrl || '';
    renderApp();
  }));

  document.querySelector('#youtube-embed-btn')?.addEventListener('click', async () => {
    const url = document.querySelector('#youtube-input')?.value?.trim() || '';
    musicState.youtubeInput = url;
    const res = await fetch(`/api/youtube-embed?url=${encodeURIComponent(url)}&q=${encodeURIComponent(getCurrentTrack()?.youtubeSearchQuery || '')}`);
    const payload = await res.json();
    musicState.youtubeEmbedUrl = payload.embedUrl || '';
    musicState.youtubeSearchUrl = payload.searchUrl || musicState.youtubeSearchUrl;
    renderApp();
  });
};

const renderApp = () => {
  const routeKey = getRouteKey();
  document.querySelector('#app').innerHTML = `<div class="page-shell ${routeKey === 'chill' ? 'chill-mode' : ''}"><div class="bg-glow bg-glow-1"></div><div class="bg-glow bg-glow-2"></div><header class="topbar glass"><div class="brand">HOAN <span>ART</span></div><nav class="menu" aria-label="Top menu">${renderMenu(routeKey)}</nav></header>${routeKey === 'chill' ? renderChillPanel() : renderStandardPage(routeKey)}</div>`;
  if (routeKey === 'chill') bindChillEvents();
};

window.addEventListener('hashchange', () => renderApp());
renderApp();
