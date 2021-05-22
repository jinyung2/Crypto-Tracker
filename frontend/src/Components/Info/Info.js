import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Info.css';

function getData(coin, setData) {
    axios.get("http://localhost:5000/coin/" + coin).then((res) => {
        setData({
            'coin': res.data.name,
            'marketCap': parseFloat(res.data.marketCapUsd).toFixed(2),
            'percentChange': parseFloat(res.data.changePercent24Hr).toFixed(2),
            'price': parseFloat(res.data.priceUsd).toFixed(2),
            'supply': parseFloat(res.data.supply).toFixed(2)
        })
    })
}

export default function Info(props) {

    const [data, setData] = useState({});

    useEffect(() => {
        getData(props.coin, setData);
    }, [props.coin])

    return (
        <div className="info-section">
            
            <h1>{data['coin']} Stats</h1>
            <ul>
                <li>Price: ${data['price']}</li>
                <li>24Hr Percent Change: {data['percentChange']}%</li>
                <li>Market Cap: ${data['marketCap']}</li>
                <li>Supply: ${data['supply']}</li>
            </ul>

        </div>
    )
}