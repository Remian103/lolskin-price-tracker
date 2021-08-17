import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

function dataFetchReducer(state, action) {
    switch (action.type) {
        case "FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "FETCH_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                data: action.payload
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
}

function useDataFetch(initialUrl, initialData) {
    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: "FETCH_INIT" });

            try {
                const result = await axios(url);

                if (!didCancel)
                    dispatch({ type: "FETCH_SUCCESS", payload: result.data });
            } catch (error) {
                if (!didCancel)
                    dispatch({ type: "FETCH_FAILURE" });
            }
        };

        if(url !== "initialUrl")
            fetchData();

        return () => {
            didCancel = true;
        };
    }, [url]);

    return [state, setUrl];
}

export default useDataFetch;