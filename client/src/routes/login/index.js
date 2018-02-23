import { h, Component } from 'preact';
import { LayoutGrid, TextField, Card, Button, Elevation } from 'preact-material-components';
import 'preact-material-components/style.css';
import './style';

export default class Login extends Component {
	render(){
		return (
			<div>
				<LayoutGrid align="center">
					<LayoutGrid.Inner>
						<LayoutGrid.Cell cols="4" />
						<LayoutGrid.Cell cols="3">
							<Elevation z={2}>
								<Card>
									<Card.Primary className="mdc-theme--secondary-bg">
										<Card.Title className="mdc-typography--headline mdc-theme--text-primary-on-secondary">Login</Card.Title>
									</Card.Primary>
									<Card.Media className="mdc-typography--title">
										<div>
											<TextField type="text" label="Email" />
										</div>
										<br />
										<div>
											<TextField type="password" label="Password" />
										</div>
										<br />
										<div className="mdc-layout-grid">
											<Button ripple raised className="mdc-theme--secondary-bg">
												Sign In
											</Button>
										</div>
									</Card.Media>
								</Card>
							</Elevation>
						</LayoutGrid.Cell>
						<LayoutGrid.Cell cols="4" />
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}
