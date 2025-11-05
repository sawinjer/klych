import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { s3 } from "../../../lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../../../env/env";
import { getFilePath } from "../../../env/s3Url";
import sharp from "sharp";
import { auth } from "@/auth";
import { headers } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only images are allowed" },
        { status: 400 },
      );
    }

    const resizedImage = await sharp(await file.arrayBuffer())
      .resize(320, 320)
      .toFormat("webp", { quality: 90 })
      .toBuffer();

    const objectName = `${Date.now()}-${randomUUID()}`;

    const buffer = Buffer.from(resizedImage);

    await s3.send(
      new PutObjectCommand({
        Bucket: env.MINIO_BUCKET,
        Key: objectName,
        Body: buffer,
        ContentType: "image/webp",
      }),
    );

    const fileUrl = getFilePath(objectName);

    await auth.api.updateUser({
      body: {
        image: fileUrl,
      },
      headers: await headers(),
    });

    return NextResponse.json({ url: fileUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
