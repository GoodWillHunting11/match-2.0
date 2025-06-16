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
        <div className=" xl:mt-[6rem] bg-[rgb(227,243,249)] xl:h-[78rem] h-[43rem] w-full bg-top bg-no-repeat bg-cover relative">
        <div className="absolute z-[0] xl:bottom-0 bottom-[3.5rem] left-0 pointer-events-none xl:scale-[1] scale-[3.5] max-w-screen">
          <Image
            src={"/grass.png"}
            width={10000}
            height={10000}
            className="object-cover z-[0] pointer-events-none"
          />
        </div>
        <div className="flex lg:flex-row flex-col-reverse xl:w-[87%] mx-auto pt-[2rem]">
          <div className="flex-col xl:pt-[8rem] xl:w-1/2 pt-[3rem] justify-center mx-auto items-center">
            <div className="xl:text-8xl text-5xl mx-auto text-center w-[90%] xl:w-full text-[rgb(95,129,95)] mb-[2rem]">LET'S GO ON A MATCHA RUN</div>
            <Link href="/events">
              <span className="flex relative z-[20]">
                <div className="xl:w-[22rem] xl:h-[4rem] w-[18rem] h-[4.5rem] bg-[rgb(239,140,177)] rounded-4xl text-white xl:text-3xl text-2xl mx-auto flex items-center justify-center hover:bg-pink-400 transition cursor-pointer">
                  UPCOMING EVENTS
                </div>
              </span>
            </Link>

          </div>
          <div className="xl:w-1/2 w-[65%] mx-auto pt-[6rem] xl:pt-[0rem] flex xl:justify-end justify-center items-center">
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
        <div className="xl:w-[55%] mx-auto relative xl:mt-[20rem] mt-[11rem] z-[40]">
          <div className="text-white xl:text-[3rem] text-3xl text-center w-[80%] flex justify-center mx-auto xl:mb-[2rem] mb-[1rem]">
            WHAT IS THE DALLAS MATCHA CLUB?
          </div>
          <div className="text-white xl:text-2xl text-xl text-center xl:mb-[2rem] mb-[1rem] w-[80%] mx-auto">
            THE DALLAS MATCHA CLUB (DMC) IS A COMMUNITY FOR ANYONE INTERESTED IN TRYING NEW 
            MATCHA SPOTS AROUND THE DALLAS-FORT WORTH AREA.
          </div>
          <div className="text-white xl:text-2xl text-xl text-center xl:mb-[2rem] mb-[2rem] w-[80%] mx-auto">
            WHETHER YOU'RE A MATCHA ENTHUSIAST OR HAVE NEVER TRIED IT, ALL ARE WELCOME TO JOIN THE DMC!
          </div>
          <div className="flex justify-center">
            <Link href="/about">
                <span className="inline-block">
                  <div className="xl:w-[22rem] xl:h-[4rem] h-[4.5rem] w-[18rem] bg-[rgb(239,140,177)] rounded-4xl text-white xl:text-3xl text-2xl flex items-center justify-center hover:bg-pink-400 transition cursor-pointer">
                    READ OUR STORY
                  </div>
                </span>
            </Link>
          </div>
        </div>
        <div>
        <div className="w-full max-w-full xl:block hidden overflow-hidden border border-gray-300 rounded-lg bg-[rgb(252,236,245)] mt-[2rem] xl:mt-[2.5rem]">
      <div className="whitespace-nowrap inline-block animate-marquee xl:text-2xl text-xl font-bold text-[rgb(95,129,95)] pt-3 pb-1">
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