import { useState, useEffect } from "react";
import { useContract,useAddress } from "@thirdweb-dev/react";
import ClaimToken from "./components/Claim";
import PresaleABI from "./contracts/PresaleContract.json";
import TokenABI from "./contracts/TokenContract.json";
import Footer from "./components/Footer";
import Header from "./components/header/Header"
import SmoothSlider from "./components/smooth-slider/SmoothSlider";
import { loadPresaleData,loadTokenHolding,loadPresaleInfo } from "./helpers/web3helper";

function App() {

  const { contract: PresaleContract, isLoading: PresaleContractLoading } =
    useContract("0x0E527872d7aF137114f39A0170B9D77eF3c6dc32", PresaleABI);
  const { contract: TokenContract, isLoading: TokenContractLoading } =
    useContract("0x4e1C1BD35397042319Fe252d2e324ad439B19f1e", TokenABI);
  const address = useAddress();
  const [UserBalanceInfo, setUserBalanceInfo] = useState({});
  const [PresaleInfo, setPresaleInfo] = useState({});
  const [tokenHolding,setTokenHolding] = useState(0);

  useEffect(() => {
    if ( (!PresaleContractLoading) && (address)){
      loadPresaleData(address,PresaleContract, setUserBalanceInfo);
      loadPresaleInfo(PresaleContract,setPresaleInfo);   
    }
    
    if((!TokenContractLoading) && (address)){
      loadTokenHolding(address,TokenContract,setTokenHolding);
    }
  
}, [PresaleContractLoading,address]);

  console.log("User Balance Info = ", UserBalanceInfo);
  console.log("User Token holding  = ",parseInt(tokenHolding)/10**18)
  return (
    <div style={{backgroundColor:"black", height: 'auto', overflowX: 'hidden', display: "flex", flexDirection: 'column'}}>
      <Header></Header>
      <ClaimToken tokenHolding={tokenHolding} contract={PresaleContract} isContractLoading={PresaleContractLoading} UserBalanceInfo={UserBalanceInfo} presaleInfo={PresaleInfo}></ClaimToken>
      <SmoothSlider></SmoothSlider>
    </div>
  );
}

export default App;
