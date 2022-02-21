import { Card } from 'react-bootstrap';

export default function RepoCard({repo}) {
	return (
    <Card className="h-100 custom_card">
      <Card.Body>
        <Card.Title>{repo.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{repo.owner.login}</Card.Subtitle>
        <Card.Link href="#" style={{wordBreak: "break-all"}}>{repo.html_url}</Card.Link>
      </Card.Body>
    </Card>
	);
}
