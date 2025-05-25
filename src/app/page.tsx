import Banner from "@/app/components/Banner";
import Features from "@/app/components/Features";
import ContractsType from "@/app/components/ContractsType";

export default function Home() {
  return (
    <div className={'container'}>
      <Banner/>
      <Features/>
      <ContractsType/>
    </div>
  );
}
