import './style.css';

const api = {
  async getPortfolio() {
    const res = await fetch('/api/portfolio');
    if (!res.ok) throw new Error('Không thể tải portfolio.');
    return res.json();
  },
  async sendMessage(payload) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Gửi tin nhắn thất bại.');
    return res.json();
  }
};

document.querySelector('#app').innerHTML = `
  <div class="page-shell">
    <header class="topbar">
      <div class="brand">HOAN <span>ART</span></div>
      <nav>
        <a class="active" href="#">Home</a>
        <a href="#about">chill một chút</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">MEDIA EDITOR & MOTION DESIGNER</p>
        <h1>Bringing Vision to <em>Life</em></h1>
        <p class="lead">Nguyễn Văn Hoan · Professional Media Editor & Motion Designer</p>
        <p class="desc">Tôi biến ý tưởng thành visual stories điện ảnh, motion graphics và social content truyền cảm hứng.</p>
        <div class="cta-row">
          <button id="showreelBtn" class="gold" type="button">View Showreel</button>
          <button id="contactBtn" class="ghost" type="button">Contact Me</button>
        </div>
      </div>
      <div class="hero-photo">
        <img src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=900&auto=format&fit=crop" alt="profile" />
      </div>
    </section>

    <section id="about" class="grid-3">
      <article class="card"><h3>SHOWREEL</h3><p>Highlight reel với storytelling mạnh mẽ, pacing cinematic và âm thanh cảm xúc.</p></article>
      <article class="card chill-card"><h3>CHILL MỘT CHÚT</h3><p>Một góc nhỏ nghe nhạc nhẹ để nạp mood trước khi quay lại công việc sáng tạo.</p><div class="mini-player"><span>Now playing: Sunset Lofi</span><button type="button">▶</button></div></article>
      <article class="card"><h3>SKILLS & SERVICES</h3><ul><li>Video Editing</li><li>Motion Graphics</li><li>Color Grading</li><li>Branding</li></ul></article>
    </section>

    <section id="portfolio" class="portfolio-wrap card">
      <div class="section-head"><h3>PORTFOLIO PREVIEW</h3><small id="portfolioCount"></small></div>
      <div id="portfolioGrid" class="portfolio-grid"></div>
    </section>

    <section id="contact" class="contact card">
      <div>
        <h3>Have a project in mind?</h3>
        <p>Gửi brief, mình sẽ phản hồi trong 24h.</p>
      </div>
      <form id="contactForm" class="contact-form">
        <input name="name" required placeholder="Tên của bạn" />
        <input name="email" required type="email" placeholder="Email" />
        <textarea name="message" required placeholder="Mô tả dự án..."></textarea>
        <button id="sendMessageBtn" class="gold" type="submit">Send Message</button>
      </form>
      <p id="status" class="status"></p>
    </section>
  </div>
`;

const portfolioGrid = document.getElementById('portfolioGrid');
const portfolioCount = document.getElementById('portfolioCount');
const contactForm = document.getElementById('contactForm');
const statusEl = document.getElementById('status');
const showreelBtn = document.getElementById('showreelBtn');
const contactBtn = document.getElementById('contactBtn');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const navLinks = document.querySelectorAll('.topbar nav a');

function smoothScrollTo(targetId) {
  const section = document.querySelector(targetId);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href') || '#';
    if (!href.startsWith('#')) return;
    event.preventDefault();
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
    if (href === '#') return window.scrollTo({ top: 0, behavior: 'smooth' });
    smoothScrollTo(href);
  });
});

showreelBtn?.addEventListener('click', () => {
  smoothScrollTo('#portfolio');
  statusEl.textContent = 'Đang mở phần showreel/portfolio.';
});
contactBtn?.addEventListener('click', () => {
  smoothScrollTo('#contact');
  statusEl.textContent = 'Điền form để gửi yêu cầu của bạn nhé!';
});

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(contactForm).entries());
  try {
    sendMessageBtn.disabled = true;
    sendMessageBtn.textContent = 'Sending...';
    statusEl.textContent = 'Đang gửi tin nhắn...';
    const result = await api.sendMessage(payload);
    statusEl.textContent = result.message || 'Đã gửi!';
    contactForm.reset();
  } catch (error) {
    statusEl.textContent = error.message;
  } finally {
    sendMessageBtn.disabled = false;
    sendMessageBtn.textContent = 'Send Message';
  }
});

async function loadPortfolio() {
  try {
    portfolioCount.textContent = 'Loading...';
    const items = await api.getPortfolio();
    portfolioCount.textContent = `${items.length} projects`;
    portfolioGrid.innerHTML = items.map((item) => `<article class="portfolio-item" tabindex="0" role="button" aria-label="${item.title}"><img src="${item.thumbnail}" alt="${item.title}" /><div class="overlay"><strong>${item.title}</strong><span>${item.category}</span></div></article>`).join('');
  } catch (error) {
    portfolioCount.textContent = '0 projects';
    portfolioGrid.innerHTML = '<p>Không tải được portfolio lúc này.</p>';
    statusEl.textContent = error.message;
  }
}

loadPortfolio();
