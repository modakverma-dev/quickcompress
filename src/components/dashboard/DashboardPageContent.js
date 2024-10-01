"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CircleLoader from "../ui/CircleLoader";
import toast from "react-hot-toast";
import { CloudUpload, Download } from "lucide-react";
import Image from "next/image";
import { getFileSize } from "@/lib/utils";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import UploadImage from "./UploadImage";
import PreviewSection from "./PreviewSection";
import ComparatorChart from "./ComparatorChart";
const DashboardPageContent = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [compressedImgUrl, setComperssedImgUrl] = useState(null);
  const [compressedImgSize, setComperssedImgSize] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(50);
  const router = useRouter();
  const parseFormattedBytes = (formattedString) => {
    if (typeof compressedImgSize !== "string") return;
    const units = ["Bytes", "KB", "MB", "GB"];
    const [value, unit] = formattedString.split(" ");
    const unitIndex = units.indexOf(unit);
    if (unitIndex === -1) {
      return NaN;
    }
    const bytes = parseFloat(value) * Math.pow(1024, unitIndex);
    return Math.round(bytes);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("compression", compressionLevel);
    try {
      setLoading(true);
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === 200) {
        toast.success(result?.message);
        const imageSrc = `data:image/jpeg;base64,${result.file}`;
        setComperssedImgSize(getFileSize(result?.size));
        setComperssedImgUrl(imageSrc);
      } else if (result.status === 400) {
        toast.error(result?.message);
      } else {
        setMessage(result.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error uploading file:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      router.push("#preview");
    } else {
      setPreviewUrl("");
      router.push("");
    }
  }, [file, router]);
  return (
    <main className="pb-10 bg-neutral-50 pt-20 w-full h-full px-5 flex flex-col gap-10 row-start-2 items-center">
      <div className="w-full h-full items-center flex gap-4 flex-col sm:flex-row">
        <UploadImage
          file={file}
          setFile={setFile}
          compressionLevel={compressionLevel}
          setCompressionLevel={setCompressionLevel}
        />
      </div>
      {file && (
        <Button
          className="min-w-80 rounded-md text-xl md:text-2xl py-8 px-12 font-medium"
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <CircleLoader className="w-10 h-10" />
          ) : (
            <span className="flex items-center gap-2">
              Upload & Compress{" "}
              <CloudUpload className="w-8 h-8 animate-bounce" />
            </span>
          )}
        </Button>
      )}
      <Card className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-5 items-center justify-center p-5 min-h-40">
        {!file && !compressedImgUrl ? (
          <h1 className="p-10 text-center opacity-70">
            Preview will be available here!
          </h1>
        ) : null}
        {file ? (
          <div id="preview">
            <PreviewSection
              file={file}
              loading={loading}
              previewUrl={previewUrl}
              setFile={setFile}
              setPreviewUrl={setPreviewUrl}
            />
            {message && <p>{message}</p>}
          </div>
        ) : null}
        {compressedImgUrl ? (
          <div className="flex flex-col gap-5 items-center">
            <div className="relative w-full h-[250px] rounded-xl  border">
              <Image
                src={compressedImgUrl}
                alt="preview-image"
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-primary">
              Compressed Image Size: {compressedImgSize}
            </span>
            <a
              className="bg-neutral-100 hover:bg-neutral-200 transition border p-2 px-5 rounded-lg flex items-center gap-2"
              href={compressedImgUrl}
              download="compressed-image.jpg"
            >
              Download compressed image <Download />
            </a>
          </div>
        ) : null}
      </Card>
      {compressedImgSize && (
        <ComparatorChart
          originalSize={file?.size}
          compressedSize={parseFormattedBytes(compressedImgSize)}
        />
      )}
    </main>
  );
};

export default DashboardPageContent;
