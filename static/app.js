const categories = [
  { name: 'Music', icon: '🎵', description: 'Live concerts, festivals and performances', events: 4 },
  { name: 'Technology', icon: '💻', description: 'Hackathons, workshops and tech talks', events: 4 },
  { name: 'Sports', icon: '⚽', description: 'Tournament nights and fitness events', events: 3 },
  { name: 'Arts & Culture', icon: '🎨', description: 'Exhibitions, theater and cultural shows', events: 3 }
];

const events = [
  {
    id: 'evt_1',
    title: 'Mumbai Music Festival 2026',
    city: 'Mumbai',
    date: '30 June 2026',
    price: '₹1,500',
    description: 'A three-day festival with live bands, food courts and immersive art installations.',
    badge: 'Featured'
  },
  {
    id: 'evt_2',
    title: 'Bollywood Night Live',
    city: 'Mumbai',
    date: '18 July 2026',
    price: '₹2,000',
    description: 'An enchanting evening of Bollywood classics with a 50-piece orchestra.',
    badge: 'Trending'
  },
  {
    id: 'evt_3',
    title: 'Indie Waves Pune',
    city: 'Pune',
    date: '25 July 2026',
    price: '₹800',
    description: 'Independent music, craft beer and acoustic sessions in an intimate venue.',
    badge: 'New'
  },
  {
    id: 'evt_4',
    title: 'Startup Summit 2026',
    city: 'Bengaluru',
    date: '12 August 2026',
    price: '₹1,200',
    description: 'Networking, investor talks and product launches for founders and teams.',
    badge: 'Popular'
  }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Event Attendee',
    text: 'Amazing platform! I discovered so many great events in Mumbai and booking felt effortless.'
  },
  {
    name: 'Rahul Patel',
    role: 'Organizer',
    text: 'As an organizer, this platform has transformed how I manage and promote my events.'
  },
  {
    name: 'Anita Desai',
    role: 'Music Lover',
    text: 'The seat selection experience is fantastic. I always get the best seats for concerts.'
  }
];

const renderCategories = () => {
  const container = document.getElementById('categoriesGrid');
  container.innerHTML = categories.map((item, index) => `
    <div class="col-sm-6 col-lg-3 reveal stagger-${index + 1}">
      <div class="category-card rounded-4 p-4 h-100">
        <div class="display-6">${item.icon}</div>
        <h4 class="mt-3 fw-bold">${item.name}</h4>
        <p class="text-muted mb-2">${item.description}</p>
        <span class="text-primary fw-semibold">${item.events} events available</span>
      </div>
    </div>
  `).join('');
};

const renderHeroCards = () => {
  const container = document.getElementById('heroCards');
  container.innerHTML = events.slice(0, 3).map((event) => `
    <div class="p-3 rounded-3 bg-white/10 text-white">
      <div class="fw-semibold">${event.title}</div>
      <small class="text-white-50">${event.city} • ${event.date}</small>
    </div>
  `).join('');
};

const renderEvents = () => {
  const container = document.getElementById('eventsGrid');
  container.innerHTML = events.map((event, index) => `
    <div class="col-md-6 col-xl-3 reveal stagger-${index + 1}">
      <div class="event-card rounded-4 p-4 h-100">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge text-bg-primary">${event.badge}</span>
          <span class="fw-semibold text-primary">${event.price}</span>
        </div>
        <h4 class="fw-bold">${event.title}</h4>
        <p class="text-muted mb-3">${event.description}</p>
        <div class="text-sm text-muted mb-4">📍 ${event.city} • 🗓 ${event.date}</div>
        <button class="btn btn-outline-primary w-100 open-event" data-id="${event.id}">View Details</button>
      </div>
    </div>
  `).join('');
};

const renderTestimonials = () => {
  const container = document.getElementById('testimonialsGrid');
  container.innerHTML = testimonials.map((item) => `
    <div class="col-md-4">
      <div class="testimonial-card rounded-4 p-4 h-100">
        <div class="text-warning mb-3">★★★★★</div>
        <p class="fst-italic">“${item.text}”</p>
        <div class="fw-bold mt-3">${item.name}</div>
        <div class="text-muted">${item.role}</div>
      </div>
    </div>
  `).join('');
};

const showEventModal = (id) => {
  const event = events.find((item) => item.id === id);
  if (!event) return;

  document.getElementById('eventModalTitle').textContent = event.title;
  document.getElementById('eventModalBody').innerHTML = `
    <p>${event.description}</p>
    <ul class="list-unstyled">
      <li><strong>City:</strong> ${event.city}</li>
      <li><strong>Date:</strong> ${event.date}</li>
      <li><strong>Ticket:</strong> ${event.price}</li>
    </ul>
    <button class="btn btn-primary w-100">Book This Event</button>
  `;

  new bootstrap.Modal(document.getElementById('eventModal')).show();
};

const bindEvents = () => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-event')) {
      showEventModal(e.target.dataset.id);
    }
  });

  const form = document.getElementById('contactForm');
  const messageBox = document.getElementById('formMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageBox.classList.remove('d-none');
    messageBox.textContent = 'Thanks! Your message has been received and we will get back to you shortly.';
    form.reset();
  });
};

window.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderHeroCards();
  renderEvents();
  renderTestimonials();
  bindEvents();

  // Intersection Observer for reveal animations
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
