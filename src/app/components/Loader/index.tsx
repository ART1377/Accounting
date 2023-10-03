import React from "react";
import { Oval } from "react-loader-spinner";

type Props = {};

const Loading = (props: Props) => {
  return (
    <>
      <div
        className={`bg-white/50 backdrop-blur-sm fixed w-screen h-screen z-20 p-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center`}
      >
        <div className="bg-light text-dark p-8 shadow-md rounded-xl">
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      </div>
    </>
  );
};

export default Loading;
