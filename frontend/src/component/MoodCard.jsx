const MoodCard = ({ mood }) => {
  return (
    <div className="bg-[#374151] w-[15em] h-[6em] rounded-xl flex flex-col items-center justify-center">
      <p className="text-white text-2xl">{mood.icon}</p>
      <p className="text-white font-bold">{mood.name}</p>
    </div>
  );
};

export default MoodCard;
