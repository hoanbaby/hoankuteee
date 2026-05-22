import './style.css';

const api = {
  async getPortfolio() {
    const res = await fetch('/api/portfolio');
    return res.json();
  },
  async sendMessage(payload) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }
};

document.querySelector('#app').innerHTML = `
  <div class="page-shell">
    <header class="topbar">
      <div class="brand">HOAN <span>ART</span></div>
      <nav>
        <a class="active" href="#">Home</a><a href="#about">About</a><a href="#portfolio">Portfolio</a><a href="#contact">Contact</a>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">MEDIA EDITOR & MOTION DESIGNER</p>
        <h1>Bringing Vision to <em>Life</em></h1>
        <p class="lead">Nguyễn Văn Hoan · Professional Media Editor & Motion Designer</p>
        <p class="desc">Tôi biến ý tưởng thành visual stories điện ảnh, motion graphics và social content truyền cảm hứng.</p>
        <div class="cta-row">
          <button class="gold">View Showreel</button>
          <button class="ghost">Contact Me</button>
        </div>
      </div>
      <div class="hero-photo">
        <img src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=900&auto=format&fit=crop" alt="profile" />
      </div>
    </section>

    <section id="about" class="grid-3">
      <article class="card"><h3>SHOWREEL</h3><p>Highlight reel với storytelling mạnh mẽ, pacing cinematic và âm thanh cảm xúc.</p></article>
      <article class="card"><h3>ABOUT ME</h3><p>5+ năm kinh nghiệm edit, color grading và motion graphics cho brand, creator và campaign.</p></article>
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
        <button class="gold" type="submit">Send Message</button>
      </form>
      <p id="status" class="status"></p>
    </section>
  </div>
`;

const portfolioGrid = document.getElementById('portfolioGrid');
const portfolioCount = document.getElementById('portfolioCount');
const contactForm = document.getElementById('contactForm');
const statusEl = document.getElementById('status');

async function loadPortfolio() {
  const items = await api.getPortfolio();
  portfolioCount.textContent = `${items.length} projects`;
  portfolioGrid.innerHTML = items
    .map(
      (item) => `<article class="portfolio-item">
          <img src="${item.thumbnail}" alt="${item.title}" />
          <div class="overlay"><strong>${item.title}</strong><span>${item.category}</span></div>
        </article>`
    )
    .join('');
}

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(contactForm).entries());
  const result = await api.sendMessage(payload);
  statusEl.textContent = result.message || 'Đã gửi!';
  contactForm.reset();
});

loadPortfolio();
