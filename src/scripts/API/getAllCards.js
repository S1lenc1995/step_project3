import { URI } from "./sendCard.js";
export async function getAllCards(token) {
  const response = await fetch(URI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.text();
  return JSON.parse(data);
}
