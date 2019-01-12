import React, { Component } from 'react';
import styled from 'styled-components/macro';

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.count}00vw;
  height: 100%;
  transform: translateX(-${props => props.current}00vw);
  transition: transform ${props => props.current === 0 ? '0s ease-in' : '0.35s ease-in-out'};
  background-color: #111111;
`;

const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  // background-image: url(${props => props.src});
  // background-position: center;
  // background-size: cover;
  h1 {
    color: white;
  }
  p {
    color: white;
  }
`;
const Video = styled.video`
  width: 100vw;
`

const Button = styled.button`
  position: absolute;
  top: 50vh;
  left: ${props => props.name === "left" && "20px"};
  right: ${props => props.name === "right" && "20px"};
  background: transparent;
  border: none;
  font-size: 20px;
  color: #f1f1f1;
  &:hover {
    cursor: pointer;
  }
`;



class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      time: 3000,
      running: false,
      autoPlay: false,
      data: [
        {
          image:
            "https://magazine.artstation.com/wp-content/uploads/2017/12/raphael-lacoste-castle-mood-1.jpg",
          title: "Card One",
          content: "this is some test content",
          link: "",
          video: false
        },
        {
          image:
            "https://cdnb.artstation.com/p/assets/images/images/003/343/885/large/andreas-rocha-homecoming02.jpg?1472658459&dl=1",
          title: "Card Two",
          content: "this is some test content",
          link: "",
          video: false
        },
        {
          image: require("../videos/mtb.mp4"),
          title: "Card Three",
          content: "this is some test content",
          link: "",
          video: true
        },
        {
          image: require("./images/dog.jpg"),
          title: "Card Four",
          content: "this is some test content",
          link: "",
          video: false
        },
        {
          image: require("../videos/snow_aerial.mp4"),
          title: "Card Five",
          content: "this is some test content",
          link: "",
          video: true
        },
        {
          image: require("./images/scenery.jpg"),
          title: "Card Six",
          content: "this is some test content",
          link: "",
          video: false
        }
      ]
    };
    this.vidRef = React.createRef();
    this.interval = null;
  }
    componentDidMount() {
      document.querySelectorAll(`video`).forEach(el => el.addEventListener('ended', this.checkEnded))
      this.setInterval();
    }

    setInterval = () => {
        this.interval = setInterval(this.handleSlide, this.state.time);
    }

    checkEnded = () => {
      this.setState(state => ({
        ...state,
        running: false
      }));

      if (this.state.current === this.state.data.length -1 ) {
        this.setState({
          current: 0
        })
        this.setInterval()
      } else {
        this.setState({
          current: this.state.current +1
        })
        this.setInterval()
      }
    }

    handleSlide = () => {
      this.state.data.forEach((item, i) => {
        if (item.video === true && i === this.state.current) {
          clearInterval(this.interval);
          this.setState({
            running: true
          });
        } 
      })
      if (!this.state.running && this.state.current < this.state.data.length - 1) {
          this.setState ({
            current: this.state.current + 1
          })
        } else {
        this.setState({
          current: this.state.running ? this.state.current : 0
        })
      }
    }

    handleButtons = ({ target: { name } }) => {
      if (name === "left" && this.state.current <= 0) {
        this.setState({
          current: 0
        });
      } else if (name === "left") {
        this.setState({
          current: this.state.current - 1
        });
      } else if (name === "right" && this.state.current < this.state.data.length -1) {
        this.setState({
          current: this.state.current + 1
        });
      } else {
        this.setState({
          current: 0
        });
      }
    }

  render() {
    console.log(this.state.current)
    const { current, data } = this.state;
    return (
      <React.Fragment>
        <Carousel count={data.length} current={current}>
          {data.map((item, i) => (
            item.video ?
            <Video ref={this.vidRef} className={`video`} width="100%" height="auto" type="video/mp4" poster="../public/images/ssLogo.png" autoPlay controls src={current === i ? item.image : ''} key={i}></Video> : 
            <Image key={i} src={item.image}>
            </Image>
          ))}
        </Carousel>
        <Button name="left" onClick={this.handleButtons}>
          {"<"}
        </Button>
        <Button name="right" onClick={this.handleButtons}>
          {">"}
        </Button>
      </React.Fragment>
    );
  }
}
export default Slider;