import { v2 as cloudinary } from "cloudinary";

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

let cloudinaryConfigured = false;

function parseCloudinaryConfig(): CloudinaryConfig {
  const url = process.env.CLOUDINARY_URL;

  if (!url) {
    throw new Error("CLOUDINARY_URL is not set");
  }

  const urlMatch = url.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);

  if (!urlMatch) {
    throw new Error("Invalid CLOUDINARY_URL format");
  }

  const apiKey = urlMatch[1];
  const apiSecret = urlMatch[2];
  const cloudName = urlMatch[3];

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("CLOUDINARY_URL is missing required parts");
  }

  return { cloudName, apiKey, apiSecret };
}

function ensureCloudinaryConfigured() {
  if (cloudinaryConfigured) return;

  const { cloudName, apiKey, apiSecret } = parseCloudinaryConfig();

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  cloudinaryConfigured = true;
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  publicId: string
): Promise<string> {
  ensureCloudinaryConfigured();

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          const message =
            error?.message || "Unknown Cloudinary upload error occurred";
          reject(new Error(message));
          return;
        }

        resolve(result.secure_url);
      }
    );

    upload.end(buffer);
  });
}

export async function uploadFileToCloudinary(
  file: File,
  publicId: string
): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  return uploadBufferToCloudinary(fileBuffer, publicId);
}
