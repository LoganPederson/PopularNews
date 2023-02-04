import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap'
import "/node_modules/bootstrap/scss/bootstrap.scss";

function RandomImgCard(){
    return(
        <div className='row' id='card_row'>
          <div className='col-sm-8' id='card_col'>
        <Card className="mb-3" style={{color: "#000"}}>
          <Card.Img src='https://picsum.photos/200/100' />
          <Card.Body>
            <Card.Title>
              Card Title
            </Card.Title>
            <Card.Text>
              This is some random card text! Typing is hard!
            </Card.Text>
            <Button variant='primary'>Read More</Button>
          </Card.Body>
        </Card>
        </div>
        </div>
    )
}

export default RandomImgCard