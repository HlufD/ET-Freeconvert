/* eslint-disable react/prop-types */
import { Cog6ToothIcon, XCircleIcon } from "@heroicons/react/24/outline";

const SingleFileItem = ({
  item,
  onRemove,
  handleOutputFormatChange,
  startConversion,
  outputFormats,
  Formats,
  progress,
}) => {
  const fileType = item.type.split("/")[0];
  return (
    <div className="flex space-x-3 border mt-4 p-3 w-[700px]">
      <div className="flex items-center flex-1 space-x-3">
        {fileType == "video" && (
          <video controls width="50">
            <source src={item.preview} type={item.type} />
            Your browser does not support the video tag.
          </video>
        )}
        {fileType == "image" && <img src={item.preview} width="30" />}
        <p className="truncate w-20">{item.name}</p>
      </div>
      <div className="flex items-center space-x-6">
        <p className="text-gray-500">
          {(item.size / (1024 * 1024)).toFixed(2)} MB
        </p>
        <div className="text-gray-500 flex items-center space-x-3">
          <p>Output:</p>
          <select
            name="outputFormat"
            id=""
            className="px-3 py-1 border border-[#868FEF] text-[#868FEF] rounded-sm bg-white"
            onChange={(e) =>
              handleOutputFormatChange(item.name, e.target.value)
            }
          >
            {Formats.map((format) => {
              return (
                <option
                  key={format}
                  className="px-3 py-2 text-sm"
                  value={format}
                >
                  {format.toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>
        <Cog6ToothIcon
          className={`w-8 h-8 text-[#656EE0] cursor-pointer transition ease-in-out hover:scale-125 ${
            startConversion ? "animate-spin" : ""
          } `}
        />
        <XCircleIcon
          onClick={() => onRemove(item.name)}
          className="h-8 w-8 text-[#656EE0] cursor-pointer hover:scale-125"
        />
        {item.downloadUrl ? (
          <a
            href={item.downloadUrl}
            download={`${item.name.split(".")[0]}.${outputFormats[
              item.name
            ].toLowerCase()}`}
            className="text-green-600 text-sm rounded-sm cursor-pointer border border-green-600 px-3 py-1 "
          >
            Download
          </a>
        ) : (
          <div>
            <p className="text-green-600 text-sm">{progress}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleFileItem;
