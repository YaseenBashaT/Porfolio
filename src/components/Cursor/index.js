import React, { useEffect } from "react";
import './index.scss';

export default function Cursor() {
  useEffect(() => {
    const cursorDot = document.getElementById('data-cursor-dot');
    const cursorOutline = document.getElementById('data-cursor-outline');

    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

    //   if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    //   }

    //   if (cursorOutline) {
        cursorOutline.animate({
          left: `${posX}px`,
          top: `${posY}px`,
        }, { duration: 500, fill: "forwards" });
    //   }
    });

    return () => {
      // Cleanup event listener if needed
      window.removeEventListener("mousemove", () => {});
    }
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return (
    <>
      <div className="cursor-dot" id='data-cursor-dot'></div>
      <div className="cursor-outline" id='data-cursor-outline'></div>
    </>
  );
}
// 