import { useCallback, useState } from "react";
import useFfmpeg from "./useFfmpeg";

function useImageProcessing(ffmpegRef) {
  const [images, setimages] = useState([]);
  const [startConversion, setStartConversion] = useState(false);
  const [outputFormats, setOutputFormats] = useState({});
  const { transcodeVideo, progress } = useFfmpeg(setimages, ffmpegRef);

  const handleOutputFormatChange = (imageName, format) => {
    setOutputFormats((prevFormats) => ({
      ...prevFormats,
      [imageName]: format,
    }));
  };

  const onConvert = async () => {
    setStartConversion(true);
    for (const image of images) {
      try {
        await transcodeVideo(image, outputFormats[image.name]);
      } catch (error) {
        console.error("Error converting video:", error);
      }
    }
    setStartConversion(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const updatedImages = acceptedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file),
      downloadUrl: "",
      file,
    }));
    setimages((prevImages) => [...prevImages, ...updatedImages]);
  }, []);

  return {
    onConvert,
    onDrop,
    handleOutputFormatChange,
    startConversion,
    images,
    setimages,
    outputFormats,
    progress,
  };
}

export default useImageProcessing;
