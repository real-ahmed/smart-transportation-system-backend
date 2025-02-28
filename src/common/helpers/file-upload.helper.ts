import * as path from 'path'; // Ensure 'path' is imported correctly
import * as fs from 'fs'; // Ensure 'fs' is imported correctly

export function uploadFile(
  file: Express.Multer.File,
  uploadPath: string,
): string {
  // Ensure uploadPath is valid before using it
  if (!uploadPath) {
    throw new Error('Upload path is required');
  }

  uploadPath = path.join('storage', uploadPath); // Should work if 'path' is imported correctly
  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(uploadPath, fileName);

  // Check if the upload directory exists, create it if not
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  // Write the file to disk
  fs.writeFileSync(filePath, file.buffer);

  // Dynamically retrieve the domain URL from environment variable
  const domain = process.env.DOMAIN_URL || 'http://localhost:3000'; // Default to localhost if not set
  const fileUrl = `${domain}/${uploadPath.replace('storage/', '')}/${fileName}`;

  return fileUrl;
}
