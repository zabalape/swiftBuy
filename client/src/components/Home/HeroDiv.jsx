const HeroDiv = () => {
    return (
        <div className="border border-none h-[448px] ml-5 overflow-hidden">
  <div className="relative">
    <h1 className="absolute w-[304px] h-[130px] text-black text-[45px] font-bold leading-[42.50px] tracking-[-2px]">
      Define yourself in your unique way.
    </h1>
    <div className="max-w-full h-[448px]">
      <img
        className="absolute right-[0px] max-w-[450px] h-auto"
        alt="Frame"
        src="https://generation-sessions.s3.amazonaws.com/6f63a7dda0e47486ddc9b3105b504411/img/frame-173.svg"
      />
    </div>

    <img
      className="absolute right-[35px] top-[81px] w-[191px] h-[367px]"
      alt="Unsplash"
      src="https://generation-sessions.s3.amazonaws.com/6f63a7dda0e47486ddc9b3105b504411/img/unsplash-ichpbhfd0pw@2x.png"
    />
  </div>
</div>
    );
  };
export default HeroDiv;