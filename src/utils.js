import * as contractAbi from './abi'
const contract = require('@truffle/contract')

const list = [
    {
        name: 'Bitcoin',
        knitName: 'K-BTC',
        symbol: 'BTC',
    },
    {
        name: 'Bitcoin Cash',
        knitName: 'K-BCH',
        symbol: 'BCH',
    },
    {
        name: 'Bitcoin SV',
        knitName: 'K-BSV',
        symbol: 'BSV',
    },
    {
        name: 'Dash',
        knitName: 'K-DASH',
        symbol: 'DASH',
    },
    {
        name: 'Dogecoin',
        knitName: 'K-DOGE',
        symbol: 'DOGE',
    },
    {
        name: 'Ethereum',
        knitName: 'K-ETH',
        symbol: 'ETH',
    },
    {
        name: 'Frontier',
        knitName: 'K-FRONT',
        symbol: 'FRONT',
    },
    {
        name: 'Litecoin',
        knitName: 'K-LTC',
        symbol: 'LTC',
    },
    {
        name: 'Ripple',
        knitName: 'K-XRP',
        symbol: 'XRP',
    },
    {
        name: 'Sia Coin',
        knitName: 'K-SC',
        symbol: 'SC',
    },
    {
        name: 'Stellar',
        knitName: 'K-XLM',
        symbol: 'XLM',
    },
    {
        name: 'Tomo',
        knitName: 'K-TOMO',
        symbol: 'TOMO',
    },
    {
        name: 'Zcash',
        knitName: 'K-ZEC',
        symbol: 'ZEC',
    },
]

export const networkNames = networkId => {
    let networkName = 'Other'
    switch (parseInt(networkId)) {
        // case 1:
        //     networkName = 'Main'
        //     break
        // case 2:
        //     networkName = 'Morden'
        //     break
        // case 3:
        //     networkName = 'Ropsten'
        //     break
        // case 4:
        //     networkName = 'Rinkeby'
        //     break
        case 42:
            networkName = 'Kovan'
            break
        case 97:
            networkName = 'Binance Smart Chain (Testnet)'
            break
        // case 56:
        //     networkName = 'Binance Smart Chain'
        //     break
        case 80001:
            networkName = 'Matic (Testnet)'
            break
        // case 137:
        //     networkName = 'Matic'
        //     break
        default:
            networkName = 'Unsupported'
    }
    return networkName
}

export const contractNetwork = networkId => {
    let network = false

    switch (parseInt(networkId)) {
        case 42:
            network = 'ETH'
            break
        case 97:
            network = 'BSC'
            break
        case 80001:
            network = 'MATIC'
            break
        default:
            network = false
    }
    return network
}

export const options = list.map(values => ({
    key: values.symbol,
    text: values.name,
    value: values.symbol,
}))

export const optionsWithdraw = list.map(values => ({
    key: values.symbol,
    text: values.knitName,
    value: values.symbol,
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

export const truncate = (str, max, sep) => {
    max = max || 6

    var len = str.length
    if (len > max) {
        sep = sep || '...'
        var seplen = sep.length
        if (seplen > max) {
            return str.substr(len - max)
        }
        var n = -0.5 * (max - len - seplen)
        var center = len / 2

        var front = str.substr(0, center - n)
        var back = str.substr(len - center + n)
        return front + sep + back
    }

    return str
}
