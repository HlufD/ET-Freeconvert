import About from "../components/About";
import Compress from "../components/Compress";
import SingleFileItem from "../components/SingleFileItem";
import useProcessing from "../hooks/useProcessing";

// eslint-disable-next-line react/prop-types
function AudioCompression({ ffmpegRef }) {
  const {
    onDrop,
    onCompress,
    handleOutputFormatChange,
    startConversion,
    files,
    setFiles,
    outputFormats,
    progress,
  } = useProcessing(ffmpegRef);

  const onRemove = (name) => {
    const filterdItems = files.filter((item) => item.name != name);
    setFiles(filterdItems);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="text-center  mt-3 mb-5 p-2">
        <h2 className="text-2xl font-bold mb-2">Audio Compression</h2>
        <p className="text-lg">
          Easily convert files from one format to another, online.{" "}
        </p>
      </div>
      <Compress onDrop={onDrop} />
      <div className="mt-4">
        {files.map((item, index) => (
          <SingleFileItem
            key={index}
            item={item}
            onRemove={onRemove}
            handleOutputFormatChange={handleOutputFormatChange}
            startConversion={startConversion}
            outputFormats={outputFormats}
            Formats={[]}
            progress={progress}
          />
        ))}
      </div>
      <div className="flex bg-[#EFEEF3] w-[700px] items-center px-3 py-3">
        <p className="flex-1 uppercase font-bold text-gray-700">
          Added {files.length} files{" "}
        </p>
        <button
          onClick={() => onCompress(["-codec:a", "libmp3lame", "-b:a", "96k"])}
          className="bg-[#656EE0] text-white font-bold text-md px-5 py-3 hover:scale-105"
        >
          Compress All
        </button>
      </div>
      <About />
    </div>
  );
}

export default AudioCompression;
