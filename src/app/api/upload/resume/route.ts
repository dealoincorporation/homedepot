import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { requireSession } from '@/lib/session';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary if credentials are provided
const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
}

export async function POST(req: Request) {
  try {
    const session = await requireSession().catch(() => null);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Please upload a PDF or Word document.' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${session.sub}_${timestamp}_${sanitizedName}`;

    // Try Cloudinary first if configured, otherwise fall back to local storage
    if (isCloudinaryConfigured) {
      try {
        // Convert buffer to base64 for Cloudinary
        const base64 = buffer.toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        // Upload to Cloudinary using promise-based approach
        const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
          cloudinary.uploader.upload(
            dataUri,
            {
              resource_type: 'raw', // For PDFs and documents
              folder: 'resumes',
              public_id: filename.replace(/\.[^/.]+$/, ''), // Remove extension
              overwrite: false,
              use_filename: false,
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else if (result) {
                resolve(result);
              } else {
                reject(new Error('Cloudinary upload returned no result'));
              }
            }
          );
        });

        return NextResponse.json({
          ok: true,
          url: result.secure_url,
          filename: file.name,
        });
      } catch (cloudinaryError: any) {
        console.error('Cloudinary upload failed, falling back to local storage:', cloudinaryError?.message || cloudinaryError);
        // Fall through to local storage
      }
    }

    // Fallback to local storage (for development or if Cloudinary fails)
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'resumes');
    await mkdir(uploadsDir, { recursive: true });
    const filepath = join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    // Return URL path (relative to public folder)
    const url = `/uploads/resumes/${filename}`;

    return NextResponse.json({ ok: true, url, filename: file.name });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to upload file' },
      { status: 500 }
    );
  }
}
