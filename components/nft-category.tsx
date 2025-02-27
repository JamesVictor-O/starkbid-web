"use client"
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const NFTCategory = () => {
    const [activeTab, setActiveTab] = useState("all");

    const options = [
        { name: "All", value: "all" },
        { name: "Art", value: "art" },
        { name: "PFPs", value: "pfps" },
        { name: "Gaming", value: "gaming" },
        { name: "Memberships", value: "memberships" },
        { name: "Photography", value: "photography" },
    ];

    return (
        <div className="w-full mt-[81.5px] px-[16px] lg:px-[80px]">
            <div className="w-full flex items-center justify-start gap-[12px] overflow-x-auto remove-scrollbar">
                {options.map(({ name, value }) => {
                    const isActive = activeTab === value;
                    return (
                        <motion.div
                            key={value}
        
                            whileHover={{ scale: 0.9 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            onClick={() => setActiveTab(value)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={isActive}
                            onKeyDown={(e) => e.key === 'Enter' && setActiveTab(value)}
                            className={`w-auto cursor-pointer px-[20px] ${isActive ? "bg-white" : "bg-[#FFFFFF33]"} rounded-[8px] py-[12px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black`}
                        >
                            <p className={`text-[12px] font-bold ${isActive ? "text-[#414651]" : "text-white"} md:text-[14px]`}>
                                {name}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="bg-[url('/images/category-image.png')] rounded-[10px] lg:rounded-[20px] flex flex-col justify-end bg-cover bg-center bg-no-repeat min-h-[498px] w-full mt-[24px] relative overflow-hidden" role="img" aria-label="Pixel Stats NFT banner">
                <div className="w-full bottom-0 px-[16px] pb-[28px] bg-gradient-to-b from-[#00000000] to-[#00000080] md:relative lg:px-[60px]">
                    <p className="text-white font-bold text-[28px] text-left md:text-[40px]">Pixel Stats</p>
                    <div className="mt-[10px] lg:flex lg:items-center lg:justify-between">
                        <p className="text-[14px] font-semibold text-white leading-[26px] md:text-[16px] md:w-[461px]">
                            A hauntingly beautiful NFT series where glitchy, transparent pixels form eerie digital ghosts and lost memories.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="w-[198px] mt-[10px] px-[10px] flex items-center justify-start gap-[12.17px] bg-white rounded-[8px] py-[8px] lg:py-[12px] lg:px-[10px] focus:outline-none focus:ring-2 focus:ring-gray-600"
                            aria-label="View NFT Collections"
                        >
                            <p className="text-[14px] text-[#1E1E1EE5] font-bold">View NFT Collections</p>
                            <ArrowRight color="#1E1E1EE5" size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NFTCategory;
