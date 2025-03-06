import WhiteLogo from "../assets/Primary_Logo_White_CMYK.svg";
import FeatureCard from "../component/FeatureCard";
import Mood from "../assets/mood.svg";
import Sprint from "../assets/sprint.svg";
import Tune from "../assets/tune.svg";
import BG from "../assets/bg-img.jpg";
import Footer1 from "../component/Footer/Footer1";

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
  const handleLogin = () => {
    window.location.href = "/api/auth/login"; // Redirects the user to Spotify login
  };

  return (
    <div className=" flex flex-col h-full bg-[#111827] w-full m-auto">
      <div
        className="h-[100vh] w-full flex pt-[15em] pl-[7em]"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-[50vh] flex flex-col items-start justify-center gap-10">
          <div>
            <h1 className="text-6xl font-extrabold text-white ">
              Smart Playlist for Every
            </h1>
            <h1 className="text-6xl font-extrabold text-white">Moment</h1>
          </div>
          <p className="text-white text-[1.5em] font-bold">
            Let AI create the perfect playlist that matches your mood, activity
            and music taste.
          </p>

          <button
            className=" bg-[#1ED760] text-white px-6 py-2 rounded-full font-bold"
            onClick={handleLogin}
          >
            <img
              src={WhiteLogo}
              alt="Spotify Logo"
              className="w-6 h-6 inline-block mr-2"
            />
            Connect with Spotify
          </button>
        </div>
      </div>
      <div className="flex justify-around gap-10 p-10">
        {Features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
      <div className="h-[50vh] bg-neutral-900">
        <div className="flex flex-col items-center justify-center gap-10 h-full w-[70%] m-auto">
          <h1 className="text-5xl text-white font-bold text-center">
            Ready to Transform Your Listening Experience?
          </h1>
          <p className="text-slate-200 font-bold text-[1.2rem]">
            Join thousands of music lovers whe've discovered their perfect
            playlist with BeatMatch AI.
          </p>
          <button
            className=" bg-[#1ED760] text-white px-6 py-2 rounded-full font-bold"
            onClick={handleLogin}
          >
            <img
              src={WhiteLogo}
              alt="Spotify Logo"
              className="w-6 h-6 inline-block mr-2"
            />
            Get Started Free
          </button>
        </div>
      </div>
      <Footer1 />
    </div>
  );
};

export default Login;
