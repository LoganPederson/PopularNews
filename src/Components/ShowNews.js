import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';



// ShowNews component to display an article
const ShowNews = ({ data, number }) => {
  return (
    // Card component from React Bootstrap to display the article
    <Card className="mb-3" style={{ color: "#000" }}>
      {/* Display the article's image */}
      <Card.Img src={data ? data[number][7] : null} />
      <Card.Body>
        {/* Display the article's title */}
        <Card.Title>{data ? data[number][5] : null}</Card.Title>
        {/* Display the article's description */}
        <Card.Text>{data ? data[number][3] : null}</Card.Text>
        {/* Link to the full article */}
        <Link to={{ pathname: data ? data[number][6] : null }} target="_blank">
          <Button variant="primary">Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ShowNews;