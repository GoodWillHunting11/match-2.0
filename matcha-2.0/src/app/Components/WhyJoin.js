import Image from "next/image";
import Link from "next/link";

export default function WhyJoin() {
    
    return (
        <div className="w-full mt-[10rem] mb-[6rem]">
        <div className="w-11/12 mx-auto flex flex-col">
          <div className="why-join flex flex-col w-[60%] mx-auto">
            <div className="text-center text-[3rem] mb-[2rem] text-[rgb(95,129,95)]">
              WHY JOIN DMC ?
            </div>
            <div className="text-2xl text-center text-[rgb(95,129,95)]">
              THE TRUE ESSENCE OF OUR COMMUNITY LIES IN CONNECTING WITH NEW FRIENDS, SUPPORTING LOCAL, AND ENJOYING QUALITY TIME OVER A CUP OF MATCHA.
              AND EVEN BETTER, THERE ARE NO FEES TO JOIN!
            </div>
          </div>
          <div className="bullet-points w-[85%] mt-[6rem] flex mx-auto w-[70%]">
            <div className="text-3xl gap-[2rem] flex flex-col text-[rgb(100,152,178)] w-1/2">
              <div><span>• </span>EXLUSIVE CAFE DISCOUNTS</div>
              <div><span>• </span> FIRST ACCESS TO SOCIAL EVENTS</div>
              <div><span>• </span>+3200 MATCHA COMMUNITY</div>
              <div><span>• </span>EDUCATIONAL WORKSHOPS</div>
            </div>
            <div className="pics w-1/2">
              <Image 
                src={"/why-pic.png"}
                width={10000}
                height={10000}
                className="object-contain"
                />
            </div>
          </div>
          <div className="mt-[10rem]">
            <div className="top-section w-full gap-[4rem] flex">
              <div className="w-[63%]">
                <Image 
                  src={"/pic-matcha-picnic.png"}
                  width={10000}
                  height={10000}
                  className="object-contain"
                  />
              </div>
              <div className="w-[37%] mt-[3rem]">
                <Image 
                  src={"/pic-workshop.png"}
                  width={10000}
                  height={10000}
                  className="object-contain"
                  />
              </div>
            </div>
            <div className="bottom-section flex mt-[3rem] gap-[7rem]">
              <div>
                <div className="w-[60%]">
                  <Image 
                    src={"/commonGood.png"}
                    width={10000}
                    height={10000}
                    className="object-contain"
                    />
                </div>
                <div className="bg-[rgb(95,129,95)] h-[8rem] mt-[5.5rem] w-[53rem] mx-auto rounded-[2rem] flex justify-center items-center">
                  <div className="text-white text-4xl">11 COMMUNITY EVENTS SINCE 2024</div>
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