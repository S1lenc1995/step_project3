export async function getOneCard(token, cardId) {
  const response = await fetch(
    `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.text();
  return data;
}
