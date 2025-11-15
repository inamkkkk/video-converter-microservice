# Video Converter Microservice

A simple microservice for converting video files from one format to another using Node.js and FFmpeg.

## Features

*   Accepts video files via HTTP upload.
*   Converts videos to specified formats (e.g., MP4, AVI, MOV).
*   Uses FFmpeg for video processing.
*   Provides status updates on conversion progress.
*   Stores converted files on the server.

## Technologies Used

*   Node.js
*   Express.js
*   FFmpeg
*   Multer (for file uploads)
*   UUID (for generating unique filenames)

## Installation

1.  Install FFmpeg: `sudo apt install ffmpeg` (Linux) or `brew install ffmpeg` (macOS).
2.  Clone the repository: `git clone <repository_url>`
3.  Navigate to the project directory: `cd video-converter-microservice`
4.  Install dependencies: `npm install`

## Configuration

*   `PORT`:  The port the server listens on (default: 3000).
*   `UPLOAD_DIRECTORY`: The directory where uploaded files are stored (default: ./uploads).
*   `CONVERTED_DIRECTORY`: The directory where converted files are stored (default: ./converted).

## Usage

1.  Start the server: `node server.js`
2.  Send a POST request to `/convert` with the video file attached in a `video` field and `targetFormat` in `targetFormat` field (e.g., `mp4`, `avi`).  Use `multipart/form-data`.
3.  The server will return a JSON response with the conversion status and the path to the converted file.

## API Endpoints

*   `POST /convert`:  Uploads a video and converts it to the specified format.
*   `GET /status/:jobId`: Get the status of a particular job.

## License

MIT
