const API_URL =
  "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20";

const fetchCardsImages = async () => {
  try {
    const response = await fetch(API_URL);
    const { entries } = await response.json();
    return entries.map((entry) => ({
      title: entry?.fields?.image?.title,
      src: entry?.fields?.image?.url,
      alt: entry?.fields?.image?.title,
    }));
  } catch (error) {
    console.error("Error fetching cards images: ", error);
  }
};

export default fetchCardsImages;
