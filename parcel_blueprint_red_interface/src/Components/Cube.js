import React, { useState } from 'react';
import styled from 'styled-components';

const StyledCube = styled.div`
	position: relative;
	top: 0px;
	left: 0px;
	
	width: calc(100% - 4rem);
	height: calc(100% - 4rem);
	
	background: #000;
	perspective: 1000px;
	
	#cube-wrapper {
		position: relative;
		
		top:0px;
		left: 0px;
		
		width: 100%;
		height: 100%;
		
		transform-style: preserve-3d;
		transform: translateZ(-1000px);
		transition: 1s;
		
		&.show-front  { transform: translateZ(-1000px) rotateY(  0deg);  }
		&.show-right  { transform: translateZ(-1000px) rotateY( -90deg); }
		&.show-back   { transform: translateZ(-1000px) rotateY(-180deg); }
		&.show-left   { transform: translateZ(-1000px) rotateY(  90deg); }
		&.show-top    { transform: translateZ(-1000px) rotateX( -90deg); }
		&.show-bottom { transform: translateZ(-1000px) rotateX(  90deg); }

		.cube-face {
			position: absolute;
			width: 100%;
			height: 100%;
			
			border: 2px solid #ccc;
			
			font-size: 2rem;
			font-weight: bold;
			
			color: #fff;
			text-align: center;
			background: hsla( 0, 100%, 50%, 0.1);	
		}	
	}
	
	#cube-controls {
		position: absolute;
		
		bottom: -4rem;
		left: 0px;	
		
		height: 4rem;
		display: flex;
		align-items: center;
		
		.cube-control {
			&.selected {
				color: #acf9fb;	
			}	
			&:hover { cursor: pointer; }
			&:not(:first-child) { margin-left: 1rem; }
			
			font-size: 1.2rem;
		}
	}
`;

import { CubeFront } from './CubeFront.js';
import { CubeRight } from './CubeRight.js';
import { CubeBack } from './CubeBack.js';
import { CubeLeft } from './CubeLeft.js';
import { CubeTop } from './CubeTop.js';
import { CubeBottom } from './CubeBottom.js';


export function Cube() {
	const [ face, setFace ] = useState('show-face'); 	
	
	return(
		<StyledCube>
			<div id="cube-wrapper" className={`${face}`}>
				<CubeFront />
				<CubeRight />
				<CubeBack />
				<CubeLeft />
				<CubeTop />
				<CubeBottom />
			</div>
			<div id="cube-controls">
				<span className={`cube-control ${face === 'show-front' ? 'selected' : ''}`} onClick={() => setFace('show-front')}>NodeJs</span>
				<span className={`cube-control ${face === 'show-right' ? 'selected' : ''}`} onClick={() => setFace('show-right')}>GoLang</span>
				<span className={`cube-control ${face === 'show-back' ? 'selected' : ''}`} onClick={() => setFace('show-back')}>Python</span>
				<span className={`cube-control ${face === 'show-left' ? 'selected' : ''}`} onClick={() => setFace('show-left')}>PHP</span>
				<span className={`cube-control ${face === 'show-top' ? 'selected' : ''}`} onClick={() => setFace('show-top')}>State</span>
				<span className={`cube-control ${face === 'show-bottom' ? 'selected' : ''}`} onClick={() => setFace('show-bottom')}>Logs</span>
			</div>
		</StyledCube>
	)
}