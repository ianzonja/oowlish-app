import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const workItem = (props) => 
{
	return(
		<div className="work-item">
			<div className="work-item-heading"><h2>Date: {props.date} <FontAwesomeIcon icon={faTrash} onClick={props.click}/></h2></div>
			<div className="work-item-inner">
				<div className="work-item-inner-data">
					<div className="work-item-inner-data-title">
						Worked from:
					</div>
					<div className="work-item-inner-data-value">
						{props.workedFrom}
					</div>
				</div>
				<div className="work-item-inner-data">
					<div className="work-item-inner-data-title">
						Worked to:
					</div>
					<div className="work-item-inner-data-value">
						{props.workedTo}
					</div>
				</div>
				<div className="work-item-inner-data">
					<div className="work-item-inner-data-title">
						Total worked:
					</div>
					<div className="work-item-inner-data-value">
						{props.totalWorked}
					</div>
				</div>
				<div className="work-item-inner-data">
					<div className="work-item-inner-data-title">
						Lunch break from:
					</div>
					<div className="work-item-inner-data-value">
						{props.lunchBreakFrom}
					</div>
				</div>
				<div className="work-item-inner-data">
					<div className="work-item-inner-data-title">
						Lunch break to:
					</div>
					<div className="work-item-inner-data-value">
						{props.lunchBreakTo}
					</div>
				</div>
				<div className="work-item-inner-data">
					<div className="work-item-inner-data-title">
						Total lunch break:
					</div>
					<div className="work-item-inner-data-value">
						{props.totalLunchBreak}
					</div>
				</div>
			</div>
		</div>
	)
};

export default workItem;