import { MDBCol, MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';

const ActiveUsers = props => {
	const { activeUsers } = props;
	return (
		<MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
			<h5 className="font-weight-bold mb-3 text-center text-lg-start">
				Active Users
			</h5>
			{activeUsers.activeUsers
				? activeUsers.activeUsers.map(item => (
						<MDBCard key={Math.random()}>
							<MDBCardBody>
								<MDBTypography listUnStyled className="mb-0">
									<li className="p-2">
										<a
											href="#!"
											className="d-flex justify-content-between"
										>
											<div className="d-flex flex-row">
												<img
													src="https://i.postimg.cc/85nKtgFz/user.png"
													alt="avatar"
													className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
													width="60"
												/>
												<div className="pt-1">
													<p
														className="fw-bold mb-0"
														style={{
															color: '#e7653d',
														}}
													>
														{item.activeUsers.toUpperCase()}
													</p>
												</div>
											</div>
											<div className="pt-1">
												<p className="small text-muted mb-1">
													Active
												</p>
											</div>
										</a>
									</li>
								</MDBTypography>
							</MDBCardBody>
						</MDBCard>
				  ))
				: null}
		</MDBCol>
	);
};

export default ActiveUsers;
