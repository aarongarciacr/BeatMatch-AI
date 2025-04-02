import WhiteLogo from "../assets/Primary_Logo_White_CMYK.svg";
import FeatureCard from "../component/FeatureCard";
import Mood from "../assets/Mood.svg";
import Sprint from "../assets/Sprint.svg";
import Tune from "../assets/Tune.svg";
import BG from "../assets/bg-img.jpg";
import Footer1 from "../component/Footer/Footer1";
import OpenModalButton from "../component/OpenModalButton/OpenModalButton";
import LoginModal from "../component/LoginModal/LoginModal";
import { useNavigate } from "react-router-dom";

const Features = [
  {
    title: "Mood-Based Playlists",
    description:
      "Generate playlist that perfectly match your current mood and vibe.",
    img: Mood,
    color: "rgb(139, 92, 246, 0.4)",
  },
  {
    title: "Activity-Driven",
    description:
      "Perfect soundtracks for workouts, study, sessions, or daily commute.",
    img: Sprint,
    color: "rgb(59, 130, 246, 0.4)",
  },
  {
    title: "Personalized Selection",
    description:
      "Curated based on your favorite artists, genres, and listening history.",
    img: Tune,
    color: "rgb(16, 185, 129, 0.4)",
  },
];

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#111827] w-full m-auto">
      <div
        className="min-h-[100vh] w-full flex items-center  pt-[100px] px-4 sm:px-8 md:px-12 lg:px-16"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center md:items-start justify-center gap-5 md:gap-8 max-w-4xl mx-auto md:mx-0 py-10 md:py-0">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Smart Playlist for Every
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Moment
            </h1>
          </div>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center md:text-left">
            Let AI create the perfect playlist that matches your mood, activity
            and music taste.
          </p>

          {/* <button
            className="bg-[#1ED760] text-white px-5 py-2 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-[#19b050] transition-colors"
            onClick={handleLogin}
          >
            <img
              src={WhiteLogo}
              alt="Spotify Logo"
              className="w-5 h-5 inline-block"
            />
            <span>Connect with Spotify</span>
          </button> */}
          <OpenModalButton
            modalComponent={<LoginModal navigate={navigate} />}
            buttonText={
              <>
                <img
                  src={WhiteLogo}
                  alt="Spotify Logo"
                  className="w-6 h-6 inline-block mr-2"
                />
                Connect with Spotify
              </>
            }
            // onButtonClick={handleLogin}
            classname="bg-[#1ED760] text-white px-6 py-2 rounded-full font-bold"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-around gap-6 p-4 sm:p-6 md:p-8 lg:p-10">
        {Features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>

      <div className="py-12 sm:py-16 md:py-20 bg-neutral-900">
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10 h-full w-[90%] md:w-[80%] lg:w-[70%] m-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white text-center">
            Ready to Transform Your Listening Experience?
          </h1>
          <p className="text-slate-200 font-bold text-base sm:text-lg md:text-xl text-center">
            Join thousands of music lovers whe've discovered their perfect
            playlist with BeatMatch AI.
          </p>
          {/* <button
            className="bg-[#1ED760] text-white px-5 py-2 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-[#19b050] transition-colors"
            onClick={handleLogin}
          >
            <img
              src={WhiteLogo}
              alt="Spotify Logo"
              className="w-5 h-5 inline-block"
            />
            <span>Get Started Free</span>
          </button> */}
          <OpenModalButton
            modalComponent={<LoginModal navigate={navigate} />}
            buttonText={
              <>
                <img
                  src={WhiteLogo}
                  alt="Spotify Logo"
                  className="w-6 h-6 inline-block mr-2"
                />
                Get Started Free
              </>
            }
            // onButtonClick={handleLogin}
            classname="bg-[#1ED760] text-white px-6 py-2 rounded-full font-bold"
          />
        </div>
      </div>

      <Footer1 />
    </div>
  );
};

export default Login;
