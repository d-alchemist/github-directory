import { Suspense, useEffect, lazy, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import { fetchSearchData, fetchUsers, fetchMore, goToNextPage, clearUserData } from '../../store/actions/userActions';
import Header from '../../components/Header';
import useDebouncedInput from '../../hooks/useDebouncedInput';

const UsersBox = lazy(() => import('../../components/UsersBox'));

export default function Users() {
	const dispatch = useDispatch();

	const { loading, users, error, perPage } = useSelector((state) => state.users);

  const [searchInput, debouncedOnChange] = useDebouncedInput();

  const observer = useRef();

  const firstRender = useRef(true);

  const moreUsersRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (searchInput) {
          dispatch(goToNextPage());
          dispatch(fetchSearchData(searchInput));
          return;
        }
        dispatch(fetchMore());
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, dispatch, searchInput]);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch, perPage]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    dispatch(clearUserData());
    dispatch(fetchSearchData(searchInput));
  }, [searchInput, dispatch]);

	return (
		<section className="container py-4">
			<Header title="Find GitHub Users" />

			<Container className="mb-4">
				<Row className="mx-0 px-0 mx-md-5 px-md-5">
					<InputGroup className="px-0">
						<InputGroup.Text id="basic-addon1" style={{ border: "2px solid aliceblue" }} className="bg-white">
							<i className="bx bx-search h3 mb-0" style={{ color: '#b0b0b0' }}></i>
						</InputGroup.Text>
						<FormControl
							placeholder="Enter Username"
							aria-label="Username"
							aria-describedby="basic-addon1"
							className="border-start-0"
              autoFocus
              onChange={debouncedOnChange}
              style={{ border: "2px solid aliceblue" }}
						/>
					</InputGroup>
				</Row>
			</Container>
      <Container className="d-flex justify-content-center">
        <Suspense fallback={<h1><i className='bx bx-square-rounded bx-spin bx-rotate-270' ></i></h1>}>
          <UsersBox loading={loading} users={users} error={error} moreUsersRef={moreUsersRef} />
        </Suspense>
      </Container>
		</section>
	);
}
