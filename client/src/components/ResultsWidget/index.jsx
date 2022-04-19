import { Grid } from "@mui/material";
import { useContext } from "react";
import { GlobalStore } from "../../context/GlobalStore";

function ResultWidget() {
  const ctx = useContext(GlobalStore);

  return (
    <div>
        <Grid container spacing={2}>
            {
              ctx.calculatedBreakdown?.map(investor => (
                <>
                  <Grid item xs={6}>{investor.name}</Grid>
                  <Grid item xs={6}>{investor.allocation}</Grid>
                </>
              ))
            }
        </Grid>
    </div>
  );
}

export default ResultWidget;
