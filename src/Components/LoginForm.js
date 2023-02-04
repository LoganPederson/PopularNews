import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap'
import "/node_modules/bootstrap/scss/bootstrap.scss";

function LoginForm(){
    return (
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Emaple@email.com" />
              <Form.Text className ='text-muted'>
                Test Form Text
              </Form.Text>
              </Form.Group>
            </Col>
            <Row>
              <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>
            </Row>
          <div id='login_button_div'>
          <Button variant='secondary' type="submit">Login</Button>
          </div>
        </Form>
    )
}

export default LoginForm