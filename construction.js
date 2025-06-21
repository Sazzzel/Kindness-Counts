// Modal logic with animation
function showModal(modal) {
  modal.classList.add('show');
  modal.classList.remove('hide');
  modal.style.display = 'block';
  setTimeout(() => { modal.style.opacity = '1'; }, 10);
}
function hideModal(modal) {
  modal.classList.add('hide');
  modal.classList.remove('show');
  modal.style.opacity = '0';
  setTimeout(() => { modal.style.display = 'none'; }, 450);
}

// Ticker logic only (calendar removed)
let eventsArray = [];
fetch('ticker.json')
  .then(res => res.json())
  .then(events => {
    eventsArray = events;
    // Ticker
    const ticker = document.getElementById('eventsTicker');
    if (ticker && events.length) {
      ticker.innerHTML = events.map((e, i) => `<span class='ticker-event' tabindex='0' data-index='${i}'>${e.date}: ${e.title}</span>`).join(' &nbsp; | &nbsp; ');
    } else if (ticker) {
      ticker.textContent = 'No upcoming events.';
    }
    // Ticker event click
    document.querySelectorAll('.ticker-event').forEach(el => {
      el.onclick = el.onkeyup = function(e) {
        if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
          const idx = el.getAttribute('data-index');
          showEventModal(eventsArray[idx]);
        }
      };
    });
  });

// Event Modal logic
const eventModal = document.getElementById('eventModal');
const closeEvent = document.getElementById('closeEvent');
function showEventModal(event) {
  document.getElementById('eventTitle').textContent = event.title;
  document.getElementById('eventModalBody').innerHTML = `<div><strong>Date:</strong> ${event.date} ${event.time}<br><strong>Location:</strong> ${event.location}<br><br>${event.description}</div>`;
  showModal(eventModal);
}
closeEvent.onclick = () => hideModal(eventModal);
window.addEventListener('click', function(event) {
  if (event.target === eventModal) hideModal(eventModal);
});

const privacyBtn = document.getElementById('privacyBtn');
const privacyModal = document.getElementById('privacyModal');
const closePrivacy = document.getElementById('closePrivacy');
const safeguardingBtn = document.getElementById('safeguardingBtn');
const safeguardingModal = document.getElementById('safeguardingModal');
const closeSafeguarding = document.getElementById('closeSafeguarding');
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeContact = document.getElementById('closeContact');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

privacyBtn.onclick = () => showModal(privacyModal);
closePrivacy.onclick = () => hideModal(privacyModal);
safeguardingBtn.onclick = () => showModal(safeguardingModal);
closeSafeguarding.onclick = () => hideModal(safeguardingModal);
contactBtn.onclick = () => showModal(contactModal);
closeContact.onclick = () => hideModal(contactModal);

window.onclick = function(event) {
  if (event.target === privacyModal) hideModal(privacyModal);
  if (event.target === contactModal) hideModal(contactModal);
  if (event.target === safeguardingModal) hideModal(safeguardingModal);
};

tabBtns.forEach(btn => {
  btn.onclick = function() {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  };
});

// Ensure modals are hidden on load
[privacyModal, safeguardingModal, contactModal].forEach(m => {
  m.classList.remove('show', 'hide');
  m.style.display = 'none';
  m.style.opacity = '0';
});

// Burger menu logic
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
if (burgerBtn && navMenu) {
  burgerBtn.addEventListener('click', function() {
    const expanded = burgerBtn.getAttribute('aria-expanded') === 'true';
    burgerBtn.setAttribute('aria-expanded', !expanded);
    if (navMenu.hasAttribute('hidden')) {
      navMenu.removeAttribute('hidden');
    } else {
      navMenu.setAttribute('hidden', '');
    }
  });
  // Close nav on menu item click (mobile UX)
  navMenu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      navMenu.setAttribute('hidden', '');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
