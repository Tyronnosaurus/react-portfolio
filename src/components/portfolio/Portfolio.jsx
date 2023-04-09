import React from "react";
import "./portfolio.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ControlledCarousel from './ControlledCarousel'
import { useState } from "react";
import FilterButtons from "./FilterButtons";
import { motion } from "framer-motion";

import { data } from "./data.jsx"



const Portfolio = () => {

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("")

  const handleClose = () => setShow(false);

  const handleShow = (modalData) => {
    setModalData(modalData);
    setShow(true);
  }


  const filteredData = (currentFilter==="") ? data : data.filter((item) => item.tags.includes(currentFilter))


  return (
    <>
      <section id="portfolio">

        <h5>My Recent Work</h5>
        <h2>Portfolio</h2>

        <FilterButtons applyFilter={setCurrentFilter}/>

        <div className="container portfolio__container">

          {filteredData.map(({images, title, github_link, live_link, tags, description}) =>

              <motion.div className="image-card"
                          key={title} layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{duration: 0.5 }}>
                <article className="portfolio__item" onClick={() => handleShow({images, title, github_link, live_link, tags, description})}>

                  <img className="portfolio__item-image" src={images[0]} alt={title} />

                  <h3>{title}</h3>

                </article>
              </motion.div>

          )}
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

            <div className="portfolio__item-cta">
              {modalData.github_link && <a href={modalData.github_link} className="btn portfolio__item-btn" target="_blank" rel="noreferrer"> Github </a>}
              {modalData.live_link   && <a href={modalData.live_link}   className="btn portfolio__item-btn" target="_blank" rel="noreferrer"> Live </a>}
            </div>

            <div class="tags">{"Tags: " + modalData.tags.join(', ')}</div>
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
