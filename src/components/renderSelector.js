import { createAndAppend } from '../lib/createAndAppend.js';
import { fetchJSON } from '../lib/fetchJSON.js';
import { fakeWait } from '../lib/fakeWait.js';

const HYF_REPOS_URL =
  'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

export async function renderSelector(parent, onSelectRepo) {
  // step 1. create the dom structure
  const header = createAndAppend('header', parent, {
    class: 'header',
  });
  createAndAppend('div', header, { text: 'HackYourFuture' });

  const loader = createAndAppend('span', header, {
    text: 'Loading repos (fake timed ;))...',
  });
  loader.style.marginLeft = '20px';

  // step 2. fetch the repos and add them
  try {
    await fakeWait(500);
    const repos = await fetchJSON(HYF_REPOS_URL);
    repos.sort((a, b) => a.name.localeCompare(b.name));

    loader.remove();

    const select = createAndAppend('select', header, {
      class: 'repo-select',
      autofocus: 'autofocus',
    });

    repos.forEach((repo, index) => {
      createAndAppend('option', select, {
        text: repo.name,
        value: index,
      });
    });

    // When the user select another one, call the callback
    select.addEventListener('change', () => {
      const index = parseInt(select.value);
      onSelectRepo(repos[index]);
    });

    // Also immediately call the callback for the first one
    onSelectRepo(repos[0]);
  } catch (error) {
    loader.textContent = 'Could not fetch repos :( Please try again later';
  }
}
