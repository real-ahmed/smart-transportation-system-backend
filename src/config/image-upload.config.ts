export const IMAGE_UPLOAD_CONFIG = {
  destination: process.env.IMAGE_UPLOAD_DEST || './uploads/images',
  maxFileSize: Number(process.env.IMAGE_MAX_SIZE) || 1024 * 1024 * 5, // 5MB
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
};
