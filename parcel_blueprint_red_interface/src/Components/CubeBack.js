import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { PythonContext } from './PythonProvider.js';

const StyledCubeBack = styled.div`
	transform: translateZ(-1000px) rotateY(-180deg);
`;

export function CubeBack() {
	const { rs } = useContext(PythonContext);
	
	return(
		<StyledCubeBack className="cube-face">
			Python WebSocket State - ({rs})
		</StyledCubeBack>	
	)
}