// Знаходимо всі посилання меню навігації
const menuLinks = document.querySelectorAll('header nav a');

// console.log(menuLinks);

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuLinks.forEach((item) => {
      item.classList.remove('underline', 'font-semibold');
      // Прибрали активний стан з усіх пунктів меню
    });
    link.classList.add('underline', 'font-semibold');
    //Додали активний стан до того пункту, по якому клікнули
  });
});
