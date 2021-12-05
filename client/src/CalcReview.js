import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const CalcReview = ({calcResponse}) => {
    const { customer, itemTotals, subTotal, totalTax, total } = calcResponse;
    const { id, name, postal_code, city, state, country } = customer;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Customer Details
            </Typography>
            <Typography gutterBottom>
                {`${customer.name} - ${postal_code}, ${city}, ${state}, ${country}`}
            </Typography>
            <Typography variant="h6" >
                Order summary
            </Typography>
            <List>
                {
                    itemTotals.length > 0 &&
                    itemTotals.map((itemTotal) => {
                        const { id, total, name, price, quantity} = itemTotal;
                        const respItemKey = `item-${id}-total`;
                        
                        return (
                            <ListItem key={respItemKey} sx={{ py: -1, px: 0 }}>
                                <ListItemText primary={`${name} x ${quantity}`} secondary={`Item ${id} - $${price}`} />
                                <Typography variant="body2">{`$${total.toFixed(2)}`}</Typography>
                            </ListItem>
                        )
                    })
                }
            </List>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    
                </Grid>
                <Grid item alignContent="right" xs={12}  sm={6}>
                    <List>
                        <ListItem>
                            <ListItemText primary="Sub-total" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {`$${subTotal.toFixed(2)}`}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Tax" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {`$${totalTax.toFixed(2)}`}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Total" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {`$${total.toFixed(2)}`}
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default CalcReview;