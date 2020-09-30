import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { navigate, useRoutes } from 'hookrouter';

import AppProvider from './AppProvider.js';
import { AppContext } from './AppProvider.js';

import GoProvider from './GoProvider.js';
import { GoContext } from './GoProvider.js';

import PythonProvider from './PythonProvider.js';
import { PythonContext } from './PythonProvider.js';

import PHPProvider from './PHPProvider.js';
import { PHPContext } from './PHPProvider.js';

const StyledApp = styled.div`
	position: relative;
		
	top: 0px;
	left: 0px;
	
	width: 100%;
	height: 100%;
	
	
	display: grid;
	grid-template-columns: 6rem 1fr;
	
	transition: grid-template-columns .2s;
	
	&.sidebar-open {
		grid-template-columns: 32rem 1fr;
	}
	
	color: #ccc;
	background: #000;
	
	#sidebar { 
		position: relative;
		
		display: flex;
		flex-direction: column;
		
		background: transparent;
		
		#sidebar-top {
			padding: 1rem;
			
			.link:not(:first-child) {
				margin-top: .5rem;
			}
			.link {
				font-size: 1.2rem;
				&:hover { cursor: pointer; }
				
				&.selected {
					color: #acf9fb;
				}					
			}
			
			&.sidebar-closed { width: 0px; padding: 0px; opacity: 0; overflow: hidden; }	
		}
		
		#sidebar-bottom {
			display: flex;
			flex-direction: row-reverse;
			
			#sidebar-toggle {
				width: 5.9rem;
				height: 6.9rem;	
				
				&:hover { cursor: pointer; }
			}
		} 
	}
	#content { background: #000; }
`;

import { GS } from './GS.js';
import { Dashboard } from './Dashboard.js';
import { Cube } from './Cube.js';



function App() {
	const routes = {
		'/': () => <Dashboard />,
		'/cube': () => <Cube />
	}
	const routeResult = useRoutes(routes);
	
	/*
		useEffect(() => {
			if(window.location.pathname !== '/') { 
				navigate('/');
			}
		},[]);
	*/
	
	
	
	return(
		<AppProvider>
			<AppContext.Consumer>
				{({ path, sidebar, setSidebar }) => (

					<GoProvider>
						<GoContext.Consumer>
							{({  }) => (
								
								<PythonProvider>
									<PythonContext.Consumer>
										{({  }) => (
														
											<PHPProvider>
												<PHPContext.Consumer>
													{({  }) => (																			
													
														<StyledApp className={sidebar ? 'sidebar-open' : 'sidebar-closed'}>
															<GS />
															<div id="sidebar">
																<div id="sidebar-top" className={sidebar ? 'sidebar-open' : 'sidebar-closed'} >
																	<div className={`link ${path === '/' ? 'selected' : ''}`} onClick={() => navigate('/') }>Dashboard</div>
																	<div className={`link ${path === '/cube' ? 'selected' : ''}`} onClick={() => navigate('/cube') }>Cube</div>
																</div>
																<div className="flex-filler"></div>
																<div id="sidebar-bottom">
																	<img id="sidebar-toggle" src="/images/thumbprint.png" onClick={() => setSidebar(!sidebar)} />
																</div>
															</div>
															<div id="content">
																{ routeResult }
															</div>
														</StyledApp>

													)}
												</PHPContext.Consumer>
											</PHPProvider>

										)}
									</PythonContext.Consumer>
								</PythonProvider>
											
							)}
						</GoContext.Consumer>
					</GoProvider>
										
				)}
			</AppContext.Consumer>
		</AppProvider>
	)
}

{ /* if(document.getElementById('react_root')) { */ }

if(document.querySelector('#react_root')) {
	ReactDOM.render(<App />, document.querySelector('#react_root'));
}