import { Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useContext } from "react"
import { GlobalStore } from "../../context/GlobalStore"
import {Delete} from '@mui/icons-material';

const InputRow = ({uuid, isFirstRow}) => {
    const ctx = useContext(GlobalStore);
    const investor = ctx.investorBreakdown[uuid];
    
    const updateInvestorInformation = (key, value) => {
        const payload = {
            uuid: investor.uuid,
            key,
            value
        }
        ctx.dispatchInvestorBreakdown({
            action: ctx.UPDATE_INVESTOR,
            payload,
        })
    }

    const doDeleteRow = (uuid) => {
        ctx.dispatchInvestorBreakdown({
            action: ctx.DELETE_INVESTOR,
            payload: {
                uuid
            }
        })
    }

    useEffect(() => {console.log(investor, uuid)}, [])

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={3}>
                <TextField 
                label="Name" 
                onChange={(e) => updateInvestorInformation("name", e.target.value)} 
                variant="outlined" 
                type="text"
                // value={investor.name}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                label="Requested Amount"
                onChange={(e) => updateInvestorInformation("requested", e.target.value)} 
                variant="outlined" 
                type="number" 
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                label="Average"  
                variant="outlined"
                onChange={(e) => updateInvestorInformation("average", e.target.value)} 
                type="number" 
                />
            </Grid>
            {
                !isFirstRow && (
                    <Grid item xs={1}>
                        <Button variant="contained" size="small" onClick={() => doDeleteRow(uuid)}>
                            <Delete />
                        </Button>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default InputRow;