// Audio file mapping configuration
const audioMap = {
  '1': 'magic-intro.wav',
  '2': '829855__silverillusionist__horror-sting-slide-down-bass-strings.wav',
  '3': 'Fahh Sound Effect.mp3'
};

// Get DOM elements
const player = document.getElementById('player');
const status = document.getElementById('status');
const keyEls = document.querySelectorAll('.sound-button');

console.log('Audio mapper loaded!');
console.log('Audio map:', audioMap);
console.log('Player element:', player);
console.log('Status element:', status);
console.log('Key elements:', keyEls);

// Function to play audio for a given key
async function playForKey(key) {
  console.log('Playing key:', key);
  
  const audioFile = audioMap[key];
  const keyEl = document.querySelector(`.sound-button[data-key="${key}"]`);
  
  console.log('Audio file:', audioFile);
  console.log('Key element:', keyEl);
  
  if (!audioFile) {
    status.textContent = '❌ No sound mapped to that key';
    console.error('No audio file mapped for key:', key);
    return;
  }

  try {
    status.textContent = '⏳ Loading...';
    console.log('Setting player source to:', audioFile);
    player.src = audioFile;
    
    // Add visual feedback
    if (keyEl) {
      keyEl.classList.add('active');
    }
    
    console.log('Attempting to play audio...');
    await player.play();
    status.textContent = `▶️ Playing sound for key ${key}`;
    console.log('Audio playing successfully!');
    
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

// Listen for keyboard input (1, 2, and 3 keys)
document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
  if (e.key === '1' || e.key === '2' || e.key === '3') {
    playForKey(e.key);
  }
});

// Listen for button clicks
keyEls.forEach(el => {
  el.addEventListener('click', () => {
    console.log('Button clicked:', el.dataset.key);
    playForKey(el.dataset.key);
  });
});

console.log('Audio mapper initialized. Press 1, 2, or 3 or click the buttons to play sounds.');
