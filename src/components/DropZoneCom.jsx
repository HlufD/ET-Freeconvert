import { useDropzone } from "react-dropzone";
import { DocumentIcon } from "@heroicons/react/24/outline";
import useVideoProcessing from "../hooks/useVideoProcessing";
import VideoItem from "./VideoItem";

function DropZoneCom() {
  const {
    videos,
    startConversion,
    setVideos,
    loaded,
    handleOutputFormatChange,
    onConvert,
    onDrop,
    outputFormats,
  } = useVideoProcessing();

  const onRemove = (name) => {
    const filterdVideos = videos.filter((video) => video.name != name);
    setVideos(filterdVideos);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  if (!loaded) {
    return <p>Loading</p>;
  }
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
          <VideoItem
            key={index}
            video={video}
            onRemove={onRemove}
            handleOutputFormatChange={handleOutputFormatChange}
            startConversion={startConversion}
            outputFormats={outputFormats}
          />
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
    </>
  );
}
export default DropZoneCom;
