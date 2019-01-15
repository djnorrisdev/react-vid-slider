import React, { Component } from 'react';
import {
  Carousel, Image, Video, Button
} from './styles';

class Slider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 0,
      time: 3000,
      running: false,
      data: [
        {
          image: require('../../videos/snow_aerial.mp4'),
          title: 'Card Five',
          content: 'this is some test content',
          link: '',
          video: true
        },
        {
          image:
            'https://magazine.artstation.com/wp-content/uploads/2017/12/raphael-lacoste-castle-mood-1.jpg',
          title: 'Card One',
          content: 'this is some test content',
          link: '',
          video: false
        },
        {
          image:
            'https://cdnb.artstation.com/p/assets/images/images/003/343/885/large/andreas-rocha-homecoming02.jpg?1472658459&dl=1',
          title: 'Card Two',
          content: 'this is some test content',
          link: '',
          video: false
        },
        {
          image: require('../../videos/sunset.mp4'),
          title: 'Card Three',
          content: 'this is some test content',
          link: '',
          video: true
        },
        {
          image: require('../images/dog.jpg'),
          title: 'Card Four',
          content: 'this is some test content',
          link: '',
          video: false
        },
        {
          image: require('../../videos/waves.mp4'),
          title: 'Card Five',
          content: 'this is some test content',
          link: '',
          video: true
        },
        {
          image: require('../images/scenery.jpg'),
          title: 'Card Six',
          content: 'this is some test content',
          link: '',
          video: false
        }
      ]
    };
    this.vidRef = React.createRef();
    this.interval = null;
  }

  componentDidMount () {
    // Comment out querySelector for infinite loop
    document.querySelectorAll(`video`).forEach(el => el.addEventListener('ended', this.checkEnded));
    this.setInterval();
  }

    setInterval = () => {
      this.interval = setInterval(this.handleSlide, this.state.time);
      // Uncomment for infinite loop
      // this.setListener();
    }
    // Uncomment for infinite loop
    // setListener = () => {
    //   document.querySelectorAll(`video`).forEach(el => el.addEventListener('ended', this.checkEnded));
    // }

    checkEnded = () => {
      const { current, data } = this.state;
      this.setState(state => ({
        ...state,
        running: false
      }));

      if (current === data.length - 1) {
        this.setState(state => ({
          ...state,
          current: 0
        }));
        this.setInterval();
      } else {
        this.setState(state => ({
          ...state,
          current: current + 1
        }));
        this.setInterval();
      }
    }

    handleVideo = () => {
      const { current, data } = this.state;
      data.forEach((item, i) => {
        if (item.video && i === current) {
          clearInterval(this.interval);
          this.setState(state => ({
            ...state,
            running: true
          }));
        }
      });
    };

    handleSlide = () => {
      // Not completely destructured due to resulting bug
      const { current, data } = this.state;
      this.handleVideo();

      if (!this.state.running && current < data.length - 1) {
        this.setState(state => ({
          ...state,
          current: current + 1
        }));
      } else if (this.state.running) {
        this.setState(state => ({
          ...state,
          current
        }));
        
      } else {
        this.setState(state => ({
          ...state,
          current: this.state.running ? current : 0
        }));
        // For infinite loop (replace else statement with below code)
        // const loop = [...this.state.data];
        // this.setState(prevState => ({
        //   ...prevState,
        //   data: [...this.state.data, ...loop]
        // }));
        // this.setListener();
      }
    }

    handleButtons = ({ target: { name } }) => {
      const { current, data } = this.state;
      if (name === 'left' && current <= 0) {
        this.setState(state => ({
          ...state,
          current: 0
        }));
      } else if (name === 'left') {
        this.setState(state => ({
          ...state,
          current: current - 1
        }));
      } else if (name === 'right' && current < data.length - 1) {
        this.setState(state => ({
          ...state,
          current: current + 1
        }));
      } else {
        this.setState(state => ({
          ...state,
          current: 0
        }));
      }
    }

    render () {
      console.log(this.state.running, this.state.current)
      const { current, data } = this.state;
      return (
        <React.Fragment>
          <Carousel count={data.length} current={current}>
            {data.map((item, i) => (
              item.video
                ? <Video className="video" width="100%" height="auto" type="video/mp4" poster="../public/images/ssLogo.png" autoPlay controls muted src={current === i ? item.image : ''} key={i} />
                : <Image key={i} src={item.image} />
            ))}
          </Carousel>
          <Button name="left" onClick={this.handleButtons}>
            {'<'}
          </Button>
          <Button name="right" onClick={this.handleButtons}>
            {'>'}
          </Button>
        </React.Fragment>
      );
    }
}
export default Slider;
