import React from 'react';

/*
* Pure presentational component
*/

export function ButtonBase({text}){
    if(!text) return null;
    
    return <button style={{width: "100%"}}>{text}</button>;
}
