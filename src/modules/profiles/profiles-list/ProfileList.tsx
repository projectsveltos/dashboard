import { TierCard } from "@/modules/profiles/profiles-list/components/tier/TierCard";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { mockProfileListRespArray } from "@/modules/profiles/profiles-list/mock";

export function ProfileList() {
  return (
    <>
      <Header />
      <div className="flex-grow flex flex-col">
        <div className="container px-4 md:px-8 flex-grow flex flex-col">
          <div
            className={
              "p-4 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4"
            }
          >
            {mockProfileListRespArray.map((tier, index) => (
              <TierCard tier={tier} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="container px-4 md:px-8">
        <Footer />
      </div>
    </>
  );
}
