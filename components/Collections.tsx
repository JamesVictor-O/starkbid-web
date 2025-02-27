"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Check } from "lucide-react";

const timeRanges = ["1h", "6h", "24h", "3d", "7d"];
const blockchains = ["Ethereum", "Bitcoin", "Tron"];

const mockData = [
  {
    id: 1,
    name: "Xenos",
    image: "/images/nft1.svg",
    verified: true,
    floorPrice: "35 ETH",
    volume: "200 ETH",
    topOffer: "31 ETH",
    floorChange: "+20.40%",
    sales: "150",
    holdersPercent: "45%",
    holdersTotal: "2054/4501",
  },
  {
    id: 2,
    name: "Bored Apes",
    image: "/images/nft2.svg",
    verified: true,
    floorPrice: "35 ETH",
    volume: "200 ETH",
    topOffer: "31 ETH",
    floorChange: "-20.40%",
    sales: "150",
    holdersPercent: "45%",
    holdersTotal: "2054/4501",
  },
  {
    id: 3,
    name: "Monalissa",
    image: "/images/nft3.svg",
    verified: true,
    floorPrice: "35 ETH",
    volume: "200 ETH",
    topOffer: "31 ETH",
    floorChange: "-20.40%",
    sales: "150",
    holdersPercent: "45%",
    holdersTotal: "2054/4501",
  },
  {
    id: 4,
    name: "Bad BUNNIEZ",
    image: "/images/nft4.svg",
    verified: true,
    floorPrice: "35 ETH",
    volume: "200 ETH",
    topOffer: "31 ETH",
    floorChange: "-20.40%",
    sales: "150",
    holdersPercent: "45%",
    holdersTotal: "2054/4501",
  },
];

export default function NFTCollectionsTable() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("1h");
  const [selectedBlockchain, setSelectedBlockchain] = useState("Ethereum");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full max-w-[1200px] px-4 md:px-10 xl:px-20  px-3">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0 justify-between mb-6">
        <h2 className="text-2xl font-bold">Top NFT Collections</h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-[#3D4145] w-fit rounded-lg p-1 flex items-center">
            {timeRanges.map((range) => (
              <motion.button
                key={range}
                className={`px-4 py-2 rounded-lg text-sm relative ${
                  selectedTimeRange === range ? "text-black" : "text-white"
                }`}
                onClick={() => setSelectedTimeRange(range)}
              >
                {selectedTimeRange === range && (
                  <motion.div
                    className="absolute inset-0  rounded-lg bg-white text-red-200"
                    layoutId="timeRangeBackground"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{range}</span>
              </motion.button>
            ))}
          </div>

          <div className="relative">
            <button
              className="bg-[#3D4145] px-5 py-3 rounded-lg flex items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedBlockchain}
              <ChevronDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-32 bg-[#3D4145] rounded-lg py-1 z-50">
                {blockchains.map((chain) => (
                  <button
                    key={chain}
                    className="w-full px-4 py-2 text-left hover:bg-[#2C2C35] flex items-center justify-between"
                    onClick={() => {
                      setSelectedBlockchain(chain);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {chain}
                    {selectedBlockchain === chain && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/collections"
            className="bg-[#3D4145] px-5 py-3 rounded-lg w-fit flex items-center gap-2 hover:bg-[#2C2C35] transition-colors"
          >
            See all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
      </div>

      <div className="w-full">
        <div className="flex gap-7 justify-between w-full py-4 border-b border-[#2C2C35] text-xs md:text-sm text-white/60">
          <div className="w-2/5 md:w-1/3">COLLECTION</div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 w-3/5 md:w-2/3  items-center">
            <div className="">FLOOR PRICE</div>
            <div className="">VOLUME</div>
            <div className="hidden lg:flex">TOP OFFER</div>
            <div className="hidden md:flex">FLOOR ID</div>
            <div className="">SALES</div>
            <div className="hidden md:flex">HOLDERS</div>
          </div>
        </div>

        {mockData.map((collection) => (
          <motion.div
            key={collection.id}
            className="flex justify-beteen font-medium w-full gap-8 text-xs md:text-lg py-4  border-[#2C2C35] items-center hover:bg-[#1C1C21] transition-colors cursor-pointer"
            whileHover={{ scale: 1.005 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className=" w-2/5 md:w-1/3 flex items-center gap-3">
              <div className="relative w-16 h-16">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="rounded-lg object-cover w-14 h-14"
                  fill
                />
                {collection.verified && (
                  <div className="absolute -bottom-1 -right-1 ">
                    <img src="/icons/ethereum-verified.svg" alt="Verified" />
                  </div>
                )}
              </div>
              <span className="font-medium ">{collection.name}</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 w-3/5 md:w-2/3  items-center">
              <div className="text- w-fit flex">{collection.floorPrice}</div>
              <div className="text- w-fit">{collection.volume}</div>
              <div className="hidden lg:flex w-fit">{collection.topOffer}</div>
              <div
                className={`text- w-fit hidden md:flex ${
                  collection.floorChange.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {collection.floorChange}
              </div>
              <div className="text-">{collection.sales}</div>
              <div className="hidden sm:flex flex-col">
                <div>{collection.holdersPercent}</div>
                <div className="text-sm text-[#A3A3A3]">
                  {collection.holdersTotal}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
