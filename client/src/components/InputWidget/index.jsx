import { PlusOne } from "@mui/icons-material";
import { Grid, TextField, Button } from "@mui/material";
import { useContext } from "react";
import { GlobalStore } from "../../context/GlobalStore";
import InputRow from "../InputRow";

function InputWidget() {
    const ctx = useContext(GlobalStore);

    const doAddRow = () => {
        ctx.dispatchInvestorBreakdown({
            action: ctx.ADD_INVESTOR
        })
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h3>Total Available Allocation</h3>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Allocation" variant="outlined" type="number" onChange={e => ctx.setTotalAllocation(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <h3>Investor Breakdown</h3>
                </Grid>
                {
                    Object.keys(ctx.investorBreakdown || {}).map((uuid, idx) => <InputRow isFirstRow={idx === 0} key={uuid} uuid={uuid} />) || <></>
                }
                <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <Button
                            disabled={!ctx.validInput || ctx.totalAllocation === 0}
                            variant="contained"
                            onClick={() => ctx.doCalculateProration()}
                            color="secondary"
                            style={{ marginRight: '1rem' }}>Prorate</Button>
                        <Button
                            variant="contained"
                            onClick={() => doAddRow()}
                        >
                            <PlusOne />
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default InputWidget;
