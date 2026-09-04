// Audio file mapping configuration
const audioMap = {
  '1': '829855__silverillusionist__horror-sting-slide-down-bass-strings.wav',
  '2': 'trumpet-fanfare.wav',
  '3': 'Fahh Sound Effect.mp3',
  '4': '',
  '5': '',
  '6': ''
};

// Get DOM elements
const player = document.getElementById('player');
const status = document.getElementById('status');
const keyEls = document.querySelectorAll('.sound-button');
const volumeSlider = document.getElementById('masterVolume');
const volumeValue = document.getElementById('volumeValue');
const darkModeToggle = document.getElementById('darkModeToggle');
const loopToggle = document.getElementById('loopToggle');
const equalizerToggle = document.getElementById('equalizerToggle');
const waveform = document.getElementById('waveform');

// State management
let isLooping = false;
let currentEqualizer = 'normal';
let isDarkMode = false;
let currentlyPlaying = null;

// Initialize volume
player.volume = volumeSlider.value / 100;

// Dark mode setup
if (localStorage.getItem('darkMode') === 'true') {
  isDarkMode = true;
  document.body.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️ Light Mode';
}

console.log('Audio mapper loaded!');
console.log('Audio map:', audioMap);

// Volume control
volumeSlider.addEventListener('input', (e) => {
  player.volume = e.target.value / 100;
  volumeValue.textContent = e.target.value + '%';
  console.log('Volume set to:', e.target.value + '%');
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('darkMode', isDarkMode);
  console.log('Dark mode:', isDarkMode ? 'ON' : 'OFF');
});

// Loop toggle
loopToggle.addEventListener('click', () => {
  isLooping = !isLooping;
  player.loop = isLooping;
  loopToggle.classList.toggle('active');
  loopToggle.textContent = isLooping ? '🔄 Loop: ON' : '🔄 Loop: OFF';
  console.log('Loop:', isLooping ? 'ON' : 'OFF');
});

// Equalizer toggle
equalizerToggle.addEventListener('click', () => {
  const equalizers = ['normal', 'bass', 'treble', 'vocal'];
  const equalizerIndex = equalizers.indexOf(currentEqualizer);
  currentEqualizer = equalizers[(equalizerIndex + 1) % equalizers.length];
  
  const labels = {
    'normal': '🎛️ Normal',
    'bass': '🔊 Bass Boost',
    'treble': '✨ Treble',
    'vocal': '🎤 Vocal'
  };
  
  equalizerToggle.textContent = labels[currentEqualizer];
  applyEqualizer(currentEqualizer);
  console.log('Equalizer:', currentEqualizer);
});

// Apply equalizer effect
function applyEqualizer(type) {
  // Basic equalizer simulation through volume adjustments
  const equalizerSettings = {
    'normal': 1.0,
    'bass': 1.1,
    'treble': 0.9,
    'vocal': 0.95
  };
  
  // In a real scenario, you'd use Web Audio API for proper EQ
  player.volume = (volumeSlider.value / 100) * (equalizerSettings[type] || 1.0);
}

// Show/hide waveform
function showWaveform(show) {
  if (show) {
    waveform.classList.remove('hidden');
  } else {
    waveform.classList.add('hidden');
  }
}

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
    // Stop currently playing sound
    if (currentlyPlaying && currentlyPlaying !== key) {
      player.pause();
      player.currentTime = 0;
      document.querySelector(`.sound-button[data-key="${currentlyPlaying}"]`)?.classList.remove('active');
      showWaveform(false);
    }

    status.textContent = '⏳ Loading...';
    console.log('Setting player source to:', audioFile);
    player.src = audioFile;
    
    // Add visual feedback
    if (keyEl) {
      keyEl.classList.add('active');
      keyEl.classList.add('ripple');
    }
    
    // Show waveform
    showWaveform(true);
    currentlyPlaying = key;
    
    console.log('Attempting to play audio...');
    await player.play();
    status.textContent = `▶️ Now Playing - Key ${key}`;
    console.log('Audio playing successfully!');
    
    // Remove ripple effect after animation
    if (keyEl) {
      setTimeout(() => keyEl.classList.remove('ripple'), 600);
    }

    // Handle when audio ends
    player.onended = () => {
      showWaveform(false);
      status.textContent = '✅ Finished playing';
      if (keyEl) {
        keyEl.classList.remove('active');
      }
      currentlyPlaying = null;
    };

  } catch (err) {
    status.textContent = '🔇 Click the page first, then try again';
    console.error('Audio playback error:', err);
    if (keyEl) {
      keyEl.classList.remove('active');
    }
    showWaveform(false);
  }
}

// Listen for keyboard input (1-6 keys)
document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
  if (e.key >= '1' && e.key <= '6') {
    playForKey(e.key);
  }
});

// Listen for button clicks
keyEls.forEach(el => {
  el.addEventListener('click', () => {
    console.log('Button clicked:', el.dataset.key);
    playForKey(el.dataset.key);
  });

  // Add hover tooltip
  el.addEventListener('mouseenter', (e) => {
    const key = el.dataset.key;
    const audioFile = audioMap[key];
    if (!audioFile) {
      el.title = `Press ${key} to play (No sound assigned yet)`;
    }
  });
});

console.log('Audio mapper initialized with all features!');
console.log('Features: Volume Control, Dark Mode, Loop Toggle, Equalizer, Waveform Animation, Ripple Effects');
