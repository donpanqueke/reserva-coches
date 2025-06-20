// Datos de los autos
const carList = [
  { id: 'sedan1', name: 'Sedán Económico', price: 40, type: 'sedan', image: 'https://via.placeholder.com/300x150?text=Sedán+Económico', info: '4 pasajeros | Automático' },
  { id: 'suv1', name: 'SUV Familiar', price: 70, type: 'suv', image: 'https://via.placeholder.com/300x150?text=SUV+Familiar', info: '7 pasajeros | Automático' },
  { id: 'van1', name: 'Van Turística', price: 90, type: 'van', image: 'https://via.placeholder.com/300x150?text=Van+Turística', info: '12 pasajeros | Manual' },
  { id: 'sedan2', name: 'Sedán Premium', price: 55, type: 'sedan', image: 'https://via.placeholder.com/300x150?text=Sedán+Premium', info: '5 pasajeros | Automático' }
];

const carAvailability = JSON.parse(localStorage.getItem('carAvailability')) || {
  sedan1: true,
  sedan2: true,
  suv1: true,
  van1: true
};

// Mostrar tarjetas
function renderCars() {
  const grid = document.getElementById('carGrid');
  grid.innerHTML = '';
  carList.forEach(car => {
    const available = carAvailability[car.id];
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.price = car.price;
    card.dataset.type = car.type;
    card.dataset.id = car.id;
    card.dataset.available = available;

    card.innerHTML = `
      <img src="${car.image}" alt="${car.name}">
      <div class="card-content">
        <h3>${car.name}</h3>
        <p class="price">$${car.price}/día</p>
        <p class="info">${car.info}</p>
        <button class="reserve-button" ${!available ? 'disabled' : ''}>
          ${available ? 'Reservar Ahora' : 'No Disponible'}
        </button>
      </div>
    `;

    card.querySelector('.reserve-button').addEventListener('click', () => {
      if (available) scrollToReservation();
    });

    grid.appendChild(card);
  });
}

// Scroll suave
function scrollToReservation() {
  document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
}

// Carrusel
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
setInterval(nextSlide, 5000);

// Filtros
document.getElementById('filterForm').addEventListener('change', () => {
  const selectedPrice = document.getElementById('priceRange').value;
  const selectedType = document.getElementById('carTypeFilter').value;
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const price = parseFloat(card.dataset.price);
    const type = card.dataset.type;
    const available = card.dataset.available === "true";
    let priceMatch = true, typeMatch = true;

    if (selectedPrice !== 'all') {
      const [min, max] = selectedPrice.split('-').map(Number);
      priceMatch = max ? price >= min && price <= max : price <= min;
    }

    if (selectedType !== 'all') {
      typeMatch = type === selectedType;
    }

    card.classList.toggle('hidden', !(priceMatch && typeMatch && available));
  });
});

// Formulario de reserva
document.getElementById('reservationForm').addEventListener('submit', e => {
  e.preventDefault();
  const start = new Date(document.getElementById('startDate').value);
  const end = new Date(document.getElementById('endDate').value);
  const type = document.getElementById('carTypeReservation').value;

  if (end <= start) {
    alert('La fecha de fin debe ser posterior a la fecha de inicio.');
    return;
  }

  const availableCar = carList.find(car => car.type === type && carAvailability[car.id]);
  if (!availableCar) {
    alert(`No hay vehículos disponibles del tipo ${type}.`);
    return;
  }

  carAvailability[availableCar.id] = false;
  localStorage.setItem('carAvailability', JSON.stringify(carAvailability));
  renderCars();
  alert('¡Reserva enviada con éxito!');
  e.target.reset();
});

// Menú hamburguesa
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
  renderCars();
});
