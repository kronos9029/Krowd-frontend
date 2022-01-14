import React from 'react'

import {
  Container,
  Row,
} from "react-bootstrap";
import CollapsePage from './CollapsePage';

const Revenue = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">

          <h3 >Frequently asked questions</h3>
        </Row>
        <Row className="justify-content-md-center">

          <CollapsePage />
        </Row>
      </Container>
    </>
  )
}
export default Revenue;
