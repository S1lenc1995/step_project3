export async function editCardRequest(token, newCard, cardId) {
  const response = await fetch(
    `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCard),
    }
  );
  const data = await response.json();
  return data;
}
