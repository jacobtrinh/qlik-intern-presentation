// Dark mode toggle functionality
const logo = document.querySelector('.nav-logo');
const body = document.body;
            
// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(currentTheme + '-mode');
            
// Typewriter effect
const phrases = [
    'Web Developer',
    'Creative Thinker',
    'Student',
    'UI/UX Designer',
    'Programmer'  ];
let phraseIndex = 0;
let letterIndex = 0;
 let currentPhrase = '';
  let isDeleting = false;
   let typewriter = document.querySelector('.typewriter');
            
function type() {
    const currentFullPhrase = phrases[phraseIndex];
                
    if (isDeleting) {
        currentPhrase = currentFullPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        currentPhrase = currentFullPhrase.substring(0, letterIndex + 1);
            letterIndex++;
    }
                
    typewriter.textContent = currentPhrase;
                
    let typeSpeed = isDeleting ? 50 : 100;
                
    if (!isDeleting && letterIndex === currentFullPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
                
    setTimeout(type, typeSpeed);
}
            
// Start typewriter effect after a short delay
setTimeout(type, 1000);
            
// Load adaptive cards SVG
fetch('adaptive_cards_svg.svg')
    .then(response => response.text())
    .then(svgContent => {
        const container = document.getElementById('adaptive-svg-container');
        container.innerHTML = svgContent;
        const svg = container.querySelector('svg');
        if (svg) {
            svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
            if (currentTheme === 'dark') {
                svg.classList.add('dark');
            }
        }
    });
            
// Toggle dark mode when logo is clicked
logo.addEventListener('click', () => {
    const svg = document.querySelector('#adaptive-svg-container svg');
                
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        if (svg) svg.classList.add('dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        if (svg) svg.classList.remove('dark');
    }
});