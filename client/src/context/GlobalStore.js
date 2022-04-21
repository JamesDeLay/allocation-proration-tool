/* eslint-disable no-case-declarations */
import React, { createContext, useEffect, useReducer, useState } from 'react';
import uuid from 'react-uuid';
import API from '../api';

const ADD_INVESTOR = 'ADD_INVESTOR';
const UPDATE_INVESTOR = 'UPDATE_INVESTOR';
const DELETE_INVESTOR = 'DELETE_INVESTOR';

const doMakeUUID = () => uuid();

let firstUUID = doMakeUUID();
const initialState = {
    [firstUUID]: {
        uuid: firstUUID,
        name: '',
        requested: 0,
        average: 0
    }
};

const investorBreakdownReducer = (state, dispatch) => {
    const { action, payload } = dispatch;
    let clone = { ...state };
    switch (action) {
        case ADD_INVESTOR:
            const investorUUID = doMakeUUID();
            const template = {
                uuid: investorUUID,
                name: '',
                requested: 0,
                average: 0
            };
            clone[investorUUID] = { ...template };
            return clone;
        case DELETE_INVESTOR:
            try {
                delete clone[payload.uuid];
            } catch (err) {
                console.error(`Check UUID`, err);
            }
            return clone;
        case UPDATE_INVESTOR:
            const { uuid, key, value } = payload;
            clone[uuid][key] = value;
            return clone;
        default:
            return state;
    }
};

export const GlobalStore = createContext();

const GlobalStoreProvider = (props) => {

    const [totalAllocation, setTotalAllocation] = useState(0);
    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState("the API broke...");
    const [calculatedBreakdown, setCalculatedBreakdown] = useState([]);
    const [validInput, setValidInput] = useState(false)
    const [investorBreakdown, dispatchInvestorBreakdown] = useReducer(
        investorBreakdownReducer,
        initialState
    );

    const doFormatForAPI = (payload) => {
        const investor_amounts = payload.map(investor => ({ name: investor.name, requested_amount: investor.requested, average_amount: investor.average }))
        return {
            allocation_amount: totalAllocation,
            investor_amounts
        }
    };

    const doCalculateProration = async () => {
        const payload = doFormatForAPI(Object.values(investorBreakdown))
        try {
            let res = await API.runCalculation(payload)
            const body = await res.json()
            setCalculatedBreakdown(body.results)
            setApiSuccess(true)
            setTimeout(() => {
                setApiSuccess(false)
            }, 5000)
        } catch (error) {
            setApiError(true)
            setApiErrorMessage(error.message)
            setTimeout(() => {
                setApiError(false)
                setApiErrorMessage("")
            }, 5000)
        }
    };

    useEffect(() => {
        const uuids = Object.keys(investorBreakdown)
        const inputValues = uuids.map(uuid => {
            const investor = investorBreakdown[uuid]
            const { name, requested } = investor
            if (name && requested) return true
            else return false
        })
        let isValid = inputValues.reduce((res, cur) => res || cur, false)
        if (isValid) {
            setValidInput(true)
        } else {
            setValidInput(false)
        }

    }, [investorBreakdown])

    return (
        <GlobalStore.Provider
            value={{
                ADD_INVESTOR,
                UPDATE_INVESTOR,
                DELETE_INVESTOR,
                investorBreakdown,
                apiError,
                apiSuccess,
                apiErrorMessage,
                dispatchInvestorBreakdown,
                totalAllocation,
                validInput,
                setTotalAllocation,
                doCalculateProration,
                calculatedBreakdown
            }}>
            {props.children}
        </GlobalStore.Provider>
    );
};

export default GlobalStoreProvider;
