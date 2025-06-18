"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react" // optional: for icons

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white xl:h-[6rem] h-[4.5rem] flex items-center xl:justify-end justify-between px-6 relative">
            {/* Logo */}
            <div
             className="xl:w-[7rem] w-[3rem] xl:absolute xl:left-[6rem] right-[20%] bottom-[2rem] xl:bottom-[-3.5rem] z-40">
                <Image
                    src={"/DMCLogo.png"}
                    alt="DMC Logo"
                    className="object-contain"
                    width={1000}
                    height={1000}
                />
            </div>
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-12 text-3xl text-[rgb(100,152,178)] xl:mr-[4rem]">
                <Link href={"/aaliyah"}>ABOUT</Link>
                <Link href={"/"}>EVENTS</Link>
                <Link href={"/"}>CAFES</Link>
                <Link href={"/"}>BLOG</Link>
                <Link href={"/"}>SHOP</Link>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden z-50">
                <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-[4rem] left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 text-2xl text-[rgb(100,152,178)] py-6 md:hidden">
                    <Link href="/aaliyah" onClick={() => setIsOpen(false)}>ABOUT</Link>
                    <Link href="/" onClick={() => setIsOpen(false)}>EVENTS</Link>
                    <Link href="/" onClick={() => setIsOpen(false)}>CAFES</Link>
                    <Link href="/" onClick={() => setIsOpen(false)}>BLOG</Link>
                    <Link href="/" onClick={() => setIsOpen(false)}>SHOP</Link>
                </div>
            )}
        </nav>
    )
}
