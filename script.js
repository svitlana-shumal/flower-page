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
  const headerHeight = header.offsetHeight;
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

if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
