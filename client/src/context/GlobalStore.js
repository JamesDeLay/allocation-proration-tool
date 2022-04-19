/* eslint-disable no-case-declarations */
import React, { createContext, useReducer, useState } from 'react';
import uuid from 'react-uuid';

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
    const [investorBreakdown, dispatchInvestorBreakdown] = useReducer(
        investorBreakdownReducer,
        initialState
    );
    const [totalAllocation, setTotalAllocation] = useState(0);
    const [calculatedBreakdown, setCalculatedBreakdown] = useState([
        {
            name: 'Investor A',
            allocation: 100
        },
        {
            name: 'Investor B',
            allocation: 100
        },
        {
            name: 'Investor C',
            allocation: 100
        },
        {
            name: 'Investor D',
            allocation: 100
        }
    ]);

    const doFormatForAPI = (payload) => {
        const investor_amounts = payload.map(investor => ({ name: investor.name, requested_amount: investor.requested, average_amount: investor.average }))
        return {
            allocation_amount: totalAllocation,
            investor_amounts
        }
    };
    const postBreakdownForCalculation = async (payload) => {
        try {
            // const url = '/calculate';
            // let config = {
            //     method: 'POST',
            //     body: JSON.stringify(payload)
            // };
            // let res = await fetch(url, config)
            console.log({ req: payload });
            setCalculatedBreakdown(calculatedBreakdown);
            return;
        } catch (error) {
            console.error(error);
        }
    };

    const doCalculateProration = async () => {
        const payload = doFormatForAPI(Object.values(investorBreakdown))
        return postBreakdownForCalculation(payload)
    };
    return (
        <GlobalStore.Provider
            value={{
                ADD_INVESTOR,
                UPDATE_INVESTOR,
                DELETE_INVESTOR,
                investorBreakdown,
                dispatchInvestorBreakdown,
                totalAllocation,
                setTotalAllocation,
                doCalculateProration,
                calculatedBreakdown
            }}>
            {props.children}
        </GlobalStore.Provider>
    );
};

export default GlobalStoreProvider;
