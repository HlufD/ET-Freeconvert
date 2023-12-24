import About from "../components/About";
import DropZoneCom from "../components/DropZoneCom";
import useVideoProcessing from "../hooks/useVideoProcessing";
import { videoFormats } from "../utils/fileFormats";
// eslint-disable-next-line react/prop-types
function VideoConverterPage({ ffmpegRef }) {
  const {
    videos,
    startConversion,
    setVideos,
    handleOutputFormatChange,
    onConvert,
    onDrop,
    outputFormats,
    progress,
  } = useVideoProcessing(ffmpegRef);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="text-center  mt-3 mb-5 p-2">
        <h2 className="text-2xl font-bold mb-2">Video Converter</h2>
        <p className="text-lg">
          Easily convert files from one format to another, online.{" "}
        </p>
      </div>
      <DropZoneCom
        items={videos}
        setFunc={setVideos}
        handleOutputFormatChange={handleOutputFormatChange}
        onConvert={onConvert}
        onDrop={onDrop}
        startConversion={startConversion}
        outputFormats={outputFormats}
        Formats={videoFormats}
        ffmpegRef={ffmpegRef}
        progress={progress}
      />
      <About />
    </div>
  );
}

export default VideoConverterPage;
