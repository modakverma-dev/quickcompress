"use client";
import { X as Cross, SlidersVertical, Trash } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import getCroppedImg, { getFileSize } from "@/lib/utils";

const PreviewSection = ({ previewUrl, file, setFile, loading }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [height, setHeight] = useState(280);
  const [width, setWidth] = useState(210);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropSize, setCropSize] = useState({ height, width });
  useEffect(() => {
    if (parseInt(height) && parseInt(width)) {
      setCropSize({ height: parseInt(height), width: parseInt(width) });
    }
  }, [height, width]);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    if (!previewUrl || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(
        previewUrl,
        croppedAreaPixels,
        rotation
      );
      console.log(croppedImage, "croppedImage");
      setFile(croppedImage);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to crop image");
    }
  };
  if (!previewUrl) return;

  return (
    <div className="flex flex-col  gap-5 items-center">
      <div className="relative w-full h-[250px] rounded-xl  border">
        <Image
          src={previewUrl}
          alt="preview-image"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="h-full flex items-start gap-5 flex-col">
        <h1 className="text-primary  bg-primary/10 p-0 px-4 rounded-md tracking-wide text-lg font-semibold">
          <span className="underline">FileSize </span>
          {" : "}
          {getFileSize(file?.size)}
        </h1>
        <div className="flex w-full gap-2 items-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="flex border items-center gap-2 bg-neutral-100 py-3 px-4 rounded-lg whitespace-nowrap">
              Customize Image <SlidersVertical className="w-5 h-5" />
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogTitle />
              <div className="bg-white p-2 rounded-lg w-full">
                <div className="relative w-full h-80">
                  <Cropper
                    image={previewUrl}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    cropSize={cropSize}
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center flex-col">
                    <span>Rotate</span>
                    <Slider
                      value={[rotation]}
                      min={0}
                      max={360}
                      step={1}
                      onValueChange={(value) => setRotation(value[0])}
                      aria-labelledby="rotation-slider"
                    />
                    <div className="flex justify-between w-full text-sm text-typography-paragraph mt-2">
                      <span>0&deg;</span>
                      <span>360&deg;</span>
                    </div>
                  </div>
                </div>
                <div className="w-full flex gap-2 py-2">
                  <div className="flex w-full flex-col items-start gap-1">
                    <label
                      className="text-sm font-medium text-primary/80"
                      htmlFor="width"
                    >
                      width
                    </label>
                    <Input
                      onChange={(e) => setWidth(e.target.value)}
                      id="width"
                      className="text-lg"
                      value={width}
                    />
                  </div>
                  <div className="flex w-full flex-col items-start gap-1">
                    <label
                      className="text-sm font-medium text-primary/80"
                      htmlFor="height"
                    >
                      height
                    </label>
                    <Input
                      onChange={(e) => setHeight(e.target.value)}
                      id="height"
                      className="text-lg"
                      value={height}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    variant="secondary"
                    className="w-28 text-lg font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    className="w-28 text-lg font-semibold"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            disable={loading}
            onClick={() => {
              setFile(null);
            }}
            className="font-semibold text-lg bg-red-400 hover:bg-red-500 transition text-white flex items-center gap-2 w-full h-12 rounded-lg"
          >
            Remove
            <Trash className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
