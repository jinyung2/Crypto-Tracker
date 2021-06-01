import { userApi } from './';

export const user = {
    getWatchlist: (coin) => userApi.get("coin")
}
