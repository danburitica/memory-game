const fetchCardsImages = async () => {
  try {
    const response = await fetch(
      "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
    );
    const { entries } = await response.json();
    return entries.map((entrie) => {
      return {
        title: entrie?.fields?.image?.title,
        src: entrie?.fields?.image?.url,
      };
    });
  } catch (error) {
    console.error("Error fetching cards images: ", error);
  }
};
export default fetchCardsImages;
