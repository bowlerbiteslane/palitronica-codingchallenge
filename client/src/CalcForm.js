import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CalcForm = ({custId, items, setCustId, setItems}) => {

    const updateItemQuantity = (itemId, value) => {
        const itemsToUpdate = [...items];
        itemsToUpdate.find(item => item.id === itemId).quantity = value;
        setItems([...itemsToUpdate]);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Customer ID:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="custId"
                        name="custId"
                        label="Customer ID"
                        fullWidth
                        variant="standard"
                        value={custId}
                        onChange={e => setCustId(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        {
                            items.map((item) => {
                                let inputItemKey = `item-${item.id}-quantity`;
                                return (
                                    <ListItem key={inputItemKey} sx={{ py: 2, px: 0 }}>
                                        <Grid item xs={6}>
                                            <ListItemText primary={`Item ${item.id}`} secondary={item.name}/>
                                            <Typography variant="body2">{item.price}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                id={inputItemKey}
                                                name={inputItemKey}
                                                label="Quantity"
                                                variant="standard"
                                                type="number"
                                                value={item.quantity}
                                                onChange={e => updateItemQuantity(item.id, e.target.value)}
                                            />
                                        </Grid>
                                    </ListItem>
                                    )
                                }
                            ) 
                        }
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default CalcForm;