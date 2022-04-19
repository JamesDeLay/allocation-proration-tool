import React, { createContext, useReducer, useState } from "react";
import uuid from "react-uuid";

const ADD_INVESTOR = "ADD_INVESTOR"
const UPDATE_INVESTOR = "UPDATE_INVESTOR"
const DELETE_INVESTOR = "DELETE_INVESTOR"

const doMakeUUID = () => uuid();

const initialState = {
    [doMakeUUID()]: {
        name: "",
        requested: 0,
        average: 0
    }
}

const investorBreakdownReducer = (state, dispatch) => {
    const {action, payload} = dispatch
    let clone = {...state};
    switch(action) {
        case ADD_INVESTOR:
            const investorUUID = doMakeUUID();
            const template = {
                "uuid": investorUUID,
                "name": "",
                "requested": 0,
                "average": 0
            }
            clone[investorUUID] = {...template}
            return clone
        case DELETE_INVESTOR:
            try {
                delete clone[payload.uuid]
            } catch (err) {
                console.error(`Check UUID`, err)
            }
            return clone
        case UPDATE_INVESTOR:
            const {uuid, key, value} = payload
            clone[uuid][key] = value
            return clone
        default:
            return state
    }
}

export const GlobalStore = createContext();

const GlobalStoreProvider = props => {
    const [investorBreakdown, dispatchInvestorBreakdown] = useReducer(investorBreakdownReducer, initialState)
    const [totalAllocation, setTotalAllocation] = useState(0);
    const [calculatedBreakdown, setCalculatedBreakdown] = useState([
        {
            name: "Investor A",
            allocation: 100
        },
        {
            name: "Investor B",
            allocation: 100
        },
        {
            name: "Investor C",
            allocation: 100
        },
        {
            name: "Investor D",
            allocation: 100
        },
    ])

    // const doFormatForAPI = (payload) => {
    //     // {
    //     //     "allocation_amount": 100,
    //     //     "investor_amounts": [
    //     //       {
    //     //         "name": "Investor A",
    //     //         "requested_amount": 100,
    //     //         "average_amount": 100
    //     //       },
    //     //       {
    //     //         "name": "Investor B",
    //     //         "requested_amount": 25,
    //     //         "average_amount": 25
    //     //       }
    //     //     ]
    //     //   }
    // }
    const postBreakdownForCalculation = async (body) => {
        try {
            // const url = '/calculate'
            // let config = {
            //     method: "POST",
            //     body: JSON.stringify(doFormatForAPI(body))
            // }
            // let res = await fetch(url, config)
            // console.log(res)
            return 
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <GlobalStore.Provider value={{
        ADD_INVESTOR,
        UPDATE_INVESTOR, 
        DELETE_INVESTOR,
        investorBreakdown,
        dispatchInvestorBreakdown,
        totalAllocation,
        setTotalAllocation,
        postBreakdownForCalculation,
        calculatedBreakdown,
    }}>
      {props.children}
    </GlobalStore.Provider>
  );
};

export default GlobalStoreProvider;