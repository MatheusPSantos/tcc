const { ethers } = require("hardhat");

async function main() {
  const Usuario = await ethers.getContractFactory('Usuario');
  const usuario = await Usuario.deploy();

  await usuario.deployed();
  // Endereço do contrato na blockchain
  console.log('Contrato Usuario deployed em ', usuario.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
