import { createAndAppend } from '../lib/createAndAppend.js';
import { fetchJSON } from '../lib/fetchJSON.js';

export async function renderContributors(parent, repo) {
  parent.innerHTML = '';

  const container = createAndAppend('section', parent, {
    class: 'contributors-container whiteframe',
  });

  const ul = createAndAppend('ul', container, {
    class: 'contributor-list',
  });

  try {
    const url = repo.contributors_url;
    const contributors = await fetchJSON(url);

    contributors.forEach((contributor) => {
      const li = createAndAppend('li', ul);
      const a = createAndAppend('a', li, {
        href: contributor.html_url,
        class: 'contributor-item',
        target: '_blank',
      });
      createAndAppend('img', a, {
        src: contributor.avatar_url,
        alt: `avatar for ${contributor.login}`,
        class: 'contributor-avatar',
        height: 48,
        loading: 'lazy', // try the new lazy loading from Chrome 76
      });
      const div = createAndAppend('div', a, {
        class: 'contributor-data',
      });
      createAndAppend('div', div, { text: contributor.login });
      createAndAppend('div', div, {
        text: contributor.contributions,
        class: 'contributor-badge',
      });
    });
  } catch (error) {
    // ...
  }
}
