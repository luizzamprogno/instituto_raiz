export function initMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.querySelector('.nav-list');
  if (!menuToggle || !navList) return;

  navList.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      menuToggle.checked = false;
    }
  });
}
