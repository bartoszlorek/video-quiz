export function exitFullscreen(video, callback) {
  if (isFullscreenEnabled()) {
    exitFullscreenNative(window.document);
    exitFullscreenNative(video);
    callback();
  } else {
    exitFullscreenFallback(video, callback);
  }
}

function exitFullscreenNative(element) {
  try {
    (
      element.exitFullscreen ||
      element.webkitCancelFullScreen ||
      element.webkitExitFullscreen ||
      element.mozCancelFullScreen ||
      element.msExitFullscreen
    ).call(element);
  } catch {}
}

function exitFullscreenFallback(video, callback) {
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

function isFullscreenEnabled() {
  const doc = window.document;
  return !!(
    doc.fullscreenEnabled ||
    doc.mozFullscreenEnabled ||
    doc.webkitFullscreenEnabled ||
    doc.msFullscreenEnabled
  );
}
