import { useCallback, useState } from "react";
import useFfmpeg from "./useFfmpeg";

function useVideoProcessing(ffmpegRef) {
  const [videos, setVideos] = useState([]);
  const [startConversion, setStartConversion] = useState(false);
  const [outputFormats, setOutputFormats] = useState({});
  const { transcodeVideo, progress } = useFfmpeg(setVideos, ffmpegRef);

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
        await transcodeVideo(video, outputFormats[video.name]);
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
  return {
    videos,
    startConversion,
    outputFormats,
    handleOutputFormatChange,
    onConvert,
    onDrop,
    setVideos,
    progress,
  };
}

export default useVideoProcessing;
