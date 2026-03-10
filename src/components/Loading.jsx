const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <video
        src="/images/loading.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        className="w-32 md:w-40 h-auto object-contain pointer-events-none select-none"
      />
    </div>
  );
};

export default Loading;
