document.addEventListener('DOMContentLoaded', function() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const carousel = document.querySelector('.carousel-items');
  const cards = document.querySelectorAll('.review-card');
  let currentIndex = 0;
  const visibleCards = 3; // Number of cards to show at once

  // Initialize buttons
  updateButtons();

  nextBtn.addEventListener('click', function() {
    if (currentIndex < cards.length - visibleCards) {
      currentIndex++;
      updateCarousel();
      updateButtons();
    }
  });

  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
      updateButtons();
    }
  });

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 20; // card width + gap
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= cards.length - visibleCards;
  }
});