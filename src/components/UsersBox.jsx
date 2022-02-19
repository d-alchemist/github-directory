import { Col, Row } from 'react-bootstrap';
import UserCard from './UserCard';

export default function UsersBox({ loading, users, error }) {
	// if (loading) {
	// 	return <p>Loading...</p>;
	// }

  if (error) {
    return <p>Error</p>
  }

	return (
		<Row>
			{users.map((user) => (
        <Col md={4} lg={3} xs={12} key={user.id} className="my-3">
          <UserCard
            avatar_url={user.avatar_url}
            login={user.login}
            url={user.url}
            type={user.type}
          />
        </Col>
			))}
		</Row>
	);
}
