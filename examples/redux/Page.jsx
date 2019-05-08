import React from 'react';

import ConnectedButton from './ConnectedButton';

export function Page(){

    const Button = <ConnectedButton/>;
    
    return (
	<>
	  <h1></h1>
	  <p>Here is some additional text!</p>
	  {Button && (
	      <div style={{display: "flex"}}>
		<p>Here is a button:</p>
		<div style={{width: "200px"}}>
		  {Button}
		</div>
	      </div>
	  )}
	</>
    );
}
