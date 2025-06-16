import Link from "next/link";
import Image from "next/image";

export default function JoinDmc() {

    return (
        <div className="bg-[rgb(227,243,249)]">
        <div className="why-join flex flex-col w-[55%] mx-auto pt-[10rem]">
          <div className="text-center text-[3rem] mb-[2rem] text-[rgb(95,129,95)]">
            JOIN THE DMC!
          </div>
          <div className="text-2xl text-center text-[rgb(95,129,95)] leading-loose">
          Ready to sip, chat, and make new friends? To become a member, follow @DallasMatcha on Instagram and fill out
          the membership form for newsletters.
          </div>
        </div>
        <div className="flex mx-auto justify-center gap-[4rem] mt-[3rem] pb-[5rem]">
            <div className="instagramBtn bg-white w-[36rem] h-[15rem] gap-[2.5rem] rounded-[2rem] text-3xl flex flex-col justify-center items-center">
              <div className="title text-[rgb(95,129,95)]">follow @dallasmatcha</div>
              <Link href={"https://www.instagram.com/dallasmatcha/"} target="_blank" className="button text-white bg-[rgb(239,140,177)] w-[60%] justify-center h-[4rem] flex items-center rounded-[2rem] hover:bg-pink-400 transition cursor-pointer">follow</Link>
            </div>
            <div className="memberFormBtn bg-white w-[36rem] h-[15rem] gap-[2.5rem] rounded-[2rem] text-3xl flex flex-col justify-center items-center">
              <div className="title text-[rgb(95,129,95)]">fill out membership form</div>
              <Link href={""} target="_blank" className="button text-white bg-[rgb(239,140,177)] w-[60%] justify-center h-[4rem] flex items-center rounded-[2rem] hover:bg-pink-400 transition cursor-pointer">fill out form</Link>
            </div>
        </div>
        <div className="photos flex justify-center gap-[2rem] xl:pb-[4rem]">
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