import { useCallback, useState } from "react";
import useFfmpeg from "./useFfmpeg";

function useProcessing(ffmpegRef) {
  const [files, setFiles] = useState([]);
  const [startConversion, setStartConversion] = useState(false);
  const [outputFormats, setOutputFormats] = useState({});
  const { fileConversion, fileCompression, progress } = useFfmpeg(
    setFiles,
    ffmpegRef
  );

  const handleOutputFormatChange = (fileName, format) => {
    setOutputFormats((prevFormats) => ({
      ...prevFormats,
      [fileName]: format,
    }));
  };

  const onConvert = async () => {
    setStartConversion(true);
    for (const file of files) {
      try {
        await fileConversion(file, outputFormats[file.name]);
      } catch (error) {
        console.error("Error converting video:", error);
      }
    }
    setStartConversion(false);
  };

  const onCompress = async (ffmpegOptions) => {
    setStartConversion(true);
    for (const file of files) {
      try {
        await fileCompression(file, ffmpegOptions);
      } catch (error) {
        console.error("Error converting video:", error);
      }
    }
    setStartConversion(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file),
      downloadUrl: "",
      file,
    }));
    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  }, []);

  return {
    onConvert,
    onDrop,
    handleOutputFormatChange,
    startConversion,
    files,
    setFiles,
    outputFormats,
    progress,
    onCompress,
  };
}

export default useProcessing;
