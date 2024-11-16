const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-transparent">
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-4 border-[#F6671B] border-solid rounded-full border-r-transparent animate-spin mb-4" />

        <span className="text-[#F6671B] font-semibold text-lg animate-pulse opacity-75">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;
