import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (session) {
      fetch('/api/twitch/details')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching details:', error));
    }
  }, [session]);

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const { userInfo, channelInfo, subscriptionsInfo, followersInfo, bitsInfo, extensionsInfo, gamesInfo } = data;

  const followersChartData = {
    labels: ['Followers'],
    datasets: [
      {
        label: 'Followers',
        data: [followersInfo.total],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              <Card.Img variant="top" src={userInfo.profile_image_url} />
              <Card.Text>Name: {userInfo.display_name}</Card.Text>
              <Card.Text>Email: {userInfo.email}</Card.Text>
              <Card.Text>Description: {userInfo.description}</Card.Text>
              <Card.Text>View Count: {userInfo.view_count}</Card.Text>
              <Card.Text>Created At: {new Date(userInfo.created_at).toLocaleDateString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Channel Information</Card.Header>
            <Card.Body>
              <Card.Text>Broadcaster Name: {channelInfo.broadcaster_name}</Card.Text>
              <Card.Text>Game: {channelInfo.game_name}</Card.Text>
              <Card.Text>Title: {channelInfo.title}</Card.Text>
              <Card.Text>Language: {channelInfo.broadcaster_language}</Card.Text>
              <Card.Text>Tags: {channelInfo.tags.join(', ')}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Subscribers</Card.Header>
            <Card.Body>
              <Card.Text>Total Subscribers: {subscriptionsInfo.total}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Followers</Card.Header>
            <Card.Body>
              <Card.Text>Total Followers: {followersInfo.total}</Card.Text>
              <Bar data={followersChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Bits Leaderboard</Card.Header>
            <Card.Body>
              <Card.Text>Total Bits: {bitsInfo.total}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Extensions</Card.Header>
            <Card.Body>
              <ListGroup>
                {extensionsInfo.data.map((extension, index) => (
                  <ListGroup.Item key={index}>{extension.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Games</Card.Header>
            <Card.Body>
              <ListGroup>
                {gamesInfo.data.map((game, index) => (
                  <ListGroup.Item key={index}>{game.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
