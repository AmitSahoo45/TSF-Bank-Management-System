import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import { Card, PileOfCoins } from '../../assets'

const HomePage = () => {
    const Navigate = useNavigate();

    const onClick = () => {
        Navigate('/api/user/all');
    }
    return (
        <div class="homepage">
            <div className="landing__page">
                <div className="leftside">
                    <div className="image__container floating">
                        <img src={Card} alt="Card" className='cardImage' />
                    </div>
                    <h2>
                        <span>The </span>
                        <span>Sparks </span>
                        <span>Foundation</span>
                    </h2>
                </div>
                <div className="rightside">
                    <div className="imageBox">
                        <img src={PileOfCoins} alt="Pile Of Coins" />
                    </div>
                </div>
            </div>
            <button
                onClick={onClick}
                className="button"
            >
                <span>Show All Customers</span>
                <div class="line"></div>
                <div class="line-2"></div>
                <div class="speak"></div>
                <div class="speak one"></div>
                <div class="speak two"></div>
                <div class="speak three"></div>
            </button>
        </div>
    )
}

export default HomePage