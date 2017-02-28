function playSound(e) {     
    // Dynamically setting querySelector with ES6 template literal to fill the custom data-attribute
    const AUDIO = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const KEY = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    // Stops the function from running if AUDIO === null (no corresponding data-key to keydown event)
    if (!AUDIO) return;
    // Rewinds sample (allows for key spam)
    AUDIO.currentTime = 0;
    AUDIO.play();
    // add class 'playing' for transition effects
    KEY.classList.add('playing');
};

function removeTransition(e) {
    // Skip if it's not a transform
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
};

const KEYS = document.querySelectorAll('.key');
/* Note: Above creates a NodeList. 
* It is inefficient to use KEYS.addEventListener('transitionend') because
* in a NodeList, you cannot listen to all of them, you must explicitly loop over
* every single element and attach an event listener.
* Below is the better approach. */

// transitionend event is fired when a CSS transition has completed (in this case, 'transform')
KEYS.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
