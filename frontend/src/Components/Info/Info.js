import React, { useState, useEffect } from 'react';
import { user } from '../../Api/User';
import axios from 'axios';

import './Info.css';

function getData(coin, setData) {
    user.getCoin(coin)
    .then((res) => {
        setData({
            'maxSupply': (res.data.maxSupply === null ? 0 : parseInt(res.data.maxSupply)),
            'marketCap': parseFloat(res.data.marketCapUsd).toFixed(2),
            'percentChange': parseFloat(res.data.changePercent24Hr).toFixed(2),
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
        <div className="info-container">
            
            <ul>
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
                <li>
                    <div className="category"><b>Max Supply:</b></div>
                    <div className="value">{data['maxSupply']}</div>
                </li>
            </ul>

        </div>
    )
}