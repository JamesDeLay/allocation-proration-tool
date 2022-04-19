import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { GlobalStore } from "../../context/GlobalStore";

function ResultWidget() {
  const ctx = useContext(GlobalStore);

  return (
    <div>
      <Grid container spacing={2}>
        {
          ctx.calculatedBreakdown?.map((investor, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={6}>{investor.name}</Grid>
              <Grid item xs={6}>{investor.allocation}</Grid>
            </React.Fragment>
          ))
        }
      </Grid>
    </div>
  );
}

export default ResultWidget;
