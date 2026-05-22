import './style.css';

const chillItems = [
  { label: 'Lofi Focus', desc: 'Nhạc nền tập trung nhẹ nhàng' },
  { label: 'Rainy Mood', desc: 'Không gian mưa thư giãn' },
  { label: 'Night Drive', desc: 'Vibe thành phố về đêm' }
];

document.querySelector('#app').innerHTML = `
  <section class="menu-widget" aria-label="Menu Chill một chút">
    <h2>Chill một chút</h2>
    <p>Menu nhỏ để chọn nhanh mood nghe nhạc.</p>
    <ul>
      ${chillItems
        .map(
          (item) => `
            <li>
              <strong>${item.label}</strong>
              <span>${item.desc}</span>
            </li>
          `
        )
        .join('')}
    </ul>
  </section>
`;
