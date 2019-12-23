import React from 'react'
import { Heading, Flex, Button} from 'rebass'
import {
  Hero, ScrollDownIndicator, Section, Checklist, Phone, Feature
} from 'react-landing-page'
import firebase from 'firebase';
import './App.css'
import { Form} from 'react-bootstrap';
import ReactGA from 'react-ga';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const featherCheckmark = <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24" height="24"
  viewBox="0 0 24 24"
  fill="none" stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
  <polyline points="22 4 12 14.01 9 11.01"/>
</svg>
const config = {
  apiKey: "AIzaSyA8dlDqw_HDwcI3vkzad2P39LFWTY5y4_Q",
  authDomain: "tingkat-landing-page.firebaseapp.com",
  databaseURL: "https://tingkat-landing-page.firebaseio.com",
  projectId: "tingkat-landing-page",
  storageBucket: "tingkat-landing-page.appspot.com",
  messagingSenderId: "659326712729"
};
firebase.initializeApp(config);

class App extends React.Component {
  state = {
    email: '',
  }


  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
 handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    if (email === '') {
      toast('Please Enter email', {
        type: 'info',
        autoClose: 2000,
        hideProgressBar: true,
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false,
        draggable: false,
    });
      return;
    }
    var database = firebase.database();
    database.ref(`/users`).push({
      email,
      timestamp: Date.now(),
    })
    this.setState({email: ''})
    toast('Thank you! We will keep you in the loop!', {
      type: 'success',
      autoClose: 2000,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_CENTER,
      closeButton: false,
      draggable: false,
  });
  }

  render() {
    ReactGA.initialize('UA-138658194-1');
    ReactGA.pageview('/');
    const { email} = this.state;
    return(
  <div>
    <Hero
      color="black"
      bg="white"
      backgroundImage="https://i.ibb.co/T1STGR8/2.jpg"
    >
    <ToastContainer/>
        <Heading fontSize="50px">Tingkat</Heading>
        <br></br>
        <Heading textAlign="center" fontSize="15px">What's cooking? </Heading>
      <Flex flexWrap='wrap' alignItems='center'>
        <Flex alignItems='flex-start' width={[1, 1 / 2]} p={3}>
            <Phone src='https://i.ibb.co/Bf1cyCg/1.png'
                style={{transform: 'translate(32px, 64px)'}} />
            <Phone src='https://i.ibb.co/xgFqBGF/Screen-Shot-2019-04-20-at-2-13-33-PM.png' color='white'
                style={{transform: 'translate(-32px, 0px)'}} />
        </Flex>
        <Flex width={[1, 1 / 2]} alignItems='center' flexDirection='column' p={3} >
            <Heading className={"mobile"}>Interested? Sign up to get updates</Heading>
            {/* <Subhead fontSize={[2, 3]}>2 Screenshots & links</Subhead> */}
            <br></br>

           <form onSubmit={this.handleSubmit}>
           <Form.Control  className={"w3-input w3-border w3-round-large"} type="email" name="email" value={email} placeholder="Email Address" onChange={this.handleInputChange} />
           <div className={"center"}>
           <Button bg="orange" children="Sign Up" type="submit" />
           </div>
           </form>
        </Flex>
    </Flex>
        <ScrollDownIndicator/>
    </Hero>

    <Flex flexWrap="wrap" justifyContent="center">
      <Feature icon="👋" description="What's inside?">
          Home Cooked Goodness
      </Feature>

      <Feature icon="📩" description="Get Updates">
          Sign Up
      </Feature>
      <Feature icon="🔥" description="What we do?">
          Buy and Sell Home cooked food
      </Feature>
      </Flex>
      <Section width={1}
      subhead='What we offer?'>
      <Checklist children={[
        'On-Demand Homemade Food within 4 hours',
        'Pre Order food 2 days in advance',
        'Seamless Ordering Process',
        'Premium Help & Service for Sellers',
      ]} checkmark={featherCheckmark}/>
    </Section>
  </div>);
  }
}

export default App;
