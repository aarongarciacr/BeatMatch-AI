const MoodCard = ({ mood, onClick, isSelected }) => {
  return (
    <div
      className={`w-[16em]  rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ease-in-out transform  ${
        isSelected ? " h-[7em]" : "h-[6em]"
      }`}
      style={{
        backgroundColor: isSelected ? mood.selectedColor : mood.color,
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = mood.hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = mood.color;
        }
      }}
      onClick={onClick}
    >
      <p className="text-white text-2xl">{mood.icon}</p>
      <p className="text-white font-bold">{mood.name}</p>
    </div>
  );
};

export default MoodCard;
