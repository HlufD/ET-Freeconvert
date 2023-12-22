import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export const load = async () => {
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.5/dist/esm";
  const ffmpeg = new FFmpeg();
  ffmpeg.on("log", ({ message }) => {
    console.log(message);
  });
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });
  return ffmpeg;
};
