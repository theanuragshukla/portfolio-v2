import React, { useEffect, useRef } from "react";

const CanvasRandomCharacters = () => {
  const canvasRef = useRef(null);
  const characters = "01";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const charSize = 14; // Adjust this value for smaller characters
    const cols = Math.floor(canvas.width / charSize);
    const rows = Math.floor(canvas.height / charSize);
    const animationInterval = 1000; // in milliseconds
    const repelDistance = 50; // Distance to repel characters from the cursor

    let currentCharacters = [];
    let targetCharacters = [];

    const getRandomCharacter = () => {
      return characters[Math.floor(Math.random() * characters.length)];
    };

    const initializeCharacters = () => {
      currentCharacters = Array.from(
        { length: cols * rows },
        getRandomCharacter
      );
      targetCharacters = Array.from(
        { length: cols * rows },
        getRandomCharacter
      );
    };

    const drawCharacters = (characters) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#FFF"; // Set color to white
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col;
          const char = characters[index];
          ctx.fillText(char, col * charSize, row * charSize);
        }
      }
    };

    const updateTargetCharacters = (mouseX, mouseY) => {
      const mouseCol = Math.floor(mouseX / charSize);
      const mouseRow = Math.floor(mouseY / charSize);

      targetCharacters = currentCharacters.map((char, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const distance = Math.sqrt(
          Math.pow(mouseCol - col, 2) + Math.pow(mouseRow - row, 2)
        );

        if (distance < repelDistance) {
          // Repel characters from the cursor
          const angle = Math.atan2(mouseRow - row, mouseCol - col);
          const newCol = col - Math.cos(angle) * repelDistance;
          const newRow = row - Math.sin(angle) * repelDistance;

          const newIndex = Math.floor(newRow) * cols + Math.floor(newCol);
          return currentCharacters[newIndex] || char;
        } else {
          return char;
        }
      });
    };

    const animateCharacters = () => {
      drawCharacters(targetCharacters);
      currentCharacters = targetCharacters.slice();
      setTimeout(animateCharacters, animationInterval);
    };

    initializeCharacters();
    drawCharacters(currentCharacters);

    canvas.addEventListener("mousemove", (e) => {
      updateTargetCharacters(e.clientX, e.clientY);
    });

    animateCharacters();

    return () => {
      canvas.removeEventListener("mousemove", updateTargetCharacters);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default CanvasRandomCharacters;
