const siteData = window.siteData || { categories: [], events: [], testimonials: [] };

const formatDate = (iso, options = {}) => new Date(iso).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', ...options });
const formatTime = (iso) => new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
const findEvent = (id) => siteData.events.find((item) => item.id === id);
const populateCategories = () => {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter) return;
  categoryFilter.innerHTML = '<option value="">All Categories</option>' + siteData.categories.map((cat) => `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`).join('');
};

const createEventCard = (event, index = 0) => {
  return `
    <div class="col-md-6 col-xl-4 reveal stagger-${(index % 6) + 1}">
      <div class="card event-card h-100 overflow-hidden shadow-sm">
        <div class="position-relative overflow-hidden" style="min-height: 240px; background-image:url('${event.image}'); background-size:cover; background-position:center;">
          <div class="position-absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div class="position-absolute top-3 start-3 badge bg-primary">${event.tags[0] || 'Event'}</div>
          <a href="event.html?id=${event.id}" class="stretched-link"></a>
        </div>
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text text-muted">${event.city} • ${formatDate(event.date)} • ₹${event.ticketPricing.regular.toLocaleString()}</p>
        </div>
      </div>
    </div>
  `;
};

const renderHeroCards = () => {
  const heroCards = document.getElementById('heroCards');
  if (!heroCards) return;
  const featured = siteData.events.filter((event) => event.isFeatured).slice(0, 3);
  heroCards.innerHTML = featured.length
    ? featured.map((event) => `
      <div class="p-3 rounded-3 bg-white/10 text-white">
        <div class="fw-semibold">${event.title}</div>
        <small class="text-white-50">${event.city} • ${formatDate(event.date)}</small>
      </div>
    `).join('')
    : '<div class="text-white/70">No featured events available.</div>';
};

const renderHomepageCategories = () => {
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (!categoriesGrid) return;
  categoriesGrid.innerHTML = siteData.categories.map((cat) => `
    <div class="col-sm-6 col-lg-4">
      <div class="category-card p-4 h-100">
        <div class="display-6 mb-3">${cat.icon}</div>
        <h5 class="fw-bold">${cat.name}</h5>
        <p class="text-muted mb-0">${cat.description}</p>
      </div>
    </div>
  `).join('');
};

const renderTestimonials = () => {
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  if (!testimonialsGrid) return;
  testimonialsGrid.innerHTML = siteData.testimonials.map((item) => `
    <div class="col-md-4">
      <div class="testimonial-card rounded-4 p-4 h-100">
        <div class="text-warning mb-3">★★★★★</div>
        <p class="fst-italic mb-4">“${item.text}”</p>
        <div class="fw-bold">${item.name}</div>
        <div class="text-muted">${item.role}</div>
      </div>
    </div>
  `).join('');
};

const renderEvents = () => {
  const eventsGrid = document.getElementById('eventsGrid');
  if (!eventsGrid) return;
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const category = document.getElementById('categoryFilter')?.value || '';
  const city = document.getElementById('cityFilter')?.value.toLowerCase() || '';
  const minPrice = Number(document.getElementById('minPriceFilter')?.value || 0);
  const maxPrice = Number(document.getElementById('maxPriceFilter')?.value || 0);

  const filtered = siteData.events.filter((event) => {
    return (
      (!search || event.title.toLowerCase().includes(search) || event.description.toLowerCase().includes(search)) &&
      (!category || event.category === category) &&
      (!city || event.city.toLowerCase().includes(city)) &&
      (!minPrice || event.ticketPricing.regular >= minPrice) &&
      (!maxPrice || event.ticketPricing.regular <= maxPrice)
    );
  });

  eventsGrid.innerHTML = filtered.length ? filtered.map((event, index) => createEventCard(event, index)).join('') : '<div class="col-12"><div class="card p-5 text-center">No events found. Try adjusting your filters.</div></div>';

  // Re-observe new elements for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  eventsGrid.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
};

const setupEventPage = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const event = findEvent(id);
  if (!event) return;

  document.getElementById('eventTitle').textContent = event.title;
  document.getElementById('eventDescription').textContent = event.description;
  document.getElementById('eventVenue').textContent = `${event.venue.name}, ${event.venue.city}`;
  document.getElementById('eventAddress').textContent = event.venue.address;
  document.getElementById('eventDate').textContent = `${formatDate(event.date)} • ${formatTime(event.date)}`;
  document.getElementById('eventCity').textContent = event.city;
  document.getElementById('eventPrice').textContent = `₹${event.ticketPricing.regular.toLocaleString()}`;
  document.getElementById('eventSeats').textContent = `${event.availableSeats} seats left`;
  document.getElementById('bookLink').setAttribute('href', `booking.html?id=${event.id}`);
  document.getElementById('eventHero').style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('${event.image}')`;

  const reviewsContainer = document.getElementById('eventReviews');
  reviewsContainer.innerHTML = event.reviews.length ? event.reviews.map((review) => `
    <div class="border-bottom pb-3">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <div class="fw-semibold">${review.name}</div>
        <div class="text-warning">${'★'.repeat(review.rating)}</div>
      </div>
      <p class="mb-0 text-muted">${review.comment}</p>
    </div>
  `).join('') : '<p class="text-muted">No reviews yet.</p>';
};

const initializeCalendar = () => {
  const titleEl = document.getElementById('calendarTitle');
  const daysEl = document.getElementById('calendarDays');
  const weekdaysEl = document.getElementById('calendarWeekdays');
  const eventsEl = document.getElementById('calendarEvents');
  if (!titleEl || !daysEl || !weekdaysEl || !eventsEl) return;

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdaysEl.innerHTML = weekDays.map((day) => `<div class="col text-center">${day}</div>`).join('');

  let current = new Date();
  const renderCalendar = () => {
    const year = current.getFullYear();
    const month = current.getMonth();
    titleEl.textContent = current.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    const start = new Date(year, month, 1);
    const days = new Date(year, month + 1, 0).getDate();
    const startDay = start.getDay();
    daysEl.innerHTML = '';

    for (let i = 0; i < startDay; i += 1) {
      daysEl.innerHTML += '<div class="col"></div>';
    }

    for (let d = 1; d <= days; d += 1) {
      const day = new Date(year, month, d);
      const dateKey = day.toISOString().split('T')[0];
      const dayEvents = siteData.events.filter((event) => event.date.startsWith(dateKey));
      const hasEvent = dayEvents.length > 0;
      daysEl.innerHTML += `
        <button class="col btn btn-sm ${hasEvent ? 'btn-primary text-white' : 'btn-light text-muted'}" data-date="${dateKey}">${d}</button>
      `;
    }

    daysEl.querySelectorAll('button[data-date]').forEach((button) => {
      button.addEventListener('click', () => {
        const selectedDate = button.dataset.date;
        const selectedEvents = siteData.events.filter((event) => event.date.startsWith(selectedDate));
        eventsEl.innerHTML = selectedEvents.length
          ? selectedEvents.map((event) => `
              <div class="border rounded-3 p-3">
                <h6 class="mb-1">${event.title}</h6>
                <p class="mb-1 text-muted">${event.venue.city} • ${formatTime(event.date)}</p>
                <a href="event.html?id=${event.id}" class="text-primary text-decoration-none">View details</a>
              </div>
            `).join('')
          : '<p class="text-muted">No events scheduled for this date.</p>';
      });
    });

    eventsEl.innerHTML = '<p class="text-muted">Select a date to view events.</p>';
  };

  document.getElementById('prevMonth')?.addEventListener('click', () => {
    current = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    renderCalendar();
  });

  document.getElementById('nextMonth')?.addEventListener('click', () => {
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    renderCalendar();
  });

  renderCalendar();
};

const initializeBooking = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const event = findEvent(id);
  if (!event) return;

  const seatMap = document.getElementById('seatMap');
  const selectedSeatsEl = document.getElementById('selectedSeats');
  const totalAmountEl = document.getElementById('totalAmount');
  const bookButton = document.getElementById('bookButton');
  if (!seatMap || !selectedSeatsEl || !totalAmountEl || !bookButton) return;

  const seats = Array.from({ length: 40 }, (_, index) => ({ id: index + 1, row: Math.floor(index / 10) + 1, number: (index % 10) + 1, price: [500, 700, 900, 1100][Math.floor(index / 10)], booked: index % 8 === 0 }));
  const selectedSeats = [];

  const updateBooking = () => {
    selectedSeatsEl.innerHTML = selectedSeats.length
      ? selectedSeats.map((seat) => `<div class="d-flex justify-content-between"><span>Row ${seat.row} Seat ${seat.number}</span><span>₹${seat.price}</span></div>`).join('')
      : '<p class="text-muted">No seats selected.</p>';
    totalAmountEl.textContent = `₹${selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}`;
    bookButton.disabled = selectedSeats.length === 0;
  };

  seatMap.innerHTML = seats.map((seat) => `
    <button type="button" class="btn btn-sm ${seat.booked ? 'btn-secondary disabled' : 'btn-outline-primary'}" data-id="${seat.id}">
      ${seat.row}-${seat.number}
    </button>
  `).join(' ');

  seatMap.querySelectorAll('button[data-id]').forEach((button) => {
    const seat = seats.find((item) => item.id.toString() === button.dataset.id);
    if (!seat || seat.booked) return;
    button.addEventListener('click', () => {
      const existingIndex = selectedSeats.findIndex((s) => s.id === seat.id);
      if (existingIndex >= 0) {
        selectedSeats.splice(existingIndex, 1);
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
      } else if (selectedSeats.length < 6) {
        selectedSeats.push(seat);
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');
      }
      updateBooking();
    });
  });

  bookButton.addEventListener('click', () => {
    if (selectedSeats.length === 0) return;
    
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const seatsString = selectedSeats.map(s => `Row ${s.row}, Seat ${s.number}`).join(', ');
    
    // Redirect to ticket page with booking details
    window.location.href = `ticket.html?eventId=${id}&seats=${encodeURIComponent(seatsString)}&totalPrice=${totalPrice}`;
  });
};

const initContactForm = () => {
  const showSuccess = (id) => {
    const alertEl = document.getElementById(id);
    if (alertEl) {
      alertEl.classList.remove('d-none');
    }
  };

  const homepageForm = document.getElementById('contactForm');
  if (homepageForm) {
    homepageForm.addEventListener('submit', (event) => {
      event.preventDefault();
      showSuccess('formMessage');
      homepageForm.reset();
    });
  }

  const contactFormPage = document.getElementById('contactFormPage');
  if (contactFormPage) {
    contactFormPage.addEventListener('submit', (event) => {
      event.preventDefault();
      showSuccess('contactSuccess');
      contactFormPage.reset();
    });
  }
};

const initAuthForms = () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Login successful (demo)');
      window.location.href = 'events.html';
    });
  }
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Account created (demo)');
      window.location.href = 'events.html';
    });
  }
};

const initFilterToggle = () => {
  const filterToggle = document.getElementById('filterToggle');
  const filterPanel = document.getElementById('filterPanel');
  if (!filterToggle || !filterPanel) return;
  filterToggle.addEventListener('click', () => filterPanel.classList.toggle('d-none'));
};

window.addEventListener('DOMContentLoaded', () => {
  populateCategories();
  renderEvents();
  renderHeroCards();
  renderHomepageCategories();
  renderTestimonials();
  initFilterToggle();
  initializeCalendar();
  setupEventPage();
  initializeBooking();
  initContactForm();
  initAuthForms();

  document.querySelectorAll('#searchInput, #categoryFilter, #cityFilter, #minPriceFilter, #maxPriceFilter').forEach((element) => {
    element?.addEventListener('input', () => renderEvents());
  });

  // Initialize intersection observer for animations on all pages
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
});
