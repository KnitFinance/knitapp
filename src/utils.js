const list = [
    {
        name: 'Ethereum',
        knitName: 'K-ETH',
        symbol: 'ETH'
    },
    {
        name: 'Bitcoin',
        knitName: 'K-BTC',
        symbol: 'BTC'
    },
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
