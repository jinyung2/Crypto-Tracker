import { userApi } from './';

export const user = {
    getCoin: (coin) => userApi.get(`/coin/${coin}`),
    getWatchlist: () => userApi.get(`/watchlist`),
    addToWatchlist: (coinData) => userApi.post(`/watchlist/${coinData}`),

}
