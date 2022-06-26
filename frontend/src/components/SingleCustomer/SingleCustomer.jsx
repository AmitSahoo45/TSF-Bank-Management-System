import React from 'react'
import { Card, Avatar, Text, Grid, Button } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'
import './SingleCustomer.css'

const SingleCustomer = ({ customer }) => {
    const Navigate = useNavigate();

    return (
        <Card variant="bordered" isHoverable
            className='Card'
        >
            <Card.Header>
                <Avatar
                    alt={customer.Fullname}
                    text={customer.Fullname}
                    src={customer.imageLink}
                    width="34px"
                    height="34px"
                />
                <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                            {customer.Fullname}
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Text css={{ color: "$accents8" }}>
                            {customer.email}
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Divider />
            <Card.Body
                css={{ alignItems: 'flex-start' }}
            >
                <Text css={{ color: '$accents7', lineHeight: "$md" }}>
                    {customer.city}, {customer.state}
                </Text>
                <Text>AccountID - {customer.AccountID}</Text>
                <Text
                    h3
                    css={{ color: (customer.currentBalance > 1000) ? '$success' : '$danger' }}
                >Current Balance - {customer.currentBalance}</Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Button shadow color="secondary" auto ghost
                    css={{ width: '100%' }}
                    onClick={() => Navigate(`/api/user/${customer._id}`)}
                >
                    View User
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default SingleCustomer