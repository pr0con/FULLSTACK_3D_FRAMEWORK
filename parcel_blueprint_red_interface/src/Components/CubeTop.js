import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

const StyledCubeTop = styled.div`
	transform: rotateX(90deg) translateZ(1000px);
`;

export function CubeTop() {
	return(
		<StyledCubeTop className="cube-face">
			Top
		</StyledCubeTop>	
	)
}