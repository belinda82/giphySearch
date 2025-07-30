const API_KEY = "FU6wfHd5nqgnOSlcYCpDrkJoDq8jHJYk";

export const fetchGifs = async (query = "", offset = 0) => {
  const endpoint = query
    ? `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(
        query
      )}&offset=${offset}&limit=12&api_key=${API_KEY}`
    : `https://api.giphy.com/v1/gifs/trending?offset=${offset}&limit=12&api_key=${API_KEY}`;

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Failed to fetch GIFs");
  const data = await res.json();
  return data.data;
};
