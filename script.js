const menuLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section, footer');
const progressBar = document.querySelector('#progressBar');
const scrollBtn = document.querySelector('#scrollTopBtn');
const header = document.querySelector('header');

function updateProgress(progress) {
  if (!progressBar) return;
  progressBar.style.width = `${progress}%`;
}

function updateScrollBtn(scrollTop) {
  if (!scrollBtn) return;

  scrollBtn.classList.toggle('hidden', scrollTop <= 100);
}

function getActiveSection(scrollTop, docHeight) {
  if (scrollTop >= docHeight - 2) {
    return 'contacts';
  }
  const headerHeight = header?.offsetHeight || 0;
  let currentSectionId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (
      scrollTop + headerHeight >= sectionTop &&
      scrollTop + headerHeight < sectionBottom
    ) {
      currentSectionId = section.id;
    }
  });

  return currentSectionId;
}

function updateActiveMenu(activeId) {
  menuLinks.forEach((link) => {
    const linkId = link.getAttribute('href').replace('#', '');

    if (linkId === activeId) {
      link.classList.add('underline', 'font-semibold');
    } else {
      link.classList.remove('underline', 'font-semibold');
    }
  });
}

function updateUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  updateProgress(progress);
  updateScrollBtn(scrollTop);

  const activeId = getActiveSection(scrollTop, docHeight);
  updateActiveMenu(activeId);
}

window.addEventListener('scroll', updateUI);

updateUI();

if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// створили Mock API, далі працюємо з цими даними

const flowers = [
  { id: 1, name: 'Орхідея', color: 'жовтий' },
  { id: 2, name: 'Троянда', color: 'червоний' },
  { id: 3, name: 'Фіалка', color: 'блакитний' },
  { id: 4, name: 'Спатіфілум', color: 'білий' },
];

const output = document.getElementById('output');

function fetchFlower(id) {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 1500) + 500;

    setTimeout(() => {
      const flower = flowers.find((f) => f.id === id);
      if (flower) {
        resolve(flower);
      } else {
        reject('Квітку не знайдено!');
      }
    }, delay);
  });
}

function renderFlower(flower, duration) {
  output.innerText = `✅ Квітка: ${flower.name}, колір: ${flower.color}\n Час: ${duration} ms`;
}

function renderError(err, duration) {
  output.innerText = `❌ Помилка: ${err}\n Час: ${duration} ms`;
}

function renderManyFlowers(flowers) {
  output.innerText =
    '✅ Отримані квіти:\n' +
    flowers.map((flower) => `${flower.name} (${flower.color})`).join('\n');
}

function renderNoFlowers() {
  output.innerText = '❌ Жодної квітки не вдалося отримати';
}

function handleGetFlower() {
  const start = Date.now();
  output.innerText = 'Завантаження...';

  const randomId = Math.floor(Math.random() * 5) + 1;
  fetchFlower(randomId)
    .then((flower) => {
      const duration = Date.now() - start;
      renderFlower(flower, duration);
    })
    .catch((err) => {
      const duration = Date.now() - start;
      renderError(err, duration);
    });
}

function handleGetManyFlowers() {
  output.innerText = 'Завантаження...';

  Promise.allSettled([fetchFlower(1), fetchFlower(2), fetchFlower(99)]).then(
    (results) => {
      const successful = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value);

      if (successful.length > 0) {
        renderManyFlowers(successful);
      } else {
        renderNoFlowers();
      }
    }
  );
}

document
  .getElementById('getFlowerBtn')
  .addEventListener('click', handleGetFlower);

document
  .getElementById('getManyFlowersBtn')
  .addEventListener('click', handleGetManyFlowers);
