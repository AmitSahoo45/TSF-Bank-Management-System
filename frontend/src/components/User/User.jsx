import { Card, Input, Loading, Text } from '@nextui-org/react';
import axios from 'axios';
import './User.css';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Avatar } from '@nextui-org/react';
import { BankingStore } from '../../Context/Context';

const User = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const { AllUserData } = useContext(BankingStore);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setinputValue] = useState(0);
    const [selectedValue, setselectedValue] = useState('');

    const getUserData = async () => {
        setLoading(true);
        const { data: { user } } = await axios.get(`/api/user/${id}`);
        setUser(user);
        setLoading(false);
    }

    useEffect(() => {
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const onChangeHandler = (e) => {
        setselectedValue(e.target.value);
    }

    const TransferMoney = async (e) => {
        e.preventDefault();
        console.log(selectedValue);
        if (selectedValue === '' || inputValue === 0) {
            alert('Required Credentials are not filled');
            return;
        } else if (selectedValue === id) {
            alert('You can not transfer money to yourself');
            return;
        }

        const { data: { success } } = await axios.patch(`/api/user/transfer/${selectedValue}`, { sender: id, amount: inputValue })
        console.log(success);
        if (success) {
            alert('Money Transferred Successfully');
            Navigate('/');

        } else {
            alert('Something went wrong');
        }
    }

    return (
        <div className="User">
            {
                user ? (
                    <div className='user__box'>
                        <div className="user__details">
                            <Card.Header>
                                <Avatar
                                    css={{ size: "$20", marginRight: "1rem" }}
                                    text={user.Fullname}
                                    src={user.imageLink}
                                />
                                <div>
                                    <Text h2 weight="bold">{user.Fullname}</Text>
                                    <Text h5 css={{ color: "$accents5", letterSpacing: '2px' }}>{user.email}</Text>
                                </div>
                            </Card.Header>
                            <Card.Divider />
                            <Card.Body
                                css={{ alignItems: 'flex-start' }}
                            >
                                <Text css={{ color: '$accents4', lineHeight: "$md" }}>
                                    {user.city}, {user.state}
                                </Text>
                                <Text h4>AccountID - {user.AccountID}</Text>
                                <Text
                                    h3
                                    css={{ color: '$gray300' }}
                                >Current Balance - {user.currentBalance}</Text>
                            </Card.Body>
                            <Card.Divider />
                        </div>
                        <div className="sending__money">
                            <Text h3 weight="bold">Transfer Money</Text> <br />
                            <Input aria-label='Input' placeholder="Enter Amount" size="md"
                                onChange={(e) => setinputValue(e.target.value)}
                            />
                            <Text h5>Choose User</Text>
                            <div className="radio__box__container">
                                {
                                    AllUserData.map((user, index) => {
                                        return (
                                            <div>
                                                <input type="radio" name='user' value={user._id} onChange={onChangeHandler} /> {user.Fullname}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <button
                            onClick={TransferMoney}
                            class="cssbuttons-io-button"> Transfer
                            <div class="icon">
                                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                            </div>
                        </button>
                    </div>
                ) : (
                    <Loading type="points" />
                )
            }
        </div>
    )
}

export default User