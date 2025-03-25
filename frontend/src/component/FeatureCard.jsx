const FeatureCard = ({ feature }) => {
  return (
    <div className="flex flex-col items-start gap-5 p-10 bg-[#18212f] rounded-3xl">
      <img
        src={feature.img}
        alt={feature.title}
        style={{ background: feature.color }}
        className="w-16 h-16 p-3 rounded-xl  "
      />
      <h1 className="text-2xl text-slate-200">{feature.title}</h1>
      <p className="text-slate-400 font-bold">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
