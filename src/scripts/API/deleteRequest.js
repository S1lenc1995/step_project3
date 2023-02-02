export async function deleteRequest(token, cardId) {
  const response = await fetch(
    `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(({ status }) => {
    return status;
  });
}
