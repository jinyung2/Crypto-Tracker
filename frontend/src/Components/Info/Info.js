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
        <div className="root">
            
            <h1>{data['coin']} Stats</h1>
            <ul>
                <li>
                    <div className="category"><b>Price:</b></div>
                    <div className="value">${data['price']}</div>
                </li>
                <li>
                    <div className="category"><b>24Hr Percent Change:</b></div>
                    <div className="value">{data['percentChange']}%</div>
                </li>
                <li>
                    <div className="category"><b>Market Cap:</b></div>
                    <div className="value">${data['marketCap']}</div>
                </li>
                <li>
                    <div className="category"><b>Supply:</b></div>
                    <div className="value">${data['supply']}</div>
                </li>
            </ul>

        </div>
    )
}