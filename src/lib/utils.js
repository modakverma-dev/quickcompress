import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getCroppedImg = async (imageSrc, pixelCrop, rotation) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      const maxSize = Math.max(image.width, image.height);
      const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
      canvas.width = safeArea;
      canvas.height = safeArea;
      ctx.translate(safeArea / 2, safeArea / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-image.width / 2, -image.height / 2);
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, safeArea, safeArea);
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.putImageData(
        imageData,
        -safeArea / 2 + image.width / 2 - pixelCrop.x,
        -safeArea / 2 + image.height / 2 - pixelCrop.y
      );
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob from canvas"));
        }
      }, "image/jpeg");
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

export default getCroppedImg;

export const getFileSize = (sizeValue) => {
  let finalValue;
  if (sizeValue < 1024 * 1024) {
    finalValue = (sizeValue / 1024).toFixed(2) + " KB";
  } else finalValue = (sizeValue / (1024 * 1024)).toFixed(2) + " MB";
  return finalValue;
};
