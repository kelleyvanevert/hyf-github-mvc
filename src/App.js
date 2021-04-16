import { renderSelector } from './components/renderSelector.js';
import { renderRepository } from './components/renderRepository.js';
import { renderContributors } from './components/renderContributors.js';
import { createAndAppend } from './lib/createAndAppend.js';

async function AppComponent() {
  const root = document.getElementById('root');

  renderSelector(root, (repo) => {
    renderRepository(repoContainer, repo);
    renderContributors(contributorsContainer, repo);
  });

  const mainContainer = createAndAppend('div', root);
  mainContainer.style.display = 'flex';

  const repoContainer = createAndAppend('div', mainContainer);
  repoContainer.style.width = '50%';

  const contributorsContainer = createAndAppend('div', mainContainer);
  contributorsContainer.style.width = '50%';
}

window.addEventListener('load', AppComponent);
