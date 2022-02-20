import { Col, Row } from 'react-bootstrap';
import UserCard from './UserCard';

export default function UsersBox({ loading, users, error, moreUsersRef }) {
 	return (
    <>
      <Row>
        {users && users.map((user, index) => {
          if (users.length === index + 1) {
            return <Col md={4} lg={3} xs={12} ref={moreUsersRef} key={user.login} className="my-3">
            <UserCard
              avatar_url={user.avatar_url}
              login={user.login}
              url={user.html_url}
              type={user.type}
            />
          </Col>
          }
          return <Col md={4} lg={3} xs={12} key={user.login} className="my-3">
            <UserCard
              avatar_url={user.avatar_url}
              login={user.login}
              url={user.html_url}
              type={user.type}
            />
          </Col>
        })}
      </Row>
      {loading && <p><i class='bx bx-square-rounded bx-spin bx-rotate-270' /></p>}
      {error && <p>{error}</p>}
    </>
	);
}
