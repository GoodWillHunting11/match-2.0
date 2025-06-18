import Link from "next/link";
import Image from "next/image";

export default function JoinDmc() {

    return (
        <div className="bg-[rgb(227,243,249)]">
        <div className="why-join flex flex-col xl:w-[55%] w-[70%] mx-auto xl:pt-[10rem] pt-[6rem]">
          <div className="text-center xl:text-[3rem] text-3xl xl:mb-[2rem] mb-[1rem] text-[rgb(95,129,95)]">
            JOIN THE DMC!
          </div>
          <div className="text-2xl text-center text-[rgb(95,129,95)] xl:leading-loose text-xl">
          Ready to sip, chat, and make new friends? To become a member, follow @DallasMatcha on Instagram and fill out
          the membership form for newsletters.
          </div>
        </div>
        <div className="flex mx-auto xl:flex-row flex-col justify-center items-center gap-[4rem] mt-[3rem] pb-[5rem]">
            <div className="instagramBtn bg-white xl:w-[36rem] w-[18rem] xl:h-[15rem] h-[10rem] xl:gap-[2.5rem] gap-[1rem] rounded-[2rem] xl:text-3xl text-2xl text-center xl:text-left flex flex-col justify-center items-center">
              <div className="title text-[rgb(95,129,95)]">follow @dallasmatcha</div>
              <Link href={"https://www.instagram.com/dallasmatcha/"} target="_blank" className="button text-white bg-[rgb(239,140,177)] xl:w-[60%] w-[75%] justify-center xl:h-[4rem] h-[3rem] flex items-center rounded-[2rem] hover:bg-pink-400 transition cursor-pointer">follow</Link>
            </div>
            <div className="memberFormBtn bg-white xl:w-[36rem] w-[18rem] xl:h-[15rem] h-[10rem] xl:gap-[2.5rem] gap-[1rem] rounded-[2rem] xl:text-3xl text-2xl text-center  flex flex-col justify-center items-center">
              <div className="title xl:w-full w-[85%] text-[rgb(95,129,95)]">fill out membership form</div>
              <Link href={""} target="_blank" className="button text-white bg-[rgb(239,140,177)] xl:w-[60%] w-[75%] justify-center xl:h-[4rem] h-[3rem] flex items-center rounded-[2rem] hover:bg-pink-400 transition cursor-pointer">fill out form</Link>
            </div>
        </div>
        <div className="photos md:flex hidden justify-center gap-[2rem] xl:pb-[4rem]">
          <div className="w-[20rem]">
             <Image 
              src={"/t-7th.png"}
              width={10000}
              height={10000}
              className="object-contain"
              />
          </div>
          <div className="w-[20rem]">
             <Image 
              src={"/t-selfie.png"}
              width={10000}
              height={10000}
              className="object-contain"
              />
          </div>
          <div className="w-[20rem]">
             <Image 
              src={"/t-hypen.png"}
              width={10000}
              height={10000}
              className="object-contain"
              />
          </div>
          <div className="w-[20rem]">
             <Image 
              src={"/t-elevated.png"}
              width={10000}
              height={10000}
              className="object-contain"
              />
          </div>
        </div>
      </div>
    )
}