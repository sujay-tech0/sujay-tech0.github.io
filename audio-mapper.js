// Audio file mapping configuration
const audioMap = {
  '1': 'magic-intro.wav',
  '2': 'trumpet-fanfare.wav'
};

// Get DOM elements
const player = document.getElementById('player');
const status = document.getElementById('status');
const keyEls = document.querySelectorAll('.key');

// Function to play audio for a given key
async function playForKey(key) {
  const audioFile = audioMap[key];
  const keyEl = document.querySelector(`.key[data-key="${key}"]`);
  
  if (!audioFile) {
    status.textContent = '❌ No sound mapped to that key';
    return;
  }

  try {
    status.textContent = '⏳ Loading...';
    player.src = audioFile;
    
    // Add visual feedback
    if (keyEl) {
      keyEl.classList.add('active');
    }
    
    await player.play();
    status.textContent = `▶️ Playing sound for key ${key}`;
    
    // Remove visual feedback after a short delay
    if (keyEl) {
      setTimeout(() => keyEl.classList.remove('active'), 150);
    }
  } catch (err) {
    status.textContent = '🔇 Click the page first, then try again';
    console.error('Audio playback error:', err);
    if (keyEl) {
      keyEl.classList.remove('active');
    }
  }
}

// Listen for keyboard input (1 and 2 keys)
document.addEventListener('keydown', (e) => {
  if (e.key === '1' || e.key === '2') {
    playForKey(e.key);
  }
});

// Listen for button clicks
keyEls.forEach(el => {
  el.addEventListener('click', () => {
    playForKey(el.dataset.key);
  });
});

// Optional: Log initialization
console.log('Audio mapper loaded. Press 1 or 2 or click the buttons to play sounds.');
