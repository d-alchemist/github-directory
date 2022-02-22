import { Col, Row } from "react-bootstrap";
import Loader from "./Loader";
import RepoCard from "./RepoCard";

export default function ReposBox({repos, loading, error, moreReposRef}) {
  return (
    <>
      <Row>
        {
          repos && repos.map((repo, index) => {
            if (repos.length === index + 1) {
              return (
                <Col md={4} lg={3} xs={12} ref={moreReposRef} className="my-3" key={repo.id}>
                  <RepoCard repo={repo} />
                </Col>
              )
            }
            return (
              <Col md={4} lg={3} xs={12} className="my-3" key={repo.id}>
                <RepoCard repo={repo} />
              </Col>
            )
          })
        }
      </Row>
      {loading && <Loader />}
      {error && <p>{error}</p>}
    </>
  )
}
