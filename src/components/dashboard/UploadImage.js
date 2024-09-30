"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { ImageUp, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Slider } from "../ui/slider";

const UploadImage = ({
  file,
  compressionLevel,
  setCompressionLevel,
  setFile,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleCompressionChange = (value) => {
    setCompressionLevel(value[0]);
  };
  return (
    <div className="container mx-auto pt-5">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Image Compression Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="compression-slider"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Compression Level: {compressionLevel}%
              </label>
              <Slider
                id="compression-slider"
                min={0}
                max={100}
                step={1}
                value={[compressionLevel]}
                onValueChange={handleCompressionChange}
                className="w-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Lower quality, smaller file size
              </p>
              <p className="text-sm text-gray-500">
                Higher quality, larger file size
              </p>
            </div>
            <Dropzone
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDropAccepted={() => setIsDragging(false)}
              onDrop={(acceptedFiles) => {
                const selectedFile = acceptedFiles[0];
                if (selectedFile) {
                  if (selectedFile?.size > 25 * 1024 * 1024) {
                    toast.error(
                      "Image size exceeds the limit. Please select upto 25 MB."
                    );
                    return;
                  }
                  if (/\.(png|jpg|webp|avif|jpeg)$/i.test(selectedFile.name)) {
                    setFile(selectedFile);
                  } else {
                    toast.error(
                      "Invalid file format, Please select: .jpg, .jpeg, .webp, .avif, .png"
                    );
                  }
                }
              }}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="flex w-full h-full flex-col items-center gap-5">
                  <section
                    {...getRootProps()}
                    className="w-full h-full  flex flex-col lg:flex-row gap-5 items-center"
                  >
                    <div
                      {...getRootProps()}
                      className={cn(
                        "w-full h-full min-h-52 rounded-lg border cursor-pointer border-primary/30 text-center transition-colors flex items-center justify-center bg-foreground text-background gap-2 bg-purple-50 dark:hover:bg-neutral-900 text-sm sm:text-base px-4 sm:px-5 border-dashed",

                        isDragging && "bg-purple-100"
                      )}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, JPEG, WEBP or AVIF (MAX. 25 MB)
                        </p>
                      </div>
                      <input
                        {...getInputProps()}
                        type="file"
                        accept="image/*"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    </div>
                  </section>
                  {!file ? (
                    <div
                      {...getRootProps()}
                      type="text"
                      className="bg-primary w-full flex items-center justify-center cursor-pointer rounded-md text-xl py-3 text-white px-7 font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        Select Image <ImageUp />
                      </span>
                    </div>
                  ) : null}
                </div>
              )}
            </Dropzone>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadImage;
