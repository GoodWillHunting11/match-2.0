"Use Client"
import Link from "next/link"
import Image from "next/image"

export default function Nav() {

    return (
        <div className="bg-white h-[6rem] flex items-center justify-end relative">
            <div className="w-[7rem] absolute left-[6rem] bottom-[-3.5rem] z-40">
                <Image
                    src={"/DMCLogo.png"}
                    className="object-contain"
                    width={1000}
                    height={1000}
                />
            </div>
            <div className="flex gap-12 text-3xl mr-[4rem] text-[rgb(100,152,178)]">
                <Link href={"/aaliyah"}>ABOUT</Link>
                <Link href={"/"}>EVENTS</Link>
                <Link href={"/"}>CAFES</Link>
                <Link href={"/"}>BLOG</Link>
                <Link href={"/"}>SHOP</Link>
            </div>
        </div>
    )
}