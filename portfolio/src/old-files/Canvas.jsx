import React, { useRef, useEffect } from 'react';
import { Button } from '@chakra-ui/react';

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw on the canvas
    context.fillStyle = 'blue';
    context.fillRect(50, 50, 200, 100);

    // Create a virtual canvas to render the React component
    const virtualCanvas = document.createElement('canvas');
    virtualCanvas.width = 200;
    virtualCanvas.height = 50;
    const virtualContext = virtualCanvas.getContext('2d');

    // Render Chakra UI Button onto the virtual canvas
    virtualContext.fillStyle = 'red'; // Set background color
    virtualContext.fillRect(0, 0, 200, 50);

    const buttonComponent = <Button variant="outline">Click me</Button>;
    const buttonString = ReactDOM.renderToString(buttonComponent);
    const img = new Image();
    img.src = `data:image/svg+xml;base64,${btoa(buttonString)}`;

    img.onload = () => {
      virtualContext.drawImage(img, 10, 10);

      // Draw the virtual canvas onto the main canvas
      context.drawImage(virtualCanvas, 50, 50);
    };
  }, []);

  return <canvas ref={canvasRef} width={400} height={200} />;
};

export default CanvasComponent;

