/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <div className="relative">
      <img
        src="./dino.gif"
        alt=""
        className="absolute left-[-400px] top-[-250px] w-[1200px] h-[1200px]"
      />
      <img
        src="./stickman.gif"
        alt=""
        className="absolute left-[800px] top-[550px] w-[250px]"
      />
      <img
        src="./stickman.gif"
        alt=""
        className="absolute left-[1000px] top-[550px] w-[250px]"
      />
      <img
        src="./karthik.jpg"
        alt=""
        className="absolute left-[1110px] top-[560px] w-[60px] h-[60px] rounded-full motion-reduce:animate-bounce"
      />
    </div>
  );
}
