import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

const StyledCubeBottom = styled.div`
	transform: rotateX(-90deg) translateZ(1000px);
`;

export function CubeBottom() {
	return(
		<StyledCubeBottom className="cube-face">
			Bottom
		</StyledCubeBottom>	
	)
}