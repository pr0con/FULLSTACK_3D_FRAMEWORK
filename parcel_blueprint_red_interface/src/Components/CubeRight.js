import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { GoContext } from './GoProvider.js';

const StyledCubeRight = styled.div`
	transform: rotateY(90deg) translateZ(1000px);
`;

export function CubeRight() {
	const { rs } = useContext(GoContext)
	
	return(
		<StyledCubeRight className="cube-face">
			GoLang WebSocket State - ({rs})
		</StyledCubeRight>	
	)
}