export function isFullscreenEnabled() {
  const doc = window.document;
  return !!(
    doc.fullscreenEnabled ||
    doc.mozFullscreenEnabled ||
    doc.webkitFullscreenEnabled ||
    doc.msFullscreenEnabled
  );
}

export function isFullscreen() {
  const doc = window.document;
  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  );
}

export function exitFullscreen() {
  const doc = window.document;
  (
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen
  ).call(doc);
}

export function exitFullscreenFallback(video, callback) {
  const parent = video.parentElement;
  const sibling = video.nextElementSibling;

  // removing a video from the DOM tree
  // for a second exits fullscreen mode
  parent.removeChild(video);

  requestAnimationFrame(() => {
    parent.insertBefore(video, sibling);
    callback();
  });
}
