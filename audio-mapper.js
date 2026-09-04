// Audio file mapping configuration
const audioMap = {
  '1': 'magic-intro.wav',
  '2': 'trumpet-fanfare.wav'
};

// Get the audio player element
const player = document.getElementById('player');
const status = document.getElementById('status');

// Function to play audio for a given key
async function playForKey(key) {
  const audioFile = audioMap[key];
  const keyEl = document.querySelector(`.key[data-key="${key}"]`);
  
  if (!audioFile) {
    status.textContent = 'No sound mapped to that key';
    return;
  }

  try {
    status.textContent = 'Loading...';
    player.src = audioFile;
    await player.play();
    status.textContent = `Playing sound for key ${key}`;

    if (keyEl) {
      keyEl.classList.add('active');
      setTimeout(() => keyEl.classList.remove('active'), 150);
    }
  } catch (err) {
    status.textContent = 'Could not play sound (click the page once first).';
    console.error('Audio playback error:', err);
  }
}

// Add event listeners for keyboard input
document.addEventListener('keydown', (e) => {
  if (e.key === '1' || e.key === '2') {
    playForKey(e.key);
  }
});

// Add event listeners for button clicks
const keyEls = document.querySelectorAll('.key');
keyEls.forEach(el => {
  el.addEventListener('click', () => playForKey(el.dataset.key));
});
