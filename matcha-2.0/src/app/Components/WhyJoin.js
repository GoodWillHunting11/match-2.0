import Image from "next/image";
import Link from "next/link";

export default function WhyJoin() {
    
    return (
        <div className="w-full xl:mt-[15rem] mt-[37rem] mb-[6rem]">
        <div className="w-11/12 mx-auto flex flex-col">
          <div className="why-join flex flex-col xl:w-[60%] w-[78%] mx-auto">
            <div className="text-center xl:text-[3rem] text-3xl xl:mb-[2rem] mb-[1rem] text-[rgb(95,129,95)]">
              WHY JOIN DMC ?
            </div>
            <div className="xl:text-2xl text-xl text-center text-[rgb(95,129,95)]">
              THE TRUE ESSENCE OF OUR COMMUNITY LIES IN CONNECTING WITH NEW FRIENDS, SUPPORTING LOCAL, AND ENJOYING QUALITY TIME OVER A CUP OF MATCHA.
              AND EVEN BETTER, THERE ARE NO FEES TO JOIN!
            </div>
          </div>
          <div className="bullet-points xl:w-[85%] xl:mt-[6rem] lg:flex-row flex flex-col-reverse mx-auto xl:w-[70%]">
            <div className="xl:text-3xl text-xl xl:gap-[2rem] gap-[1rem] flex flex-col ml-[1rem] xl:ml-0 text-[rgb(100,152,178)] xl:w-1/2">
              <div><span>• </span>EXLUSIVE CAFE DISCOUNTS</div>
              <div><span>• </span> FIRST ACCESS TO SOCIAL EVENTS</div>
              <div><span>• </span>+3200 MATCHA COMMUNITY</div>
              <div><span>• </span>EDUCATIONAL WORKSHOPS</div>
            </div>
            <div className="pics xl:w-1/2 mt-[2rem] mb-[2rem] xl:mb-[0rem] xl:mt-0">
              <Image 
                src={"/why-pic.png"}
                width={10000}
                height={10000}
                className="object-contain"
                />
            </div>
          </div>
          <div className="xl:mt-[10rem] mt-[3rem]">
            <div className="top-section w-full xl:gap-[4rem] gap-[1.5rem] flex flex-col lg:flex-row">
              <div className="xl:w-[63%]">
                <Image 
                  src={"/pic-matcha-picnic.png"}
                  width={10000}
                  height={10000}
                  className="object-contain"
                  />
              </div>
              <div className="xl:w-[37%] xl:mt-[3rem]">
                <Image 
                  src={"/pic-workshop.png"}
                  width={10000}
                  height={10000}
                  className="object-contain"
                  />
              </div>
            </div>
            <div className="bottom-section flex lg:flex-row flex-col-reverse xl:mt-[3rem] mt-[1.5rem] xl:gap-[7rem] gap-[1.5rem]">
              <div>
                <div className="xl:w-[60%]">
                  <Image 
                    src={"/commonGood.png"}
                    width={10000}
                    height={10000}
                    className="object-contain"
                    />
                </div>
                <div className="bg-[rgb(95,129,95)] xl:h-[8rem] h-[8rem] xl:mt-[5.5rem] mt-[3rem] xl:w-[53rem] mx-auto rounded-[2rem] flex justify-center items-center">
                  <div className="text-white xl:text-4xl text-xl w-[60%] xl:w-full text-center">11 COMMUNITY EVENTS SINCE 2024</div>
                </div>
              </div>
              <div className="">
               <Image 
                src={"/earthDay.png"}
                width={10000}
                height={10000}
                className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}