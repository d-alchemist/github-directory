import { Card } from "react-bootstrap";

export default function UserCard({avatar_url, login, url, type}) {
  return (
    <Card className="h-100 pt-5 rounded-3 user_card">
      <div className="d-flex justify-content-center">
        <Card.Img variant="top" src={avatar_url} className="rounded-circle w-50" />
      </div>
      <Card.Body className="text-center">
        <Card.Title className="text-capitalize">{login}</Card.Title>
        <div className="user_details">
          <Card.Subtitle>{type}</Card.Subtitle>
          <Card.Link href={url} target="_blank">Visit Repository</Card.Link>
        </div>
      </Card.Body>
    </Card>
  )
}
