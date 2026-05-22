import './style.css';

const chillState = {
  loading: false,
  error: '',
  items: [],
  keyword: '',
  currentIndex: 0,
  isPlaying: false
};

const chillYoutubeState = { loading: false, items: [], error: '' };

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

const renderYoutubeList = () => {
  if (chillYoutubeState.loading) return '<p class="youtube-state">Đang tải playlist YouTube...</p>';
  if (chillYoutubeState.error) return `<p class="youtube-state error">${chillYoutubeState.error}</p>`;
  if (!chillYoutubeState.items.length) return '<p class="youtube-state">Chưa có playlist nào.</p>';
  return `<ul class="youtube-list">${chillYoutubeState.items.map((item) => `<li><div><strong>${item.title}</strong><span>${item.channel}</span></div><a href="${item.youtubeUrl}" target="_blank" rel="noreferrer">Mở YouTube</a></li>`).join('')}</ul>`;
};

const getCurrentTrack = () => chillState.items[chillState.currentIndex] || null;

const renderTrackList = () => {
  if (chillState.loading) return '<p class="youtube-state">Đang tải nhạc...</p>';
  if (chillState.error) return `<p class="youtube-state error">${chillState.error}</p>`;
  if (!chillState.items.length) return '<p class="youtube-state">Không có bài phù hợp.</p>';
  return `<ul class="playlist">${chillState.items.map((track, idx) => `<li data-track-index="${idx}" class="${idx === chillState.currentIndex ? 'is-active' : ''}"><div><strong>${track.title}</strong><span>${track.artist} · ${track.mood}</span></div><time>${track.length}</time></li>`).join('')}</ul>`;
};

const loadChillTracks = async (keyword = '') => {
  chillState.loading = true; chillState.error = ''; chillState.keyword = keyword; renderApp();
  try {
    const res = await fetch(`/api/chill-tracks${keyword ? `?q=${encodeURIComponent(keyword)}` : ''}`);
    if (!res.ok) throw new Error('Không tải được playlist.');
    chillState.items = await res.json();
    chillState.currentIndex = 0;
  } catch (error) { chillState.error = error.message; }
  finally { chillState.loading = false; renderApp(); syncAudio(); }
};

const loadChillYoutube = async () => {
  chillYoutubeState.loading = true; chillYoutubeState.error = ''; renderApp();
  try { const res = await fetch('/api/chill-youtube'); if (!res.ok) throw new Error('Không thể tải API YouTube.'); chillYoutubeState.items = await res.json(); }
  catch (error) { chillYoutubeState.error = error.message; }
  finally { chillYoutubeState.loading = false; renderApp(); }
};

const renderChillPanel = () => {
  const current = getCurrentTrack();
  return `<section class="chill-panel"><div class="chill-layout"><div><div class="chill-head"><div><p class="badge">Music page</p><h2>Chill một chút</h2><p class="chill-sub">Nghe nhạc trực tiếp + tìm kiếm từ backend.</p></div><a class="btn-home" href="#/">← Về trang chủ</a></div><div class="search-row"><input id="track-search" type="text" placeholder="Tìm tên bài, nghệ sĩ..." value="${chillState.keyword}"><button id="search-btn" type="button">Tìm</button></div><div class="now-playing"><div class="cover-art"></div><div class="track-meta"><strong>${current?.title || 'Chưa chọn bài'}</strong><span>${current ? `${current.artist} · ${current.mood}` : 'Hãy tìm và chọn một bài từ playlist.'}</span><audio id="chill-audio" controls ${current?.audioUrl ? `src="${current.audioUrl}"` : ''}></audio></div></div><div class="player-actions"><button type="button" id="prev-track">⏮</button><button type="button" class="play" id="play-toggle">${chillState.isPlaying ? '⏸' : '▶'}</button><button type="button" id="next-track">⏭</button></div><div class="chill-stats"><article><strong>${chillState.items.length || 0}</strong><span>Tracks loaded</span></article><article><strong>API</strong><span>Backend connected</span></article><article><strong>Lo-fi / Ambient</strong><span>Main genres</span></article></div></div><aside class="playlist-wrap"><div class="playlist-head"><h3>Playlist</h3><small>Searchable</small></div>${renderTrackList()}<div class="youtube-block"><h3>YouTube 1-click</h3>${renderYoutubeList()}</div></aside></div></section>`;
};

const bindChillEvents = () => {
  const searchBtn = document.querySelector('#search-btn');
  const input = document.querySelector('#track-search');
  searchBtn?.addEventListener('click', () => loadChillTracks(input?.value || ''));
  input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') loadChillTracks(input.value || ''); });

  document.querySelectorAll('[data-track-index]').forEach((item) => item.addEventListener('click', () => {
    chillState.currentIndex = Number(item.getAttribute('data-track-index'));
    chillState.isPlaying = true;
    renderApp();
    syncAudio(true);
  }));

  document.querySelector('#prev-track')?.addEventListener('click', () => changeTrack(-1));
  document.querySelector('#next-track')?.addEventListener('click', () => changeTrack(1));
  document.querySelector('#play-toggle')?.addEventListener('click', () => togglePlay());
};

const syncAudio = (forcePlay = false) => {
  const audio = document.querySelector('#chill-audio');
  if (!audio) return;
  audio.onended = () => changeTrack(1);
  if (forcePlay || chillState.isPlaying) audio.play().catch(() => { chillState.isPlaying = false; renderApp(); });
};
const changeTrack = (step) => {
  if (!chillState.items.length) return;
  chillState.currentIndex = (chillState.currentIndex + step + chillState.items.length) % chillState.items.length;
  chillState.isPlaying = true;
  renderApp();
  syncAudio(true);
};
const togglePlay = () => {
  const audio = document.querySelector('#chill-audio');
  if (!audio) return;
  if (audio.paused) { audio.play(); chillState.isPlaying = true; } else { audio.pause(); chillState.isPlaying = false; }
  renderApp();
};

const renderApp = () => {
  const routeKey = getRouteKey();
  document.querySelector('#app').innerHTML = `<div class="page-shell ${routeKey === 'chill' ? 'chill-mode' : ''}"><div class="bg-glow bg-glow-1"></div><div class="bg-glow bg-glow-2"></div><header class="topbar glass"><div class="brand">HOAN <span>ART</span></div><nav class="menu" aria-label="Top menu">${renderMenu(routeKey)}</nav></header>${routeKey === 'chill' ? renderChillPanel() : renderStandardPage(routeKey)}</div>`;
  if (routeKey === 'chill') bindChillEvents();
};

window.addEventListener('hashchange', () => {
  renderApp();
  if (getRouteKey() === 'chill') {
    if (!chillState.items.length && !chillState.loading) loadChillTracks();
    if (!chillYoutubeState.items.length && !chillYoutubeState.loading) loadChillYoutube();
  }
});
renderApp();
if (getRouteKey() === 'chill') { loadChillTracks(); loadChillYoutube(); }
