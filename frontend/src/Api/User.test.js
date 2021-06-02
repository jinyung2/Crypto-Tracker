import { user } from '../Api/User';

jest.mock('../Api/User', () => ({
  user: {
    getWatchlist: jest.fn(),
    addToWatchlist: jest.fn(),
    updateWatchlist: jest.fn(),
    removeFromWatchlist: jest.fn(),
  },
}));

describe('getWatchlist', () => {
  it('should successfully fetch watchlist for a user', async () => {
    const mockWatchlist = ['dogecoin', 'bitcoin', 'sushi'];

    user.getWatchlist.mockResolvedValueOnce(mockWatchlist);

    await expect(user.getWatchlist()).resolves.toEqual(mockWatchlist);
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

    user.addToWatchlist.mockImplementationOnce(() =>
      Promise.resolve([...mockWatchlist, coin])
    );

    await expect(user.addToWatchlist(coin)).resolves.toEqual([
      ...mockWatchlist,
      coin,
    ]);
  });

  it('should fail to add to watchlist', async () => {
    user.addToWatchlist.mockRejectedValueOnce(new Error());
    const coin = 'test';
    await expect(user.addToWatchlist(coin)).rejects.toThrow();
  });
});

describe('updateWatchlist', () => {
  it('should successfully update the watchlist', async () => {
    const mockWatchlist = ['dogecoin', 'bitcoin', 'sushi'];
    const mockReordered = ['dogecoin', 'sushi', 'bitcoin'];

    user.updateWatchlist.mockImplementationOnce(() => Promise.resolve(mockReordered));
    await expect(user.updateWatchlist()).resolves.toEqual(mockReordered);
  });

  it('should fail to update the watchlist', async () => {
    const mockWatchlist = ['dogecoin', 'bitcoin', 'sushi'];
    const mockReordered = ['dogecoin', 'sushi', 'bitcoin'];

    user.updateWatchlist.mockImplementationOnce(() => Promise.reject(new Error()));
    await expect(user.updateWatchlist()).rejects.toThrow();
  });  
});

describe('removeFromWatchlist', () => {
    it('should successfully remove from watchlist', async () => {
        const mockWatchlist = ['dogecoin', 'bitcoin', 'sushi'];
        const coin = 'bitcoin';
        const mockRemoved = ['dogecoin', 'sushi'];
    
        user.removeFromWatchlist.mockImplementationOnce(() => Promise.resolve(mockRemoved));

        await expect(user.removeFromWatchlist(coin)).resolves.toEqual(mockRemoved);
    });

    it('should fail to remove from watchlist', async () => {
        const mockWatchlist = ['dogecoin', 'bitcoin', 'sushi'];
        const coin = 'bitcoin';
        const mockRemoved = ['dogecoin', 'sushi'];
    
        user.removeFromWatchlist.mockImplementationOnce(() => Promise.reject(new Error()));

        await expect(user.removeFromWatchlist(coin)).rejects.toThrow();
    });
})
