import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const format = formData.get("format") as string; // "webp" or "original"
        const width = formData.get("width") ? parseInt(formData.get("width") as string) : null;
        const height = formData.get("height") ? parseInt(formData.get("height") as string) : null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let sharpInstance = sharp(buffer);

        // Apply resizing if dimensions provided
        if (width && height) {
            sharpInstance = sharpInstance.resize(width, height, {
                fit: "cover",
                position: "center",
            });
        }

        // Convert format if requested
        if (format === "webp") {
            sharpInstance = sharpInstance.webp({ quality: 80 });
        }

        const outputBuffer = await sharpInstance.toBuffer();
        const outputType = format === "webp" ? "image/webp" : file.type || "image/png";
        const extension = format === "webp" ? "webp" : "png";

        return new NextResponse(new Uint8Array(outputBuffer), {
            status: 200,
            headers: {
                "Content-Type": outputType,
                "Content-Disposition": `attachment; filename="processed_${file.name.split('.')[0]}.${extension}"`,
            },
        });
    } catch (error) {
        console.error("Server-side process error:", error);
        return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
    }
}
