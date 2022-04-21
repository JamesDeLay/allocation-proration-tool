import { Alert, Container, Grid } from "@mui/material";
import { useContext } from "react";
import InputWidget from "../components/InputWidget";
import ResultWidget from "../components/ResultsWidget";
import { GlobalStore } from "../context/GlobalStore";

export default function Wrapper() {
    const ctx = useContext(GlobalStore);

    return (
        <Container maxWidth="xl" style={{ marginTop: `1rem` }}>
            <Grid item xs={12} style={{ minHeight: `50px` }}>
                {
                    ctx.apiError && (
                        <Alert severity="error">An API error has occured...</Alert>
                    )
                }
                {
                    ctx.apiSuccess && (

                        <Alert severity="success">Successfully calculated investor breakdown</Alert>
                    )
                }
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <h1>Proration Calculator Tool</h1>
                </Grid>
                <Grid item xs={10}>
                    <InputWidget />
                </Grid>
                <Grid item xs={2}>
                    <ResultWidget />
                </Grid>
            </Grid>
        </Container>
    )
}