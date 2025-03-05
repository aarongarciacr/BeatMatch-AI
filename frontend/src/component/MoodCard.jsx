const MoodCard = ({ mood, onClick, isSelected }) => {
  return (
    <div
      className={`w-[15em] h-[6em] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors 
        ${isSelected ? "bg-green-500" : "bg-[#374151]"} active:bg-slate-500`}
      onClick={onClick}
    >
      <p className="text-white text-2xl">{mood.icon}</p>
      <p className="text-white font-bold">{mood.name}</p>
    </div>
  );
};

export default MoodCard;
