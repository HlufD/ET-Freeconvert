import DropZoneCom from "../components/DropZoneCom";

function VideoConverterPage() {
  return (
    <div className="mt-10">
      <DropZoneCom />
    </div>
  );
}

export default VideoConverterPage;

/**
 *  const [video, setVideo] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [size, setSize] = useState(0);
  const [fileType, setFileType] = useState("");

  const onFileCgangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setFileName(file.name);
      setSize(file.size);

      const extensions = file.name.split(".");
      setFileType(extensions[extensions.length - 1]);
      setVideo(new Blob([file]));
    }
  };
  console.log(fileName, size, fileType);
  
 * <input type="file" onChange={onFileCgangeHandler} />
      {video && (
        <video
          controls
          type="video/mp4"
          src={URL.createObjectURL(video)}
        ></video>
      )}
      {video && <FileIcon extension={fileType} {...defaultStyles.docx} />}
 * 
 */
