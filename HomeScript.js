document.addEventListener("DOMContentLoaded", () => {
  const reviewCards = document.querySelectorAll(".carousel .card");
  const hoverBox = document.getElementById("hover-info");

  reviewCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      const name = card.dataset.name;
      const rating = card.dataset.rating;
      const summary = card.dataset.summary;

      hoverBox.innerHTML = `
        <strong>Parent:</strong> ${name}<br>
        <strong>Rating:</strong> ${rating}<br>
        <em>${summary}</em>
      `;
      hoverBox.style.display = "block";
    });

    card.addEventListener("mousemove", (e) => {
      hoverBox.style.left = (e.pageX + 10) + "px";
      hoverBox.style.top = (e.pageY + 10) + "px";
    });

    card.addEventListener("mouseleave", () => {
      hoverBox.style.display = "none";
    });
  });
});

