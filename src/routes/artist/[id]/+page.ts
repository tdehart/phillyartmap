import { error } from '@sveltejs/kit';
const API_URL = 'https://www.philart.net/api';

export async function load({ params }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    error(500, 'Invalid artist ID');
  }

  const response = await fetch(`${API_URL}/artists/${params.id}.json`);
  const json = await response.json();

  if (response.ok) {
    return {
      name: json.head.title,
      art: json.body.art,
    }
  }

  return error(response.status, json.message);
}
