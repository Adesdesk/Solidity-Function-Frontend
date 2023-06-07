async function main() {
  const contractName = 'FunctionFrontend';

  // Deploying the contract
  const FunctionFrontend = await ethers.getContractFactory(contractName);
  const functionFrontend = await FunctionFrontend.deploy();
  await functionFrontend.deployed();

  console.log(`${contractName} deployed to: ${functionFrontend.address}`);

  console.log("Sleeping.....");
  // Wait for block explorer to notice that the contract has been deployed
  await sleep(10000);


  // Verify the Lottery contract after deploying
  await hre.run("verify:verify", {
    contract: "contracts/FunctionsForFrontend.sol:FunctionFrontend",
    address: functionFrontend.address,
    constructorArguments: [],
  });
  console.log("Verified FunctionFrontend ")

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
