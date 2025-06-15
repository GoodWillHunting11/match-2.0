import Link from "next/link";
import Image from "next/image";

export default function WhereNext() {

    return (
      <div className="relative">
        <div className="why-join flex flex-col w-[55%] mx-auto pt-[10rem]">
          <div className="text-center text-[3rem] mb-[2rem] text-[rgb(95,129,95)]">
            WHERE TO NEXT?
          </div>
          <div className="text-2xl text-center text-[rgb(95,129,95)] leading-loose">
          Ready to sip, chat, and make new friends? To become a member, follow @DallasMatcha on Instagram and fill out
          the membership form for newsletters. More words and stuff.
          </div>
          <div className="flex justify-center mt-[5rem] mb-[8rem] relative z-[20]">
            <Link href={""} target="_blank" className="button text-white bg-[rgb(239,140,177)] w-[60%] justify-center h-[4rem] flex items-center rounded-[2rem] text-3xl hover:bg-pink-400 transition cursor-pointer">view cafes</Link>
          </div>
        </div>
        <div className="absolute bottom-0 w-[85%] left-[5rem]">
          <Image 
            src={"/texas-trail.png"}
            width={10000}
            height={10000}
            className="object-contain"
            />
        </div>
      </div>
    )
}