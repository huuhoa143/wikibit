const ethers =  require('ethers')
const randomMnemonic = ethers.Wallet.createRandom().mnemonic;
const wallet = ethers.Wallet.fromMnemonic(randomMnemonic.phrase);

console.log({wallet: wallet.address})
