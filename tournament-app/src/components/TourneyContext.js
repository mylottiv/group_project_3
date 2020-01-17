import React, {useState, createContext} from 'react';

export const TourneyContext = createContext();

export const TourneyProvider = (props) => {

        const size = useState(parseInt(props.match.params.number));

        return (
            <TourneyContext.Provider value={size}>
                {props.children}
            </TourneyContext.Provider>
        )
}