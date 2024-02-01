const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { keccak256 } = require("ethereum-cryptography/keccak")
const { toHex } = require("ethereum-cryptography/utils")

const initialAmount = 100

const generate = () => {
    const privateKey = secp256k1.utils.randomPrivateKey()
    const publicKey = secp256k1.getPublicKey(privateKey)
    const hash = keccak256(publicKey.slice(1))
    const address = toHex(hash.slice(hash.length - 20))

    console.log('privateKey: ', toHex(privateKey))
    console.log('publicKey: ', toHex(publicKey))
    console.log('address: ', address)
    console.log('initialAmount: ', initialAmount)

    return { privateKey, publicKey, address, initialAmount: initialAmount }
}

const accounts = [ generate(), generate(), generate() ]

module.exports = {
    accounts
}
