import { searchInput, allSulimbangItems } from "./sulimbang.astro.0.mjs";

searchInput.addEventListener('input', (e) => {
const query = e.target.value.toLowerCase();

allSulimbangItems.forEach(item => {
const title = item.querySelector('#gazetteTitle').textContent.toLowerCase();
const year = item.querySelector('#gazetteDate').textContent.toLowerCase();

item.style.display = (title.includes(query) || year.includes(query)) ? 'block' : 'none';
});
});
