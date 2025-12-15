const section = document.getElementById("musicSection");
const images = document.querySelectorAll(".orbit-img");
const radius = 180; // 
const total = images.length;

function generatePositions() {
  images.forEach((img, index) => {
    let angle = (index / total) * (Math.PI * 2);

    
    if (angle > Math.PI * 0.7 && angle < Math.PI * 1.3) {
      angle += Math.PI / 3; 
    }

    
    const randomOffset = Math.random() * 50 - 25; 

    const x = Math.cos(angle) * (radius + randomOffset);
    const y = Math.sin(angle) * (radius + randomOffset);

    img.dataset.x = x;
    img.dataset.y = y;
  });
}

generatePositions();


let played = false;

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !played) {
        played = true;
        images.forEach((img, index) => {
          setTimeout(() => {
            img.style.opacity = "1";
            img.style.transform = `
              translate(${img.dataset.x}px, ${img.dataset.y}px)
              rotate(${Math.random() * 30 - 15}deg)
              scale(1)
            `;
          }, index * 120);
        });
      }
    });
  },
  { threshold: 0.4 }
);

observer.observe(section);
