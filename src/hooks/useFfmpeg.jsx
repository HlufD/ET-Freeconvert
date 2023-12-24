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
  };

  const transcodeVideo = async (inputFile, outputFormat) => {
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
    const transcodedBlob = new Blob([data], { type: mimeType });

    setVideos((prevVideos) =>
      prevVideos.map((prevVideo) =>
        prevVideo.name === inputFileName
          ? {
              ...prevVideo,
              downloadUrl: URL.createObjectURL(transcodedBlob),
            }
          : prevVideo
      )
    );
  };

  return { transcodeVideo, progress };
}

export default useFfmpeg;
