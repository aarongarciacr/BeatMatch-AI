const Footer1 = () => {
  return (
    <div className="h-[15vh] bg-[#111827] w-full flex flex-col items-center justify-center ">
      <div className="flex flex-row items-center justify-around w-[100%] gap-[50em]">
        <h1 className="text-slate-500 text-[1.2rem] font-bold">BeatMatch AI</h1>
        <div className="flex items-center gap-5">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/facebook--v1.png "
              alt="facebook"
            />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/instagram-new--v1.png"
              alt="instagram"
            />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/ios-glyphs/30/64748b/twitter--v1.png"
              alt="twitter"
            />
          </a>
        </div>
      </div>
      <p className="text-slate-500 text-[1rem]">
        &copy; 2025 BeatMatch AI. All rights reserved.
      </p>
    </div>
  );
};

export default Footer1;
