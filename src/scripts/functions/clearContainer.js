export function clearContainer(containerYouNeedToClear) {
  while (containerYouNeedToClear.firstChild) {
    containerYouNeedToClear.removeChild(containerYouNeedToClear.firstChild);
  }
}
