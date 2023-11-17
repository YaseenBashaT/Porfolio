document.addEventListener("DOMContentLoaded", function () {
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");
  
    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;
  
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
  
      cursorOutline.style.transition = "left 0.4s ease, top 0.4s ease, opacity 0.4s ease";
      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;
      cursorOutline.style.opacity = 0.7; // You can adjust the opacity value
  
      // If you want to reset the opacity after the animation completes
      setTimeout(() => {
        cursorOutline.style.opacity = 0;
      }, 400);
    });
  });
  