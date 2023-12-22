import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DocumentIcon,
  Cog6ToothIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

function DropZoneCom() {
  const [loaded, setLoaded] = useState(false);
  const [videos, setVideos] = useState([]);
  const [startConversion, setStartConversion] = useState(false);
  const [outputFormats, setOutputFormats] = useState({});
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.5/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      messageRef.current.innerHTML = message;
      console.log(message);
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
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

  const transcode = async (video, outputFormat) => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(video.name, await fetchFile(video.file));
    await ffmpeg.exec(["-i", video.name, `${video.name}.mp3`]);
    const data = await ffmpeg.readFile(`${video.name}.mp3`);
    const mimeType = outputFormat.startsWith("mp3")
      ? "audio/mpeg"
      : `video/${outputFormat}`;
    const mp3Blob = new Blob([data], { type: mimeType });
    setVideos((prevVideos) =>
      prevVideos.map((prevVideo) => {
        if (video.name === prevVideo.name) {
          return {
            ...prevVideo,
            downloadUrl: URL.createObjectURL(mp3Blob),
          };
        }
        return prevVideo;
      })
    );
  };

  //event handling

  const onRemove = (name) => {
    const filterdVideos = videos.filter((video) => video.name != name);
    setVideos(filterdVideos);
  };

  const handleOutputFormatChange = (videoName, format) => {
    setOutputFormats((prevFormats) => ({
      ...prevFormats,
      [videoName]: format,
    }));
  };

  const onConvert = async () => {
    setStartConversion(true);
    for (const video of videos) {
      try {
        await transcode(video, outputFormats[video.name]);
      } catch (error) {
        console.error("Error converting video:", error);
      }
    }
    setStartConversion(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const updatedVideos = acceptedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file),
      downloadUrl: "",
      file,
    }));
    setVideos((prevVideos) => [...prevVideos, ...updatedVideos]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    load();
    console.log(loaded);
  }, [loaded]);
  if (!loaded) {
    return <p>Loading</p>;
  }
  console.log(videos);
  return (
    <>
      <div
        {...getRootProps()}
        className="border border-dashed border-blue-600 h-52 w-[700px] bg-[#EFEEF3] flex justify-center items-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="flex border items-center space-x-2 font-bold text-lg bg-[#868FEF] text-white px-6 py-4 rounded-md">
            <DocumentIcon className="h-7 w-7 text-white" />
            <span>Choose File</span>
          </p>
        )}
      </div>
      <div className="mt-4">
        {videos.map((video, index) => (
          <div key={index} className="flex space-x-3 border mt-4 p-3">
            <div className="flex items-center flex-1 space-x-3">
              <video controls width="50">
                <source src={video.preview} type={video.type} />
                Your browser does not support the video tag.
              </video>
              <p className="truncate w-20">{video.name}</p>
            </div>
            <div className="flex items-center space-x-6">
              <p className="text-gray-500">
                {(video.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <div className="text-gray-500 flex items-center space-x-3">
                <p>Output:</p>
                <select
                  name="outputFormat"
                  id=""
                  className="px-3 py-1 border border-[#868FEF] text-[#868FEF] rounded-sm bg-white"
                  onChange={(e) =>
                    handleOutputFormatChange(video.name, e.target.value)
                  }
                >
                  <option className="px-3 py-2 text-sm" value="mp4">
                    MP4
                  </option>
                  <option className="px-3 py-2 text-sm" value="MKV">
                    MKV
                  </option>
                  <option className="px-3 py-2 text-sm" value="MP3">
                    MP3
                  </option>
                  <option className="px-3 py-2 text-sm" value="WMV">
                    WMV
                  </option>
                  <option className="px-3 py-2 text-sm" value="FLV">
                    FLV
                  </option>
                  <option className="px-3 py-2 text-sm" value="WebM">
                    WebM
                  </option>
                </select>
              </div>
              <Cog6ToothIcon
                className={`w-5 h-5 text-[#656EE0] cursor-pointer hover:scale-125 ${
                  startConversion ? "animate-spin" : ""
                } `}
              />
              <XCircleIcon
                onClick={() => onRemove(video.name)}
                className="h-5 w-5 text-[#656EE0] cursor-pointer hover:scale-125"
              />
              {video.downloadUrl && (
                <a
                  href={video.downloadUrl}
                  download={`${video.name}.mp3`}
                  className="text-green-600 text-sm rounded-sm cursor-pointer border border-green-600 px-3 py-1"
                >
                  Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex bg-[#EFEEF3] px-3 py-3">
        <p className="flex-1">Added {videos.length} files </p>
        <button
          onClick={onConvert}
          className="bg-[#656EE0] text-white px-4 py-2 text-sm hover:scale-105"
        >
          Convet All
        </button>
      </div>
      <p className="border mt-1 p-3 text-green-500" ref={messageRef}></p>
      <br />
    </>
  );
}

export default DropZoneCom;
