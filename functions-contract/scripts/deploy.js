async function main() {
  const contractName = 'FunctionFrontend';
  
  // Deploying the contract
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log(`${contractName} deployed to: ${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
