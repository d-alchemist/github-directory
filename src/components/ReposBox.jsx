import { Col, Row } from "react-bootstrap";
import Loader from "./Loader";
import RepoCard from "./RepoCard";

export default function ReposBox({repos, loading, error, moreReposRef}) {
  return (
    <div>
      <Row>
        {
          repos && repos.map((repo, index) => {
            if (repos.length === index + 1) {
              return (
                <Col md={4} xs={6} ref={moreReposRef} className="my-3" key={repo.id}>
                  <RepoCard repo={repo} />
                </Col>
              )
            }
            return (
              <Col md={4} xs={6} className="my-3" key={repo.id}>
                <RepoCard repo={repo} />
              </Col>
            )
          })
        }
      </Row>
      {loading && <Loader />}
      {error && <p>{error}</p>}
    </div>
  )
}
