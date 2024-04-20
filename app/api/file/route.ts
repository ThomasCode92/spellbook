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
    const fileReader = file.stream().getReader();

    const filePath = `./public/${file.name}`;
    const fileStream = fs.createWriteStream(filePath);

    // Manually handle the data chunks
    let done = false;
    while (!done) {
      const { value, done: readerDone } = await fileReader.read();

      if (value) {
        fileStream.write(value);
      }
      done = readerDone;
    }

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
