import React from 'react';
import styled from 'styled-components';

const CenteredParagraph = styled.p`
  text-align: center;
  font-size: 18px;
`;

function About() {
  return (
    <div>
      <h1>Sobre Tech Store</h1>
      <CenteredParagraph>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque sunt expedita distinctio repellendus tempora nobis quidem, ab, aliquam, labore aliquid suscipit laudantium beatae. Nemo molestias vitae nihil reiciendis nisi ea!
      </CenteredParagraph>
    </div>
  );
}

export default About;