import {Grid, TextField, Button} from "@mui/material";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalStore } from "../../context/GlobalStore";
import InputRow from "../InputRow";

function InputWidget() {
    const ctx = useContext(GlobalStore);

    const [numberOfRows, setNumberOfRows] = useState(0);

    useEffect(() => {
        console.log(ctx)
    }, [ctx])

    const doAddRow = () => {
        ctx.dispatchInvestorBreakdown({
            action: ctx.ADD_INVESTOR
        })
    }

    useEffect(() => {
        // doAddRow()
    }, [])

  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h3>Total Available Allocation</h3>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Allocation" variant="outlined" type="number" onChange={e => ctx.setTotalAllocation(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
                <h3>Investor Breakdown</h3>
            </Grid>
            {
                Object.keys(ctx.investorBreakdown || {}).map((uuid, idx) => <InputRow isFirstRow={idx === 0} key={uuid} uuid={uuid} />) || <></>
            }
            <Grid item xs={12}>
                <Button variant="contained" onClick={() => doAddRow()}>Add Investor</Button>
            </Grid>
        </Grid>
    </div>
  );
}

export default InputWidget;
