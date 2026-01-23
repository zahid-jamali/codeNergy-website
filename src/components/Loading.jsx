const Loading = () => {
  return (
    <>
      <div className="flex flex-col justify-start items-center h-screen bg-black text-white">
        {/* Animated Video Loader */}
        <video
          src="/images/loading.mp4" // 👈 JUST SET THIS PATH
          autoPlay
          loop
          muted
          playsInline
          className="w-40 h-40 object-contain"
        />

        <p className="mt-4 text-lg tracking-wide opacity-80">
          Loading content...
        </p>
      </div>
    </>
  );
};

export default Loading;
