
import NFTCollectionsTable from "@/components/Collections";


import TrendingGaming from "@/components/TrendingGaming";

import Hero from "@/components/Hero";
import NFTCategory from "@/components/nft-category";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1216]">
      <main className="md:space-y-[100px]">
        <Hero />

        <NFTCollectionsTable/>

        <NFTCategory />
        <TrendingGaming/>

        <Newsletter />
      </main>
    </div>
  );
}
