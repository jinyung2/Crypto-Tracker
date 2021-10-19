import { userApi } from './';

export const user = {
    getCoin: (coin) => userApi.get(`/coin/${coin}`),
    getCoinInter: (coin, inter) => userApi.get(`/coin/${coin}/${inter}`),
    getWatchlist: () => userApi.get(`/watchlist`),
    addToWatchlist: (coinData) => userApi.post(`/watchlist/${coinData}`),
    updateWatchlist: (newWatchlist) => userApi.put(`/watchlist`, {watchlist: newWatchlist}),
    removeFromWatchlist: (coin) => userApi.delete(`/watchlist/${coin}`)
}
