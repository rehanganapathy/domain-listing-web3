// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  const deployer = await ethers.getSigner();
  const name = "ETHDaddy";
  const symbol = "ETHD";

  const ETHDaddy = await ethers.getContractFactory('ETHDaddy');
  const ethdaddy = await ETHDaddy.deploy(name, symbol);

  await ethdaddy.deployed();

  console.log("ETHDaddy deployed to:", ethdaddy.address);

  const names = ["blue.eth", "lewis.eth", "jupiter.eth", "mag.eth", "maverick.eth", "saul.eth"]
  const costs = [tokens(10), tokens(25), tokens(15), tokens(2.5), tokens(30), tokens(0.9)]

  for (var i = 0; i < 6; i++) {
    const transaction = await ethdaddy.connect(deployer).list(names[i], costs[i])
    await transaction.wait()

    console.log(`Listed Domain ${i + 1}: ${names[i]}`)
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
