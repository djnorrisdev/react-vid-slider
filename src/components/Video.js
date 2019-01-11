import React, { Component } from 'react';
import styled from 'styled-components/macro';

const Video = styled.video`
  width: 100vw;
`
class VideoElement extends Component {

  render() {
    return (
      <Video />
    )
  }
}
export default VideoElement;