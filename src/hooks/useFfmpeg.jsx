import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

function useFfmpeg(setVideos) {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  const mimeTypes = {
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    webm: "video/webm",
    mkv: "video/x-matroska",
    wmv: "video/x-ms-wmv",
    flv: "video/x-flv",
    avi: "video/x-msvideo",
  };

  useEffect(() => {
    const loadFFmpeg = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.5/dist/esm";
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
      setLoaded(true);
    };

    loadFFmpeg();

    return () => {};
  }, []);

  const transcodeVideo = async (inputFile, outputFormat) => {
    const inputFileName = inputFile.name;
    const outputFileName = inputFileName.replace(
      /\.[^/.]+$/,
      `.${outputFormat}`
    );
    const ffmpeg = ffmpegRef.current;
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

  return { loaded, transcodeVideo };
}

export default useFfmpeg;
