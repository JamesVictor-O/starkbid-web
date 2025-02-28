import Image from "next/image";

const ethIcon = "/logo/ethereum-logo.svg";

interface TrendingCardProps {
  name: string;
  image: string;
  floorPrice: string;
  totalVolume: string;
}

const TrendingCard: React.FC<TrendingCardProps> = ({
  name,
  image,
  floorPrice,
  totalVolume,
}) => {
  return (
    <div className="flex-none w-[243px] md:w-[300px] hover:scale-[1.02] transition-all duration-300 ease-in-out ">
      <div className="bg-[#FFFFFF1A] w-[241px] h-[276px] md:w-[298px] md:h-[336px] cursor-grab active:cursor-grabbing rounded-xl overflow-hidden">
        <div className="w-full h-[65%] relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="p-[15px] h-[34.5%] ">
          <h3 className="text-white font-semibold text-sm md:text-lg mb-3">
            {name}
          </h3>
          <div className="flex items-center w-full gap-[41px]">
            <div>
              <p className="text-[#FFFFFF99] text-xs md:text-sm font-medium mb-[5px]">
                Floor Price
              </p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={ethIcon || "/placeholder.svg"}
                  alt="ethereum"
                  width={10.16}
                  height={10.16}
                />
                <p className="text-white text-xs md:text-sm font-medium">
                  {floorPrice}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[#FFFFFF99] text-xs md:text-sm font-medium mb-[5px] ">
                Total Volume
              </p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={ethIcon || "/placeholder.svg"}
                  alt="ethereum"
                  width={10.16}
                  height={10.16}
                />
                <p className="text-white text-xs md:text-sm font-medium">
                  {totalVolume}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
