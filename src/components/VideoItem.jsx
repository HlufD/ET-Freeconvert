/* eslint-disable react/prop-types */
import { Cog6ToothIcon, XCircleIcon } from "@heroicons/react/24/outline";

const VideoItem = ({
  video,
  onRemove,
  handleOutputFormatChange,
  startConversion,
  outputFormats,
}) => {
  return (
    <div className="flex space-x-3 border mt-4 p-3">
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
            <option className="px-3 py-2 text-sm" value="mkv">
              MKV
            </option>
            <option className="px-3 py-2 text-sm" value="mp3">
              MP3
            </option>
            <option className="px-3 py-2 text-sm" value="wmv">
              WMV
            </option>
            <option className="px-3 py-2 text-sm" value="avi">
              AVI
            </option>
            <option className="px-3 py-2 text-sm" value="flv">
              FLV
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
            download={`${video.name.split(".")[0]}.${outputFormats[
              video.name
            ].toLowerCase()}`}
            className="text-green-600 text-sm rounded-sm cursor-pointer border border-green-600 px-3 py-1"
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default VideoItem;
