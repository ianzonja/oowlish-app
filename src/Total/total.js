import React from 'react'

const total = (props) => 
{
	return(
		<div className="total">
			<h1 className="total-title">{props.heading}</h1>
			<div className="total-card" style={{backgroundColor: props.color}}><div className="total-value">{props.value}</div></div>
		</div>
	)
};

export default total;