const menuLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section, footer');
const progressBar = document.querySelector('#progressBar');
const scrollBtn = document.querySelector('#scrollTopBtn');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (scrollTop > 200) {
    scrollBtn.classList.remove('hidden');
  } else {
    scrollBtn.classList.add('hidden');
  }

  let currentSectionId = '';

  if (scrollTop >= docHeight - 2) {
    currentSectionId = 'contacts';
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollTop >= sectionTop - 160) {
        currentSectionId = section.getAttribute('id');
      }
    });
  }

  menuLinks.forEach((link) => {
    link.classList.remove('underline', 'font-semibold');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('underline', 'font-semibold');
    }
  });
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
