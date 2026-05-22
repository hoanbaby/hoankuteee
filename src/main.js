import './style.css';

const STORAGE_KEY = 'booking-web-app';

const services = [
  { id: 1, name: 'Khám tổng quát', duration: 30 },
  { id: 2, name: 'Nha khoa', duration: 45 },
  { id: 3, name: 'Tư vấn dinh dưỡng', duration: 60 }
];

document.querySelector('#app').innerHTML = `
  <main class="container">
    <header>
      <h1>Booking Web</h1>
      <p>Frontend Vite + backend mô phỏng bằng localStorage API.</p>
    </header>

    <section class="card">
      <h2>Tạo lịch hẹn</h2>
      <form id="bookingForm" class="form-grid">
        <label>Họ tên<input name="customerName" required placeholder="Nguyễn Văn A" /></label>
        <label>Số điện thoại<input name="phone" required placeholder="0901234567" /></label>
        <label>Dịch vụ<select name="serviceId" id="serviceSelect" required></select></label>
        <label>Thời gian hẹn<input type="datetime-local" name="appointmentTime" required /></label>
        <button type="submit">Đặt lịch</button>
      </form>
      <p id="status" class="status"></p>
    </section>

    <section class="card">
      <h2>Danh sách lịch hẹn</h2>
      <ul id="bookingList" class="booking-list"></ul>
    </section>
  </main>
`;

const bookingForm = document.getElementById('bookingForm');
const serviceSelect = document.getElementById('serviceSelect');
const bookingList = document.getElementById('bookingList');
const statusEl = document.getElementById('status');

const db = {
  getBookings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },
  saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  },
  createBooking(payload) {
    const bookings = this.getBookings();
    const service = services.find((item) => item.id === Number(payload.serviceId));
    const booking = {
      id: Date.now(),
      customerName: payload.customerName,
      phone: payload.phone,
      appointmentTime: payload.appointmentTime,
      serviceName: service?.name || 'Khác'
    };
    bookings.push(booking);
    this.saveBookings(bookings);
  },
  deleteBooking(id) {
    const bookings = this.getBookings().filter((item) => item.id !== id);
    this.saveBookings(bookings);
  }
};

function loadServices() {
  serviceSelect.innerHTML = services
    .map((service) => `<option value="${service.id}">${service.name} (${service.duration} phút)</option>`)
    .join('');
}

function renderBookings() {
  const bookings = db.getBookings();
  bookingList.innerHTML = bookings.length
    ? bookings
        .map(
          (booking) => `<li>
              <div>
                <strong>${booking.customerName}</strong> - ${booking.serviceName}<br />
                <small>${booking.phone} • ${new Date(booking.appointmentTime).toLocaleString('vi-VN')}</small>
              </div>
              <button data-id="${booking.id}" class="delete-btn">Hủy</button>
            </li>`
        )
        .join('')
    : '<li>Chưa có lịch hẹn nào.</li>';
}

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  db.createBooking(Object.fromEntries(formData.entries()));
  bookingForm.reset();
  statusEl.textContent = 'Đặt lịch thành công!';
  renderBookings();
});

bookingList.addEventListener('click', (event) => {
  const button = event.target.closest('.delete-btn');
  if (!button) return;
  db.deleteBooking(Number(button.dataset.id));
  renderBookings();
});

loadServices();
renderBookings();
