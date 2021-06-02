import axios from 'axios';

// import statement for unit test
import { user } from '../Api/User';

jest.mock('../Api/User', () => ({
    user: {
        getWatchlist: jest.fn(),
        addToWatchlist: jest.fn()
    }
}))

describe('getWatchlist', () => {
  it('should successfully fetch watchlist for a user', async () => {
    const mockWatchlist = ['dogecoin', 'bitcoin', 'sushi'];

    user.getWatchlist.mockResolvedValueOnce(mockWatchlist);

    await expect(user.getWatchlist()).resolves.toEqual(
      mockWatchlist
    );
  });

  it('should fail to fetch watchlist', async () => {
    const error = 'Failed to GET Watchlist!';

    user.getWatchlist.mockRejectedValueOnce(new Error(error));

    await expect(user.getWatchlist()).rejects.toThrow(error);
  });
});

describe('addToWatchlist', () => {
    it('should successfully add to watchlist', async () => {
    const mockWatchlist = ['dogecoin', 'bitcoin', 'sushi'];

    const coin = 'test';

    user.addToWatchlist.mockImplementationOnce(() => Promise.resolve([...mockWatchlist, coin]));

    await expect(user.addToWatchlist(coin)).resolves.toEqual([...mockWatchlist, coin]);
    });

    it('should fail to add to watchlist', async () => {
    user.addToWatchlist.mockRejectedValueOnce(new Error());
    const coin = 'test';
    await expect(user.addToWatchlist(coin)).rejects.toThrow();
    });
})

describe('updateWatchlist', () => {
    
})