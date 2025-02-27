"use client";

import { useState } from "react";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface WalletOption {
  name: string;
  icon: string;
}

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

const walletOptions: WalletOption[] = [
  {
    name: "Argent",
    icon: "/icons/Argent.svg",
  },
  {
    name: "Metamask",
    icon: "/icons/Metamask.svg",
  },
  {
    name: "Braavos",
    icon: "/icons/Braavos.svg",
  },
];

export default function WalletModal({
  isOpen,
  onClose,
  onClick,
}: WalletModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-50"
          />

          <motion.div
            initial={isMobile ? { y: "100%" } : { opacity: 0, y: -20 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0 }}
            exit={isMobile ? { y: "100%" } : { opacity: 0, y: -20 }}
            transition={
              isMobile
                ? { type: "spring", damping: 20 }
                : { type: "spring", stiffness: 300, damping: 25 }
            }
            onClick={(e) => e.stopPropagation()}
            className={`
              fixed z-50 bg-[#1a1727] border border-white/10
              ${
                isMobile
                  ? "bottom-0 left-0 right-0 rounded-t-2xl p-6"
                  : "top-1/4 left-1/4 lg:left-1/3 xl:left-[40%] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-8 w-[400px]"
              }
            `}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Connect Wallet
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </motion.button>
            </div>

            <div className="space-y-4">
              {walletOptions.map((wallet) => (
                <motion.button
                  key={wallet.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={onClick}
                >
                  <Image
                    src={wallet.icon || "/placeholder.svg"}
                    alt={`${wallet.name} icon`}
                    className=""
                    width={50}
                    height={50}
                  />
                  <span className="text-white font-medium">{wallet.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
