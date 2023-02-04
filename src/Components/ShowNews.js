import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';



// ShowNews component to display an article
const ShowNews = ({ data, number }) => {
  return (
    // Card component from React Bootstrap to display the article
    <Card className="mb-3" style={{ color: "#000" }}>
      {/* Display the article's image */}
      <Card.Img src={data ? data.articles[number].urlToImage : null} />
      <Card.Body>
        {/* Display the article's title */}
        <Card.Title>{data ? data.articles[number].title : null}</Card.Title>
        {/* Display the article's description */}
        <Card.Text>{data ? data.articles[number].description : null}</Card.Text>
        {/* Link to the full article */}
        <Link to={{ pathname: data ? data.articles[number].url : null }} target="_blank">
          <Button variant="primary">Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ShowNews;