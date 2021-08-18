import React, { useEffect } from "react";
import { Div, Text } from "atomize";
import useDataFetch from "../hooks/useDataFetch";

/**
 * 
 * page for skin information
 * url : /skins/:skinId
 * 
 */

function Skins({ match, location }) {
    const [{ isLoading, isError, data: skin }, _] = useDataFetch(
        "initialUrl",
        {}
    );
    const [ChampionSkinList, doFetch] = useDataFetch(
        "initialUrl",
        []
    );
    useEffect(() => {
        doFetch(`/fastapi/api/champions/${skin.champion_id}/skins`);
    }, [skin]);

    return (<>
        <Div /* title */
            d="flex"
            h={{ xs: "150px", md: "400px" }}
            align="center"
            justify="center"
            flexDir="column"
        >
            <Text
                p={{ l: "0.5rem", r: "0.5rem" }}
                textSize="display3"
                textAlign="center"
            >
                {skin.name}
            </Text>
        </Div>
        <Div className="content-container" bg="black400" /* main content */ >
            <Div className="content-background" bg="black600" /* background */ />
            <Div>

            </Div>
        </Div>
    </>);
}

export default Skins;