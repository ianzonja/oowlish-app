import React from 'react'

const timeInput = (props) => 
{
	return(
		<div className="time-input-container">
			<h3>{props.name}</h3>
			<div className="inputs">
				<div className="time-input">
					<select onChange={props.changed} className="hours-input">
					<option selected disabled>-----</option>
					<option value="00">00</option>
					<option value="01">01</option>
					<option value="02">02</option>
					<option value="03">03</option>
					<option value="04">04</option>
					<option value="05">05</option>
					<option value="06">06</option>
					<option value="07">07</option>
					<option value="08">08</option>
					<option value="09">09</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12">12</option>
					</select>
				</div>
				<div className="time-input">
					<select onChange={props.changed} className="minutes-input">
					<option selected disabled>-----</option>
					<option value="00">00</option>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="20">20</option>
					<option value="25">25</option>
					<option value="30">30</option>
					<option value="35">35</option>
					<option value="40">40</option>
					<option value="45">45</option>
					<option value="50">50</option>
					<option value="55">55</option>
					</select>
				</div>
			</div>
		</div>
	)
};

export default timeInput;