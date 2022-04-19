import { Button, Grid, TextField } from "@mui/material"
import React from "react";
import { useContext } from "react"
import { GlobalStore } from "../../context/GlobalStore"
import { Delete } from '@mui/icons-material';

const InputRow = ({ uuid, isFirstRow }) => {
    const ctx = useContext(GlobalStore);

    const updateInvestorInformation = (key, value) => {
        const payload = {
            uuid,
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

    return (
        <React.Fragment>
            <Grid item xs={3}>
                <TextField
                    label="Name"
                    onChange={(e) => updateInvestorInformation("name", e.target.value)}
                    variant="outlined"
                    type="text"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    label="Requested Amount"
                    onChange={(e) => updateInvestorInformation("requested", e.target.value)}
                    variant="outlined"
                    type="number"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    label="Average"
                    variant="outlined"
                    onChange={(e) => updateInvestorInformation("average", e.target.value)}
                    type="number"
                />
            </Grid>

            <Grid item xs={3}>
                {
                    !isFirstRow && (
                        <Button variant="contained" size="small" onClick={() => doDeleteRow(uuid)}>
                            <Delete />
                        </Button>
                    )}
            </Grid>
        </React.Fragment>
    )
}

export default InputRow;