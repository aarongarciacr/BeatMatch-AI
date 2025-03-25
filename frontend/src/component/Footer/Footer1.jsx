const Footer1 = () => {
  return (
    <div className="h-auto min-h-[12vh] backContainer w-full flex flex-col items-center justify-center border-t-2 border-neutral-800 py-3 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl gap-4">
        <h1 className="text-slate-500 text-[1rem] sm:text-[1.2rem]">
          BeatMatch AI
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/facebook--v1.png"
              alt="facebook"
              className="w-5 sm:w-6"
            />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/instagram-new--v1.png"
              alt="instagram"
              className="w-5 sm:w-6"
            />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/twitter--v1.png"
              alt="twitter"
              className="w-5 sm:w-6"
            />
          </a>
        </div>
      </div>
      <p className="text-slate-500 text-[0.75rem] sm:text-[0.9rem] mt-3">
        &copy; 2025 BeatMatch AI. All rights reserved.
      </p>
    </div>
  );
};

export default Footer1;
