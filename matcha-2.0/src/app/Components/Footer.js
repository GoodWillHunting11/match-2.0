import Link from "next/link";
import Image from "next/image";

export default function Footer() {

    return (
        <div className="bg-[rgb(252,236,245)] flex flex-col items-center">
            <Link href={"/"} className="xl:w-[8rem] w-[6rem] mt-[4rem]">
                <Image 
                    src={"/DMCLogo.png"}
                    width={10000}
                    height={10000}
                    className="object-contain"
                />
            </Link>
            <div className="flex xl:flex-row flex-col text-center xl:gap-12 gap-[1rem] text-3xl text-[rgb(95,129,95)] xl:mt-[2rem] mt-[3rem]">
                {/* <Link href={"/"}>ABOUT</Link> */}
                <Link href={"/"}>EVENTS</Link>
                {/* <Link href={"/"}>CAFES</Link>
                <Link href={"/"}>BLOG</Link> */}
                <Link href={"/"}>SHOP</Link>
            </div>
            <div className="flex xl:flex-row flex-col-reverse w-full xl:w-auto justify-center gap-[3rem] xl:mt-[4rem] mt-[3rem] xl:mb-[5rem] mb-[7rem] items-end">
                <div className="xl:w-[27rem] w-[20rem] mx-auto mt-[1rem] xl:mt-[0rem]">
                    <Image 
                        src={"/besties.png"}
                        width={10000}
                        height={10000}
                        className="object-contain"
                    />
                </div>
                <div className="flex xl:gap-[1.5rem] gap-[2rem] items-end mx-auto">
                    <Link target="_blank" href={"https://www.instagram.com/dallasmatcha/"} className="w-[3rem]">
                        <Image 
                            src={"/icon-instagram.png"}
                            width={10000}
                            height={10000}
                            className="object-contain"
                        />
                    </Link>
                    <div className="w-[3rem]">
                        <Image 
                            src={"/icon-email.png"}
                            width={10000}
                            height={10000}
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}