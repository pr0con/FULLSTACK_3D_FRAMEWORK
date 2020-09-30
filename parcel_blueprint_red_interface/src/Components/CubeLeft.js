import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { PHPContext } from './PHPProvider.js';

const StyledCubeLeft = styled.div`
	transform: rotateY(-90deg) translateZ(1000px);
`;

export function CubeLeft() {
	const { rs } = useContext(PHPContext);
	
	return(
		<StyledCubeLeft className="cube-face">
			PHP WebSocket State - ({rs})
		</StyledCubeLeft>	
	)
}