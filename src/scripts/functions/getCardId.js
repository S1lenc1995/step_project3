export function getCardId(e) {
  const id = e.composedPath()[2].id;
  return id;
}
export function getCardIdOnDelete(e) {
  const id = e.composedPath()[1].id;
  return id;
}
