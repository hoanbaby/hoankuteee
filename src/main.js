import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="page">
    <header class="topbar">
      <div class="logo">HOAN <span>ART</span></div>
      <nav>
        <a class="active">Home</a><a>About</a><a>Showreel</a><a>Portfolio</a><a>Contact</a>
      </nav>
    </header>

    <section class="hero">
      <div class="left">
        <p class="eyebrow">MEDIA EDITOR & MOTION DESIGNER</p>
        <h1>Bringing Vision to <span>Life</span></h1>
        <p class="desc">Nguyễn Văn Hoan | Professional Media Editor & Motion Designer</p>
        <p class="sub">I transform ideas into compelling visual stories. From cinematic edits to sleek motion graphics.</p>
        <div class="actions"><button class="primary">View Showreel</button><button>Contact Me</button></div>
      </div>
      <div class="right card">
        <img src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=1200&auto=format&fit=crop" alt="portrait" />
      </div>
    </section>

    <section class="grid3">
      <article class="card media"><h3>SHOWREEL</h3><div class="thumb"></div></article>
      <article class="card"><h3>ABOUT ME</h3><p>I'm Nguyễn Văn Hoan, a Media Editor & Motion Designer with passion for visual storytelling and brand content.</p><div class="stats"><span><b>5+</b>Years</span><span><b>200+</b>Projects</span><span><b>100+</b>Clients</span></div></article>
      <article class="card"><h3>SKILLS & SERVICES</h3><div class="skills"><span>Video Editing</span><span>Motion Graphics</span><span>Color Grading</span><span>Branding</span><span>Social Content</span><span>Content Strategy</span></div></article>
    </section>

    <section class="portfolio card">
      <h3>PORTFOLIO PREVIEW</h3>
      <div class="strip">
        <div>CINEMATIC</div><div>PRODUCT</div><div>MOTION</div><div>BRAND</div><div>MUSIC</div><div>SOCIAL</div>
      </div>
    </section>
  </div>
`;
