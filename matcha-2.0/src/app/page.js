"use client"
import Image from "next/image";
import Nav from "./Components/Nav";
import Link from "next/link";
import Welcome from "./Components/Welcome";
import WhyJoin from "./Components/WhyJoin";
import JoinDmc from "./Components/JoinDmc";
import WhereNext from "./Components/WhereNext";
import Footer from "./Components/Footer";

export default function Home() {

  return (
    <div className="max-w-[1525px] overflow-x-hidden">
      <div className="z-[60] fixed top-0 left-0 w-screen">
        <Nav />
      </div>
      <Welcome />
      <WhyJoin />
      <JoinDmc />
      <WhereNext />
      <Footer />
    </div>
  );
}


