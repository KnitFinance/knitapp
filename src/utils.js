import * as contractAbi from './abi'
const contract = require('@truffle/contract')

const list = [
    {
        name: 'Stellar',
        knitName: 'K-XLM',
        symbol: 'XLM'
    },
    {
        name: 'Ripple',
        knitName: 'K-XRP',
        symbol: 'XRP'
    },
    {
        name: 'Litecoin',
        knitName: 'K-LTC',
        symbol: 'LTC'
    },
    {
        name: 'Bitcoin',
        knitName: 'K-BTC',
        symbol: 'BTC'
    },
    {
        name: 'Bitcoin Cash',
        knitName: 'K-BCH',
        symbol: 'BCH'
    },
    {
        name: 'Zcash',
        knitName: 'K-ZEC',
        symbol: 'ZEC'
    },
    {
        name: 'Dogecoin',
        knitName: 'K-DOGE',
        symbol: 'DOGE'
    },
    {
        name: 'Dash',
        knitName: 'K-DASH',
        symbol: 'DASH'
    },
    {
        name: 'Bitcoin SV',
        knitName: 'K-BSV',
        symbol: 'BSV'
    },
    {
        name: 'Ethereum',
        knitName: 'K-ETH',
        symbol: 'ETH'
    }
]

export const options = list.map(values => ({
    key: values.symbol,
    text: values.name,
    value: values.symbol
}))

export const optionsWithdraw = list.map(values => ({
    key: values.symbol,
    text: values.knitName,
    value: values.symbol
}))

export const isMetamask = () => {
    if (typeof window.ethereum !== 'undefined') {
        return true
    }
    return false
}

export const getTokanBalance = async (coin, walletAddress) => {
    const contractInstance = contract(contractAbi[coin])
    const web3 = window?.web3
    let result = 0
    contractInstance.setProvider(web3?.currentProvider)
    try {
        const tokenInstant = await contractInstance.deployed()
        let balance = await tokenInstant.balanceOf(walletAddress)
        result = balance / 10 ** 18
    } catch (e) {}
    return result
}
