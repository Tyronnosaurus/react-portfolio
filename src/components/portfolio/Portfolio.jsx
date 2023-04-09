import React from "react";
import "./portfolio.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ControlledCarousel from './ControlledCarousel'
import { useState } from "react";

import { data } from "./data.jsx"



const Portfolio = () => {

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (modalData) => {
    setModalData(modalData);
    setShow(true);
  }


  return (
    <>
      <section id="portfolio">

        <h5>My Recent Work</h5>
        <h2>Portfolio</h2>

        <div className="container portfolio__container">

          {data.map(({images, title, github_link, live_link, tags, description}) => {

            return (

              <article className="portfolio__item" key={title} onClick={() => handleShow({images, title, github_link, live_link, tags, description})}>

                <img className="portfolio__item-image" src={images[0]} alt={title} />

                <h3>{title}</h3>

                {/* <div className="portfolio__item-cta">
                  {github_link && <a href={github_link} className="btn portfolio__item-btn" target="_blank"> Github </a>}
                  {live_link   && <a href={live_link}   className="btn portfolio__item-btn" target="_blank"> Live </a>}
                </div> */}

              </article>

            );
          })}
        </div>

      </section>

      {modalData &&
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{modalData.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ControlledCarousel images={modalData.images}/>
            <div dangerouslySetInnerHTML={{__html: modalData.description}} />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      }
      
    
    </>
  );
};

export default Portfolio;
