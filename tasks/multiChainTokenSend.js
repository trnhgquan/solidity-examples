const ENDPOINT_IDS = require('../constants/endpointIds.json')
const {getDeploymentAddresses} = require('../utils/readStatic')

module.exports = async function (taskArgs, hre) {
    let signers = await ethers.getSigners();
    let owner = signers[0];
    let tx;
    const dstChainId = ENDPOINT_IDS[taskArgs.targetNetwork]
    const qty = ethers.utils.parseEther(taskArgs.qty);

    const dstAddr = getDeploymentAddresses(taskArgs.targetNetwork)["MultiChainToken"]
    // get local contract instance
    const multiChainToken = await ethers.getContract("MultiChainToken")
    console.log(`[source] multiChainToken.address: ${multiChainToken.address}`)

    tx = await(await multiChainToken.approve(multiChainToken.address, qty)).wait()
    console.log(`approve tx: ${tx.transactionHash}`)

    tx = await (await multiChainToken.sendTokens(
        dstChainId,
        dstAddr,
        qty,
        {value: ethers.utils.parseEther('0.42')} // estimate/guess
    )).wait()
    console.log(`✅ Message Sent [${hre.network.name}] sendTokens() to MultiChainToken @ [${dstChainId}] token:[${dstAddr}]`)
    console.log(` tx: ${tx.transactionHash}`)

    console.log(`* check your address [${owner.address}] on the destination chain, in the ERC20 transaction tab !"`)


}
