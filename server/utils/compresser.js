import pako from 'pako';

// Function to compress a data URI
const compressDataUri = (dataUri) => {
  try {
    const compressedData = pako.deflate(dataUri, { to: 'string' });
    return compressedData;
  } catch (error) {
    console.error('Error compressing data URI:', error);
    return null;
  }
};

// Function to decompress a compressed data URI
const decompressDataUri = (compressedData) => {
  try {
    const decompressedData = pako.inflate(compressedData, { to: 'string' });
    return decompressedData;
  } catch (error) {
    console.error('Error decompressing data URI:', error);
    return null;
  }
};

export { compressDataUri, decompressDataUri };

