"use client"
import Image from "next/image"

const ShopCardsRowTwo = () => {

    return (
        <div className="flex">
          <div className="left-stars">
            <div className="w-[10rem] -translate-x-16">
              <Image
                src={"/ice2.png"}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
            <div className="w-[10rem]">
              <Image
                src={"/ice2.png"}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
            <div className="w-[10rem] -translate-x-16">
              <Image
                src={"/ice2.png"}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
          </div>
          <div className="shop-cards w-full flex items-center justify-between">
            <div className="w-[18rem] h-[23rem] bg-white rounded-[1rem] pt-4 pr-4 pl-4 pb-16 cursor-pointer hover:scale-[1.03] transition duration-300">
                <div className="w-full h-full bg-[#b6d7e0] rounded-[1rem] relative">
                    <div className="w-[23rem] h-[23rem] absolute -top-[5rem] -left-[3.5rem]">
                        <Image
                            src={"/bluswtr.png"}
                            width={1000}
                            height={1000}
                            className="object-contain"
                        />
                    </div>
              </div>
                <div className="text-center mt-4 text-[#b6d7e0] font-lazy font-bold text-3xl">
                    Blue SWEATER
                </div>
            </div>
            <div className="w-[18rem] h-[23rem] bg-white rounded-[1rem] pt-4 pr-4 pl-4 pb-16 cursor-pointer hover:scale-[1.03] transition duration-300">
              <div className="w-full h-full bg-[#f5d3e4] rounded-[1rem] relative">
              <div className="w-[23rem] h-[23rem] absolute -top-[5rem] -left-[3.5rem]">
                        <Image
                            src={"/matchabag.png"}
                            width={1000}
                            height={1000}
                            className="object-contain"
                        />
                    </div>
              </div>
                <div className="text-center mt-4 text-[#b6d7e0] font-lazy font-bold text-3xl">
                    Matcha powder
                </div>
            </div>
            <div className="w-[18rem] h-[23rem] bg-white rounded-[1rem] pt-4 pr-4 pl-4 pb-16 cursor-pointer hover:scale-[1.03] transition duration-300">
              <div className="w-full h-full bg-[#b6d7e0] rounded-[1rem] relative">
              <div className="w-[23rem] h-[23rem] absolute -top-[5rem] -left-[3.5rem]">
                        <Image
                            src={"/sticker2.png"}
                            width={1000}
                            height={1000}
                            className="object-contain"       
                        />
                    </div>
              </div>
                <div className="text-center mt-4 text-[#b6d7e0] font-lazy font-bold text-3xl">
                    DMC Sticker
                </div>
            </div>
          </div>
          <div className="right-stars">
          <div className="w-[10rem] translate-x-16">
              <Image
                src={"/ice2.png"}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
            <div className="w-[10rem]">
              <Image
                src={"/ice2.png"}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
            <div className="w-[10rem] translate-x-16">
              <Image
                src={"/ice2.png"}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
          </div>
        </div>
    )
}

export default ShopCardsRowTwo