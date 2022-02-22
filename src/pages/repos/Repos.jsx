import { Suspense, useCallback, useEffect, useRef, lazy } from "react";
import { Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import useDebouncedInput from "../../hooks/useDebouncedInput";
import { clearRepoData, fetchMoreRepos, fetchRepos, goToNextPage, searchRepoData } from "../../store/actions/repoActions";

const ReposBox = lazy(() => import("../../components/ReposBox"));

export default function Repos() {
  const dispatch = useDispatch();

  const {loading, repos, error, page} = useSelector((state) => state.repos);
  
  const [searchInput, debouncedOnChange] = useDebouncedInput();

  const firstRender = useRef(true);

  const observer = useRef();

  const moreReposRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (searchInput) {
          dispatch(goToNextPage());
          dispatch(searchRepoData(searchInput));
          return;
        }
        dispatch(fetchMoreRepos());
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, dispatch, searchInput]);


  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch, page]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    dispatch(clearRepoData());
    dispatch(searchRepoData(searchInput));
  }, [searchInput, dispatch]);

  return (
    <section className="container py-4">
      <Header title="GitHub Repositories" />
      <Container className="mb-4">
				<Row className="mx-0 px-0 mx-md-5 px-md-5">
					<InputGroup className="px-0"> 
						<InputGroup.Text id="basic-addon1" style={{ border: "2px solid aliceblue" }} className="bg-white">
							<i className="bx bx-search h3 mb-0" style={{ color: '#b0b0b0' }}></i>
						</InputGroup.Text>
						<FormControl
							placeholder="Enter repository"
							aria-label="RepositoryName"
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
          <ReposBox loading={loading} repos={repos} error={error} moreReposRef={moreReposRef} />
        </Suspense>
      </Container>
    </section>
  )
}