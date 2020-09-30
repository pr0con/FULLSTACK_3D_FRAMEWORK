import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { GoContext } from './GoProvider.js';

const StyledGo = styled.div`
	position: relative;
	
	top: 0px;
	left: 0px;
	
	width: 100%;
	height: calc(100% - 6rem);
	
	border: 1px solid #f00;	
	
	.cell-language-title {
		display: block;
		position: relative;
		width: 100%;
		color: #ccc;
		font-size: 1.6rem;
		text-align:center;
	}	
`;

export function Go() {
	const { rs } = useContext(GoContext);
	
	return(
		<StyledGo>
			<span className="cell-language-title">{`Go WebSocket State - (${rs})`}</span>
		</StyledGo>
	)
}
