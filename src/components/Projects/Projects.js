import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import chotainvestor from "../../Assets/Projects/chotainvestor thumbnail.png";
import alqaim from "../../Assets/Projects/alqaim realestate thumbnail.png";
import smart from "../../Assets/Projects/smart Recovery thumbnail.png";


function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chotainvestor}
              isBlog={false}
              title="Middle Class Investment Guide"
              description="A platform for guide small investors of pakistan especially of pakistan and guide them how to invest in the pakistan stock exange (PSX) and realestate sector of pakistan it also privde some use ful resources books and link to gain knowledge and train you mind to how escape form the matrix."
              ghLink="https://bitbucket.org/thedabsters/fe-chotainvestor/"
              demoLink="https://dev.chotainvestor.pk"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={alqaim}
              isBlog={false}
              title="Al Qaim RealeEstate"
              description="A real estate customer management platform where we can add user installations and payment records and can get a real time receipt generated for each payment."
              ghLink="https://github.com/AmeerHamzaDev12/al_qaim_realestate"
              demoLink="/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={smart}
              isBlog={false}
              title="Smart Recovery System for traders"
              description="A platform for providing smart recovery solutions for individuals and businesses facing financial difficulties."
              ghLink="https://github.com/AmeerHamzaDev12/SRSFT_Smart_Recovery_System"
              demoLink="/"              
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
