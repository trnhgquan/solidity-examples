const ENDPOINT_IDS = require('../constants/endpointIds.json')

const TYPE_ORACLE = 6

module.exports = async function (taskArgs, hre) {
    const dstChainId = ENDPOINT_IDS[taskArgs.targetNetwork]
    // get the local contract
    const omniCounter = await ethers.getContract("OmniCounter")
    console.log(`omniCounter.address: ${omniCounter.address}`)

    // set the config for this UA to use the specified Oracle
    let data = await omniCounter.getConfig(
        0, // unused
        dstChainId,
        omniCounter.address,
        TYPE_ORACLE
    )

    console.log(`✅ Oracle for src (${hre.network.name}) -> dst [${dstChainId}]: ${data.replace('000000000000000000000000','')}`)
}
