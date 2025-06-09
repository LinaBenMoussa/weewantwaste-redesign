export async function getSkipsByLocation(postcode, area = '') {
  try {
    const url = new URL('https://app.wewantwaste.co.uk/api/skips/by-location');
    url.searchParams.append('postcode', postcode);
    if (area) {
      url.searchParams.append('area', area);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur API getSkipsByLocation:', error);
    throw error;
  }
}