import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from './AppProvider.js';

const StyledCubeFront = styled.div`
	transform: translateZ(1000px) rotateY(0deg);
`;


export function CubeFront() {
	const { rs } = useContext(AppContext);	
	return(
		<StyledCubeFront className="cube-face">
			NodeJs WebSocket State - ({rs})
		</StyledCubeFront>	
	)
}