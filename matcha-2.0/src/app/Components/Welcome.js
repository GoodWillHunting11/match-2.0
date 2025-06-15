import Image from "next/image";
import Link from "next/link";

export default function Welcome() {

    const items = [
        "• EXCLUSIVE DISCOUNTS   ",
        "FREE MEMBERSHIP   ",
        "ALL ARE WELCOME   ",
      ];
    
      // Combine items into a single string to scroll continuously
      const tickerText = items.join("     •     ");

    return (
        <div className=" mt-[6rem] bg-[rgb(227,243,249)] h-[78rem] w-full bg-top bg-no-repeat bg-cover relative">
        <div className="absolute z-[0] bottom-0 left-0 pointer-events-none">
          <Image
            src={"/grass.png"}
            width={10000}
            height={10}
            className="object-cover z-[0] pointer-events-none"
          />
        </div>
        <div className="flex w-[87%] mx-auto pt-[2rem]">
          <div className="flex-col pt-[8rem] w-1/2">
            <div className="text-8xl text-[rgb(95,129,95)] mb-[2rem]">LET'S GO ON A MATCHA RUN</div>
            <Link href="/events">
              <span className="inline-block">
                <div className="w-[22rem] h-[4rem] bg-[rgb(239,140,177)] rounded-4xl text-white text-3xl flex items-center justify-center hover:bg-pink-400 transition cursor-pointer">
                  UPCOMING EVENTS
                </div>
              </span>
            </Link>

          </div>
          <div className="w-1/2 flex justify-end items-center">
            <div className="w-[35rem]">
              <Image
                src={"/chawan-hero.png"}
                width={10000}
                height={10000}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-[55%] mx-auto relative mt-[20rem] z-[40]">
          <div className="text-white text-[3rem] text-center mb-[2rem]">
            WHAT IS THE DALLAS MATCHA CLUB?
          </div>
          <div className="text-white text-2xl text-center mb-[2rem] w-[80%] mx-auto">
            THE DALLAS MATCHA CLUB (DMC) IS A COMMUNITY FOR ANYONE INTERESTED IN TRYING NEW 
            MATCHA SPOTS AROUND THE DALLAS-FORT WORTH AREA.
          </div>
          <div className="text-white text-2xl text-center mb-[2rem] w-[80%] mx-auto">
            WHETHER YOU'RE A MATCHA ENTHUSIAST OR HAVE NEVER TRIED IT, ALL ARE WELCOME TO JOIN THE DMC!
          </div>
          <div className="flex justify-center">
            <Link href="/about">
                <span className="inline-block">
                  <div className="w-[22rem] h-[4rem] bg-[rgb(239,140,177)] rounded-4xl text-white text-3xl flex items-center justify-center hover:bg-pink-400 transition cursor-pointer">
                    READ OUR STORY
                  </div>
                </span>
            </Link>
          </div>
        </div>
        <div>
        <div className="w-full max-w-full overflow-hidden border border-gray-300 rounded-lg bg-[rgb(252,236,245)] mt-[5rem]">
      <div className="whitespace-nowrap inline-block animate-marquee text-2xl font-bold text-[rgb(95,129,95)] pt-3 pb-1">
        {tickerText}
        {tickerText}
        {tickerText}
        {tickerText}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>

        </div>
      </div>
    )
}