import { Suspense, useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { fetchUsers } from '../../store/actions';
const UsersBox = lazy(() => import('../../components/UsersBox'));

export default function Users() {
	const dispatch = useDispatch();
	const { loading, users, error } = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<section className="container py-4">
			<header className="pb-3 mb-4 text-center border-bottom">
				<h1 className="h3">Find GitHub Users</h1>
			</header>

			<Container className="mb-4">
				<Row className="mx-5 px-5">
					<InputGroup>
						<InputGroup.Text id="basic-addon1" className="bg-white">
							<i
								className="bx bx-search h3 mb-0"
								style={{ color: '#b0b0b0' }}
							></i>
						</InputGroup.Text>
						<FormControl
							placeholder="Enter Username"
							aria-label="Username"
							aria-describedby="basic-addon1"
							className="border-start-0"
						/>
					</InputGroup>
				</Row>
			</Container>
      <Container>
        <Suspense fallback={<h1>Loading...</h1>}>
          <UsersBox loading={loading} users={users} error={error} />
        </Suspense>
      </Container>
		</section>
	);
}
