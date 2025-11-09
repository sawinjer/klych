import * as crypto from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { env } from "../../../env/env";
import { getFilePath } from "../../../env/s3Url";
import { s3 } from "../../../lib/s3";
import z from "zod";

export const runtime = "nodejs";

const queryParams = z.object({
  w: z.number().int().positive(),
  h: z.number().int().positive(),
});

const parse10Int = (input: string | undefined | null) => {
  if (!input) {
    return undefined;
  }

  return parseInt(input, 10);
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const params = queryParams.safeParse({
      w: parse10Int(req.nextUrl.searchParams.get("w")),
      h: parse10Int(req.nextUrl.searchParams.get("h")),
    });

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!params.success) {
      return NextResponse.json(
        { error: "Invalid query params provided" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only images are allowed" },
        { status: 400 },
      );
    }

    const resizedImage = await sharp(await file.arrayBuffer())
      .resize(params.data.w, params.data.h)
      .toFormat("webp", { quality: 90 })
      .toBuffer();

    const objectName = `${Date.now()}-${crypto.randomUUID()}`;

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
    return NextResponse.json({ url: fileUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
