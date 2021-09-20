export default function initTabNav() {
  const tabmenu = document.querySelectorAll("[data-tab='menu'] li");
  const tabcontent = document.querySelectorAll("[data-tab='content'] section");

  function activeTab(index) {
    tabcontent.forEach((content) => content.classList.remove('ativo'));
    const direction = tabcontent[index].dataset.anime;

    tabcontent[index].classList.add('ativo');
    tabcontent[index].classList.add(direction);
  }

  tabmenu.forEach((li, i) => {
    li.addEventListener('click', () => activeTab(i));
  });
}
