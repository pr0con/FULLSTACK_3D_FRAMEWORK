import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { PythonContext } from './PythonProvider.js';

const StyledPython = styled.div`
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

export function Python() {
	const { rs } = useContext(PythonContext);
	
	return(
		<StyledPython>
			<span className="cell-language-title">{`Python WebSocket State - (${rs})`}</span>
		</StyledPython>
	)
}
