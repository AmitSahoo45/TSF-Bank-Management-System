import React, { useState, useContext } from 'react'
import { SingleCustomer } from '../../components'
import './Customer.css'

import { BankingStore } from '../../Context/Context'
import axios from 'axios'
import { Grid, Loading } from '@nextui-org/react';

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const { setAllUserData } = useContext(BankingStore);
    async function fetchData() {
        const { data: { users } } = await axios.get('/api/user/all');
        setCustomers(users);
        setAllUserData(users);
    }
    fetchData();

    return (
        <>
            {
                customers ? (
                    <Grid.Container gap={2} justify="center">
                        {
                            customers.map(customer => (
                                <Grid xs={6} sm={6} md={6} key={customer._id}>
                                    <SingleCustomer customer={customer} />
                                </Grid>
                            ))
                        }
                    </Grid.Container>
                ) : (
                    <Loading type="points" />
                )
            }
        </>
    )
}

export default Customer