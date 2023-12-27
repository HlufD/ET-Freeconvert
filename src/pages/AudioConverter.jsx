import About from "../components/About";
import DropZoneCom from "../components/DropZoneCom";
import useProcessing from "../hooks/useProcessing";
import { audioFormats } from "../utils/fileFormats";

// eslint-disable-next-line react/prop-types
function AudioConverter({ ffmpegRef }) {
  const {
    onConvert,
    onDrop,
    handleOutputFormatChange,
    startConversion,
    files,
    setFiles,
    outputFormats,
    progress,
  } = useProcessing(ffmpegRef);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="text-center  mt-3 mb-5 p-2">
        <h2 className="text-2xl font-bold mb-2">Audio Converter</h2>
        <p className="text-lg">
          Easily convert files from one format to another, online.{" "}
        </p>
      </div>
      <DropZoneCom
        items={files}
        setFunc={setFiles}
        handleOutputFormatChange={handleOutputFormatChange}
        onConvert={onConvert}
        onDrop={onDrop}
        startConversion={startConversion}
        outputFormats={outputFormats}
        Formats={audioFormats}
        ffmpegRef={ffmpegRef}
        progress={progress}
      />
      <About />
    </div>
  );
}

export default AudioConverter;
