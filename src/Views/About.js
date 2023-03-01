import NavBarComponent from '../Components/NavBar';
import { Container, Nav, Navbar, NavDropdown, Button, Row, Col } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import viewCountImage from '../Images/bar-chart.png' 
import newArticleImg from '../Images/calendar.png'
import lightningFast from '../Images/flash.png'
import adFree from '../Images/advertisement.png'
import bmcButton from '../Images/bmc-button.png'
import githubLogo from '../Images/GitHub-logo.png'
import linkedIn from '../Images/linkedIn.png'





function Navigation() {
  const [visitorCount, setVisitorCount] = useState(false)
  const {isLoading} = useAuth0()
  const numSteps = 20.0;

  let prevRatio = 0.0;
  let increasingColor = "rgba(40, 40, 190, ratio)";
  let decreasingColor = "rgba(190, 40, 40, ratio)";
  let boxElement = useRef(null);
  let textElement = useRef(null);

  // Set things up for Intersection Observer API

  function createObserver() {
    let observer;
  
    let options = {
      root: null,
      rootMargin: "10px",
      threshold: buildThresholdList()
    };
  
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(boxElement.current);
  }

  function buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;
  
    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (window.innerWidth > 1000){
        if (entry.intersectionRatio >= 0.95) {
          textElement.current.style.fontSize = '60px'
          console.log(entry.intersectionRatio)
        } else if(entry.intersectionRatio <= 0.75) { // else if is needed as the resize due to font change will trigger the else statement as the % in view changes 
          textElement.current.style.fontSize = '32px'
          console.log(entry.intersectionRatio)
        }
      }
      prevRatio = entry.intersectionRatio;
    });
  }



  useEffect(async ()=>{
    if (boxElement.current){
    console.log(boxElement.current)
    createObserver();
    }
  })

  useEffect(async () => {
    if(!isLoading)
      try {
          // API endpoint for user data based on email
          let targetURI = `https://popularnews.org/api/get_visit_count{}`
          let res = await axios.get(targetURI)
          let arr = res.data;
          setVisitorCount(arr) // cooresponds to category

          return (arr)
          
      } catch(e) {
          console.log(e)
      }
  },[isLoading]);







  if(!visitorCount){
    return(null)
  }

  return (
    <>
    <NavBarComponent />
    <Container fluid style={{padding:0, margin: 0, width: '100%'}}>
      <Row style={{padding:0, margin: 0, height: "auto", minHeight: "60vh", backgroundColor: '#4DD0E1'}} >
        <Col></Col>
        <Col md={{span: 6, offset: 3}} id='about_section_1' style={{backgroundColor: '#4DD0E1', padding: 15, margin: 0, textAlign: 'center'}} className = "my-auto">
          <h1 id='about_h1' style={{textAlign:'center', color: "black"}}>
            PopularNews.org
          </h1>
          <p style={{fontSize: 20}}>
            A simple and user friendly way to view top headlines that matter to you. 
          </p>
          <p>
          <img src={viewCountImage} style={{width: 30, height: 30, textAlign: 'center', marginBottom:5}}  alt="" /><span style={{fontSize: 25, color:'green'}}> {visitorCount}</span><span style={{color:'red', fontSize:20}}> visitors so far!</span> 
          </p>
        </Col>
        <Col ></Col>
      </Row>
      <Row ref={boxElement} style={{padding:0, margin: 0, height: "auto", backgroundColor: '#0d6efd'}}>
        <Col></Col>
        <Col md={{span: 6, offset: 3}} id='about_section_2' style={{backgroundColor: '#0d6efd', padding: 15, margin: 0, textAlign: 'center'}} className = "my-auto">
          <h1 id='fresh_h1' ref={textElement} style={{textAlign:'center', color: "black"}}>
            A Fresh Take on News  
          </h1>
          <Container>
            <Row xs={2} md={4} style={{paddingTop:'10vh'}}>
              <Col xs={1} md={3}/>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center'}}>
              <img src={newArticleImg} style={{width: 50, height: 50, textAlign: 'center'}}  alt="" />  
              </Col>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center', marginBottom:0}}>
                <p style={{fontSize: 20, color:'mediumspringgreen', justifyContent: 'center'}}>
                  <b>Daily Articles</b>
                </p>
              </Col>
              <Col xs={1} md={3}/>
            </Row>
            <Row xs={2} md={4} style={{paddingTop:'10vh'}}>
              <Col xs={1} md={3}/>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center'}}>
                <img src={adFree} style={{width: 50, height: 50, textAlign: 'center', marginLeft:15}}  alt="" />  
              </Col>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center', marginBottom:0}}>
                <p style={{fontSize: 20, color:'mediumspringgreen	'}}>
                  <b>Ad Free</b>
                </p>
              </Col>
              <Col xs={1} md={3}/>
            </Row>
            <Row xs={2} md={4} style={{paddingTop:'10vh'}}>
              <Col xs={1} md={3}/>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center'}}>
              <img src={lightningFast} style={{width: 50, height: 50, textAlign: 'center', marginLeft:22}}  alt="" />  
              </Col>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center', marginBottom:0}}>
                <p style={{fontSize: 20, color:'mediumspringgreen	'}}>
                  <b>Lightning Fast</b>
                </p>
              </Col>
              <Col xs={1} md={3}/>
            </Row>
          </Container>
        </Col>
        <Col></Col>
      </Row>



      <Row style={{padding:0, margin: 0, height: "auto", backgroundColor: '#4DD0E1'}}>
        <Col></Col>
        <Col md={{span: 6, offset: 3}} id='about_section_3' style={{backgroundColor: '#4DD0E1', padding: 15, margin: 0, textAlign: 'center'}} className = "my-auto">
          <h1 id='about_h1' style={{textAlign:'center', color: "black"}}>
            Support This Site  
          </h1>
          <Container>
            <Row xs={2} md={4} style={{paddingTop:'10vh'}}>
              <Col xs={1} md={3}/>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center'}}>
              <a href='https://www.buymeacoffee.com/loganpederson' target="_blank"><img src={bmcButton} style={{width: '100%', height: 'auto', textAlign: 'center'}}  alt=""/></a>
              </Col>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center', marginBottom:0}}>
                <p style={{fontSize: 20, color:'black', justifyContent: 'center'}}>
                  <b>Buy Me A Coffee</b>
                </p>
              </Col>
              <Col xs={1} md={3}/>
            </Row>
            <Row xs={2} md={4} style={{paddingTop:'10vh'}}>
              <Col xs={1} md={3}/>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center'}}>
                <a href='https://www.github.com/LoganPederson/popularnews' target="_blank"><img src={githubLogo} style={{width: '75%', height: 'auto', textAlign: 'center'}}  alt="" /></a>
              </Col>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center', marginBottom:0}}>
                <p style={{fontSize: 20, color:'black	'}}>
                  <b>See The Code</b>
                </p>
              </Col>
              <Col xs={1} md={3}/>
            </Row>
            <Row xs={2} md={4} style={{paddingTop:'10vh'}}>
              <Col xs={1} md={3}/>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center'}}>
              <a href='https://www.linkedin.com/in/logan-p-19527a82/' target="_blank"><img src={linkedIn} style={{width: '100%', height: 'auto', textAlign: 'center'}}  alt="" /></a>
              </Col>
              <Col xs={5} md={3} style={{textAlign:'center', display:'flex',justifyContent:'center', alignItems:'center', marginBottom:0}}>
                <p style={{fontSize: 20, color:'black	'}}>
                  <b>Hire Me</b>
                </p>
              </Col>
              <Col xs={1} md={3}/>
            </Row>
          </Container>
        </Col>
        <Col></Col>
      </Row>
    </Container>
    </>
  );
}

export default Navigation;
