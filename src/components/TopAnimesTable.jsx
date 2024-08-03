import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Top10AnimesTable = ({ data }) => {
  const MetaData = [{ title: "Today" }, { title: "Week" }, { title: "Month" }];
  const [activeDuration, setActiveDuration] = useState(0);
  const [currentData, setCurrentData] = useState(null);
  const handleDurationChange = (duration) => {
    setActiveDuration(duration);
  };

  useEffect(() => {
    setCurrentData((prevValue) => null);
    const durationArr = [data?.today, data?.week, data?.month];
    setCurrentData(durationArr?.[activeDuration]);
  }, [activeDuration, data]);

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[500px]">
        <div className="skeleton-carousel" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl max-md:text-2xl font-semibold border-l-8 text-nowrap border-l-ring px-5">
          Top 10
        </h2>
        <div className="flex flex-row gap-3 items-center">
          {MetaData.map((data, index) => (
            <button
              key={data + index}
              onClick={() => handleDurationChange(index)}
              className={`p-2 px-3 rounded-md max-md:px-2 max-md:p-1 ${
                index == activeDuration ? "bg-indigo-400" : "bg-input"
              }`}
            >
              {data.title}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2  max-md:grid-cols-1 grid-rows-auto gap-3 bg-neutral-700/30 p-5 rounded-md">
        {currentData &&
          currentData.map((data, index) => (
            <Link
              key={data.id}
              href={`/pages/Anime/details/${data.id}`}
              className="flex flex-row items-center gap-10 group animated"
            >
              <h1 className="text-2xl w-[30px] text-center border-b-4 border-indigo-400 group-hover:text-indigo-300 transition-full">
                {data.rank.toString().padStart(2, "0")}
              </h1>
              <div className="flex flex-row gap-2">
                <img
                  className="h-[100px] w-[70px] object-cover rounded-lg group-hover:blur-[3px] transition-full"
                  src={data.poster}
                  alt=""
                />
                <div className="flex flex-col justify-center gap-2">
                  <h1 className="group-hover:text-indigo-300 transition-full">
                    {data.name.length > 30
                      ? data.name.substring(0, 30) + "..."
                      : data.name || data.jname}
                  </h1>
                  <div className="flex flex-row gap-[2px] w-full items-center text-[12px]">
                    <p className="flex flex-row items-center gap-1 px-1 rounded-l-sm bg-green-200 text-black">
                      <FontAwesomeIcon icon={faClosedCaptioning} />{" "}
                      {data.episodes.sub}
                    </p>
                    <p className="flex flex-row items-center gap-1 px-1 bg-blue-200 text-black">
                      <FontAwesomeIcon icon={faMicrophone} />{" "}
                      {data.episodes.dub || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Top10AnimesTable;
