const video = document.getElementById("videoPlayer");
const statusEl = document.getElementById("status");
let hls = null;

function setStatus(message) {
  statusEl.textContent = `Status: ${message}`;
}

function destroyHlsIfNeeded() {
  if (hls) {
    hls.destroy();
    hls = null;
  }
}

function loadStream(url) {
  if (!url) {
    setStatus("empty URL");
    return;
  }

  destroyHlsIfNeeded();

  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    setStatus(`loaded natively: ${url}`);
  } else if (window.Hls && Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      setStatus(`loaded via hls.js: ${url}`);
    });
    hls.on(Hls.Events.ERROR, (event, data) => {
      setStatus(`HLS error: ${data && data.details ? data.details : "unknown"}`);
    });
  } else {
    setStatus("HLS is not supported in this browser");
  }
}

function loadFromInput(inputId) {
  const input = document.getElementById(inputId);
  loadStream(input.value.trim());
}

function getPlaylistUrls() {
  return [
    document.getElementById("url1").value.trim(),
    document.getElementById("url2").value.trim()
  ].filter(Boolean);
}

document.getElementById("playBtn").addEventListener("click", () => {
  video.play().catch(() => setStatus("play failed (autoplay policy or stream issue)"));
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  video.pause();
  setStatus("paused");
});

document.getElementById("stopBtn").addEventListener("click", () => {
  video.pause();
  video.currentTime = 0;
  setStatus("stopped (returned to 0s)");
});

document.getElementById("forwardBtn").addEventListener("click", () => {
  const maxDuration = Number.isFinite(video.duration) ? video.duration : video.currentTime + 5;
  const nextTime = Math.min(video.currentTime + 5, maxDuration);
  video.currentTime = nextTime;
  setStatus(`jumped forward to ${Math.floor(video.currentTime)}s`);
});

document.getElementById("backwardBtn").addEventListener("click", () => {
  video.currentTime = Math.max(video.currentTime - 5, 0);
  setStatus(`jumped backward to ${Math.floor(video.currentTime)}s`);
});

document.querySelectorAll(".load-btn").forEach((button) => {
  button.addEventListener("click", () => {
    loadFromInput(button.dataset.input);
  });
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  const urls = getPlaylistUrls();
  if (!urls.length) {
    setStatus("no playlist entries to shuffle");
    return;
  }

  const randomUrl = urls[Math.floor(Math.random() * urls.length)];
  loadStream(randomUrl);
  video.play().catch(() => setStatus("shuffle loaded stream; press Play if blocked by autoplay policy"));
});

video.addEventListener("ended", () => {
  setStatus("playback ended");
});

// Default stream load for quick start.
loadFromInput("url1");
