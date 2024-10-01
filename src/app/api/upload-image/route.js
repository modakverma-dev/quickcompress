import { S3 } from "aws-sdk";
import sharp from "sharp";

const s3 = new S3({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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
      return new Response(JSON.stringify({ message: "Invalid image type" }), {
        status: 400,
      });
    }
    const fileBuffer = Buffer.from(await image.arrayBuffer());
    const compressedImageBuffer = await sharp(fileBuffer)
      .resize({ width: 800 })
      .toFormat(image.type.split("/")[1], { quality: compression })
      .toBuffer();

    const fileName = `${Date.now()}-${image.name}`;
    const uploadParams = {
      Bucket: "quickcompress",
      Key: fileName,
      Body: compressedImageBuffer,
      ContentType: image.type,
    };

    const s3Response = await s3.upload(uploadParams).promise();
    const contentType = image.type;
    const compressedSize = compressedImageBuffer.length;
    return new Response(
      JSON.stringify({
        file: compressedImageBuffer.toString("base64"),
        size: compressedSize,
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
