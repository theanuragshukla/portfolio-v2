import React, { useEffect, useRef } from "react";

const CanvasParagraph = () => {
  const canvasRef = useRef(null);
  const paragraph =
    "This is a paragraph that will be drawn character by character.";

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.font = "bold 24px verdana, sans-serif ";
    context.fillStyle = "white"; // Set color to white
    const charPositions = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawCharacter = (char, x, y) => {
      context.fillText(char, x, y);
    };

    const drawParagraph = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const paragraphWidth = context.measureText(paragraph).width;
      const startX = (canvas.width - paragraphWidth) / 2; // Center horizontally

      for (let i = 0; i < paragraph.length; i++) {
        const char = paragraph[i];
        const x = startX + i * 6; // Reduce spacing between characters
        const y = canvas.height / 2;
        charPositions.push({ char, x, y });
        drawCharacter(char, x, y);
      }
    };

    drawParagraph();

    const initialCharPositions = charPositions.map((position) => ({
      ...position,
    }));

    // You can use the initialCharPositions array as needed for animation later
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default CanvasParagraph;
