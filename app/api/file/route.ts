import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');

    if (files.length === 0) {
      return NextResponse.json(
        {
          message: 'No file was uploaded',
          data: 'No files provided in body of the request',
        },
        { status: 400 },
      );
    }

    const file: File = files[0] as File; // Cast to File
    const filePath = `./public/${file.name}`;
    const fileStream = fs.createWriteStream(filePath);

    file
      .stream()
      .getReader()
      .read()
      .then(result => {
        fileStream.write(result.value);
      });

    // Wait for the stream to finish writing
    await new Promise((resolve, reject) => {
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });

    return NextResponse.json({
      message: 'File uploaded successfully',
      data: file.size,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong', data: error },
      { status: 500 },
    );
  }
}
