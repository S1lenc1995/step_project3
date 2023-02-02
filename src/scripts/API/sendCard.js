export const URI = "https://ajax.test-danit.com/api/v2/cards";
export async function sendCard(token, card) {
  const response = await fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(card),
  });
  const data = await response.text();
  return data;
} 
