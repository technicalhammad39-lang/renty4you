import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const folder = formData.get("folder") as string || "general";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Determine the upload directory
    let uploadRoot = process.env.HOSTINGER_UPLOAD_ROOT;
    let baseUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL;

    // Fallback for local development if the Hostinger path doesn't exist or isn't set
    if (!uploadRoot || process.env.NODE_ENV === "development") {
      uploadRoot = path.join(process.cwd(), "public", "uploads");
      // Use local URL for dev
      baseUrl = "/uploads";
    }

    const targetDir = path.join(uploadRoot, folder);

    // Ensure the target directory exists
    try {
      await fs.access(targetDir);
    } catch {
      await fs.mkdir(targetDir, { recursive: true });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Clean filename and append timestamp to prevent overwriting
      const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
      const ext = path.extname(cleanName);
      const baseName = path.basename(cleanName, ext);
      const fileName = `${baseName}-${Date.now()}${ext}`;
      
      const filePath = path.join(targetDir, fileName);
      
      await fs.writeFile(filePath, buffer);
      
      // Construct the public URL
      const publicUrl = `${baseUrl}/${folder}/${fileName}`;
      uploadedUrls.push(publicUrl);
    }

    return NextResponse.json({ urls: uploadedUrls });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 });
  }
}
