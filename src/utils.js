import { contracts } from './config'
const abi = require('./abi/abi.json')
const contract = require('@truffle/contract')

const list = [
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
        name: 'Bitcoin SV',
        knitName: 'K-BSV',
        symbol: 'BSV'
    },
    {
        name: 'Dash',
        knitName: 'K-DASH',
        symbol: 'DASH'
    },
    {
        name: 'Dogecoin',
        knitName: 'K-DOGE',
        symbol: 'DOGE'
    },
    {
        name: 'Ethereum',
        knitName: 'K-ETH',
        symbol: 'ETH'
    },
    {
        name: 'Frontier',
        knitName: 'K-FRONT',
        symbol: 'FRONT'
    },
    {
        name: 'Litecoin',
        knitName: 'K-LTC',
        symbol: 'LTC'
    },
    {
        name: 'Ripple',
        knitName: 'K-XRP',
        symbol: 'XRP'
    },
    {
        name: 'Sia Coin',
        knitName: 'K-SC',
        symbol: 'SC'
    },
    {
        name: 'Stellar',
        knitName: 'K-XLM',
        symbol: 'XLM'
    },
    {
        name: 'Tomo',
        knitName: 'K-TOMO',
        symbol: 'TOMO'
    },
    {
        name: 'Zcash',
        knitName: 'K-ZEC',
        symbol: 'ZEC'
    },
    {
        name: 'Groestlcoin',
        knitName: 'K-GRS',
        symbol: 'GRS'
    },
    {
        name: 'Zilliqa',
        knitName: 'K-ZIL',
        symbol: 'ZIL'
    },
    {
        name: 'Gemini dollar',
        knitName: 'K-GUSD',
        symbol: 'GUSD'
    },
    {
        name: 'Orgin',
        knitName: 'K-OGN',
        symbol: 'OGN'
    },
    {
        name: 'CELO',
        knitName: 'K-CELO',
        symbol: 'CELO'
    },
    {
        name: 'Stacks',
        knitName: 'K-STX',
        symbol: 'STX'
    },
    {
        name: 'Algorand',
        knitName: 'K-ALGO',
        symbol: 'ALGO'
    },
    {
        name: 'KyberNetwork',
        knitName: 'K-KNC',
        symbol: 'KNC'
    },
    {
        name: 'GoChain',
        knitName: 'K-GO',
        symbol: 'GO'
    },
    {
        name: 'Pangolin',
        knitName: 'K-AVAX',
        symbol: 'AVAX'
    },
    {
        name: 'Harmony',
        knitName: 'K-ONE',
        symbol: 'ONE'
    },
    {
        name: 'Fantom',
        knitName: 'K-FTM',
        symbol: 'FTM'
    }
]

export const allChain = () => {
    return ['Ethereum', 'BSC', 'Matic', 'Moonbeam', 'Fantom']
}
export const chainNames = networkId => {
    let networkName = ''
    switch (parseInt(networkId)) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 42:
            networkName = 'Ethereum'
            break
        case 97:
        case 56:
            networkName = 'BSC'
            break
        case 80001:
        case 137:
            networkName = 'Matic'
            break
        case 1287:
        case 1281:
            networkName = 'Moonbeam'
            break
        case 250:
        case 4002:
            networkName = 'Fantom'
            break
        default:
            networkName = ''
    }
    return networkName
}

export const networkNames = networkId => {
    let networkName = 'connect network'
    let networkStatus = false
    switch (parseInt(networkId)) {
        case 1:
        case 2:
        case 3:
        case 4:
            networkName = 'connect Kovan'
            break
        case 42:
            networkName = 'Kovan'
            networkStatus = true
            break
        case 97:
            networkName = 'Testnet'
            networkStatus = true
            break
        case 56:
            networkName = 'connect testnet'
            break
        case 80001:
            networkName = 'Testnet'
            networkStatus = true
            break
        case 137:
            networkName = 'connect testnet'
            break
        case 1281:
            networkName = 'connect testnet'
            break
        case 250:
            networkName = 'connect testnet'
            break
        default:
            networkName = 'connect network'
    }
    return { networkName, networkStatus }
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
        case 1287:
            network = 'MOONBEAM'
            break
        case 4002:
            network = 'FANTOM'
            break
        default:
            network = false
    }
    return network
}

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

export const getTokenBalance = async (coin, walletAddress, network) => {
    const contractInstance = contract({
        abi: abi
    })
    const web3 = window?.web3
    let result = 0
    if (typeof web3 !== 'undefined') {
        contractInstance.setProvider(web3?.currentProvider)
        try {
            const tokenInstant = await contractInstance.at(
                contracts[coin][network]
            )
            let balance = await tokenInstant.balanceOf(walletAddress)
            result = balance / 10 ** 18
        } catch (e) {
            console.log(e)
        }
    }

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
