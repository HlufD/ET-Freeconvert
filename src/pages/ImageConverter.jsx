import About from "../components/About";
import DropZoneCom from "../components/DropZoneCom";
import useImageProcessing from "../hooks/useImageProcessing";
import { imageFormats } from "../utils/fileFormats";

// eslint-disable-next-line react/prop-types
function ImageConverter({ ffmpegRef }) {
  const {
    onConvert,
    onDrop,
    handleOutputFormatChange,
    startConversion,
    images,
    setimages,
    outputFormats,
    progress,
  } = useImageProcessing(ffmpegRef);
  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="text-center  mt-3 mb-5 p-2">
        <h2 className="text-2xl font-bold mb-2">Image Converter</h2>
        <p className="text-lg">
          Easily convert files from one format to another, online.{" "}
        </p>
      </div>
      <DropZoneCom
        items={images}
        setFunc={setimages}
        handleOutputFormatChange={handleOutputFormatChange}
        onConvert={onConvert}
        onDrop={onDrop}
        startConversion={startConversion}
        outputFormats={outputFormats}
        Formats={imageFormats}
        ffmpegRef={ffmpegRef}
        progress={progress}
      />
      <About />
    </div>
  );
}

export default ImageConverter;
