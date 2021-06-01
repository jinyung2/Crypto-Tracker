import requests as r


class Crypto:

    def __init__(self, base_url='http://api.coincap.io/v2/assets'):
        self.base_url = base_url

    def get_all_coin(self):

        response = r.get(self.base_url)
        data = response.json()

        return data

    def get_history(self, id, interval):
        """
        id: the coin id
        interval: m1,m5,m15,m30,h1,h2,h6,h12,d1

        """
        response = r.get(self.base_url + f'/{id}/history?interval={interval}')
        data = response.json()

        return data
