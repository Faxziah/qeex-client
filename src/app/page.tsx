import Banner from "@/app/components/Banner";
import Features from "@/app/components/Features";
import ContractsType from "@/app/components/ContractsType";
import FAQ from "@/app/components/FAQ";

export default function Home() {
  return (
    <div className={'container'}>
      <Banner/>
      <Features/>
      <ContractsType/>
      <FAQ/>
    </div>
  );
}
