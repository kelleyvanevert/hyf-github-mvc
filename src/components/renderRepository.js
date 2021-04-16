import { createAndAppend } from '../lib/createAndAppend.js';

function addRow(tbody, label) {
  const row = createAndAppend('tr', tbody);
  createAndAppend('th', row, { text: `${label}:`, class: 'label' });
  return createAndAppend('td', row);
}

export function renderRepository(parent, repo) {
  parent.innerHTML = '';

  // Set up fixed parts
  const container = createAndAppend('section', parent, {
    class: 'repo-container whiteframe',
  });

  const cardContainer = createAndAppend('div', container, {
    class: 'card-container',
  });

  const table = createAndAppend('table', cardContainer);
  const tbody = createAndAppend('tbody', table);

  const repository = addRow(tbody, 'Repository');
  const description = addRow(tbody, 'Description');
  const forks = addRow(tbody, 'Forks');
  const updated = addRow(tbody, 'Updated');

  repository.href = repo.html_url;
  repository.textContent = repo.name;
  description.textContent = repo.description;
  forks.textContent = repo.forks;
  updated.textContent = new Date(repo.updated_at).toLocaleString();
}
