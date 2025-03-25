const Footer2 = () => {
  return (
    <div className="h-auto min-h-[10vh] py-4 backContainer border-t-2 border-neutral-800 w-full flex flex-row items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full px-4 md:px-8 lg:px-16 gap-4 md:gap-8">
        <p className="text-slate-500 text-sm md:text-base text-center md:text-left">
          &copy; 2025 BeatMatch AI. All rights reserved.
        </p>
        <div className="flex items-center gap-4 md:gap-5">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/facebook--v1.png"
              alt="facebook"
              className="w-6 md:w-7 h-6 md:h-7"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/instagram-new--v1.png"
              alt="instagram"
              className="w-6 md:w-7 h-6 md:h-7"
            />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/twitter--v1.png"
              alt="twitter"
              className="w-6 md:w-7 h-6 md:h-7"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer2;
