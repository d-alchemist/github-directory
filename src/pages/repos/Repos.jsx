import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReposBox from "../../components/ReposBox";
import { clearRepoData, fetchMoreRepos, fetchRepos, goToNextPage, searchRepoData } from "../../store/actions/repoActions";
import { debounce } from "../../utils/debounce";

export default function Repos() {
  const dispatch = useDispatch();
  const {loading, repos, error, page} = useSelector((state) => state.repos);
  const [searchInput, setSearchInput] = useState("");

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

  const handleTextInput = useCallback((e) => {
    const inputText = e.target.value;
    setSearchInput(inputText);
    clearRepoData();
    dispatch(searchRepoData(inputText));
  }, [dispatch]);

  const debouncedOnChange = debounce(handleTextInput, 1000);

  return (
    <section className="container py-4">
      <header className="pb-3 mb-4 text-center border-bottom">
        <h1 className="h3">GitHub Repositories</h1>
      </header>
      <Container className="mb-4">
				<Row className="mx-5 px-5">
					<InputGroup>
						<InputGroup.Text id="basic-addon1" style={{ border: "2px solid aliceblue" }} className="bg-white">
							<i className="bx bx-search h3 mb-0" style={{ color: '#b0b0b0' }}></i>
						</InputGroup.Text>
						<FormControl
							placeholder="Enter repository"
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
          <ReposBox loading={loading} repos={repos} error={error} moreReposRef={moreReposRef} />
        </Suspense>
      </Container>
    </section>
  )
}