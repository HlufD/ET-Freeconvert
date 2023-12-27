import { fetchFile } from "@ffmpeg/util";
import { useState } from "react";

function useFfmpeg(setVideos, ffmpegRef) {
  const [progress, setProgress] = useState(0);
  const mimeTypes = {
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    webm: "video/webm",
    mkv: "video/x-matroska",
    wmv: "video/x-ms-wmv",
    flv: "video/x-flv",
    avi: "video/x-msvideo",
    aac: "audio/aac",
    wav: "audio/wav",
    ogg: "audio/ogg",
    flac: "audio/flac",
    au: "audio/basic",
    m4a: "audio/mp4",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    jpg: "image/jpeg",
  };

  const fileConversion = async (inputFile, outputFormat) => {
    const inputFileName = inputFile.name;
    const outputFileName = inputFileName.replace(
      /\.[^/.]+$/,
      `.${outputFormat}`
    );
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("progress", ({ progress }) => {
      let porgreesPercent = (progress * 100).toFixed(0);
      setProgress(porgreesPercent + "%");
    });
    await ffmpeg.writeFile(inputFileName, await fetchFile(inputFile.file));
    await ffmpeg.exec(["-i", inputFileName, outputFileName]);
    const data = await ffmpeg.readFile(outputFileName);

    const mimeType = mimeTypes[outputFormat.toLowerCase()];
    const conerteddBlob = new Blob([data], { type: mimeType });

    setVideos((prevVideos) =>
      prevVideos.map((prevVideo) =>
        prevVideo.name === inputFileName
          ? {
              ...prevVideo,
              downloadUrl: URL.createObjectURL(conerteddBlob),
            }
          : prevVideo
      )
    );
  };

  const fileCompression = async (inputFile, ffmpegOptions) => {
    try {
      const inputFileName = inputFile.name;
      const ffmpeg = ffmpegRef.current;

      ffmpeg.on("progress", ({ progress }) => {
        let progressPercent = (progress * 100).toFixed(0);
        setProgress(progressPercent + "%");
      });

      await ffmpeg.writeFile(inputFileName, await fetchFile(inputFile.file));
      const outputFileName = `out-${inputFileName}`;
      const ffmpegCommand = [
        "-i",
        inputFileName,
        ...ffmpegOptions,
        outputFileName,
      ];

      await ffmpeg.exec(ffmpegCommand);

      const compressedData = await ffmpeg.readFile(outputFileName);

      const mimeType = mimeTypes[inputFileName.toLowerCase()];
      const compressedBlob = new Blob([compressedData], { type: mimeType });

      setVideos((prevVideos) =>
        prevVideos.map((prevVideo) =>
          prevVideo.name === inputFileName
            ? {
                ...prevVideo,
                downloadUrl: URL.createObjectURL(compressedBlob),
              }
            : prevVideo
        )
      );
    } catch (error) {
      console.error("An error occurred during file compression:", error);
    }
  };

  return { fileConversion, fileCompression, progress };
}

export default useFfmpeg;
