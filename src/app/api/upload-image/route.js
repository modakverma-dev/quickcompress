import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    const compression = parseInt(formData.get("compression"));
    if (!image || image.size === 0) {
      return new Response(
        JSON.stringify({ message: "Please select an image" }),
        { status: 400 }
      );
    }
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(image.type)) {
      return new Response(
        JSON.stringify({ message: "Invalid image type", status: 400 }),
        {
          status: 400,
        }
      );
    }
    const fileBuffer = Buffer.from(await image.arrayBuffer());
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join("temp-uploads", fileName);
    const compressedFilePath = path.join("uploads", fileName);
    await fs.writeFile(filePath, fileBuffer);
    await sharp(filePath)
      .resize({ width: 800 })
      .toFormat(image.type.split("/")[1], { quality: compression })
      .toFile(compressedFilePath);
    await fs.unlink(filePath);
    const compressedImageBuffer = await fs.readFile(compressedFilePath);
    const contentType = image.type;
    return new Response(
      JSON.stringify({
        file: compressedImageBuffer,
        message: "File compressed successfully",
        status: 200,
      }),
      {
        headers: { "Content-Type": contentType },
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "An error occurred." }), {
      status: 500,
    });
  }
}
