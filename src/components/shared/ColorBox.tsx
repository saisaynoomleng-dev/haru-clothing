const ColorBox = ({ color }: { color: string }) => {
  return (
    <div
      className="rounded-full h-5 w-5 border border-brand-black"
      style={{ backgroundColor: `${color}` }}
    ></div>
  );
};

export default ColorBox;
