
import React from 'react';
import { Link } from "react-router-dom";
import './OurStoryPage.css';

function OurStoryPage() {
  return (
    <div className="container">
      <main className="content">
        <h1>Our Story</h1>
        <nav>
    <Link to="/">Home</Link> &gt;  
  <span>  Our Story</span></nav>
        
        <section className="story-section">
          <p>
            Year 2021 will always be very close to our hearts when we embarked upon our passion journey called ‘Antiq’. A humble thought of bridging the gap between the traditional crafting communities and an audience that values their authentic art and the strive to uplift the working & living conditions of our craftsmen turned into a brand which is loved and supported by many across the globe.
          </p>
          <p>
            We are a close-knit team made up of craftspeople, artists, designers, photographers, and creative minds. Our aim is to dress up spaces with simple, handcrafted and sustainable décor elements and embrace the connection felt in owning a unique item made using centuries-old techniques by an individual which has an increasing value in our fast-paced world.
          </p>
        </section>

        <section className="what-we-do">
          <h2>WHAT WE DO</h2>
          <p>
            Working collaboratively with local artisans and artists from India we produce timeless collections of objects that are natural, sustainable, functional, and have high aesthetic value. Gaining a deep understanding of the techniques and processes of each craft is fundamental to our design process.
          </p>
          <p>
            Our role is to act as a bridge between traditional crafting communities and an audience who value authentic goods sustainably produced. And with a designer's eye and years of expertise in this field we work together to update shapes, introduce contemporary color palettes and focus on the finer details to create a fusion between age-old tradition and modernity.
          </p>
        </section>

        <section className="philosophy">
          <h2>OUR PHILOSOPHY</h2>
          <p>
            Our philosophy is simple, we make products that are designed to last, not trend-driven, inspired by natural design and materials, and influenced by the history and culture we grew up in and still have a global appeal.
          </p>
          <p>
            We believe in handmade; perfectly imperfect wares crafted slowly from natural materials locally sourced. Our aim is to elevate the status of artisanal craft and those who produce it and improve the living and working conditions of our partners.
          </p>
        </section>

        <section className="naming-brand">
          <h2>NAMING OUR BRAND</h2>
          <p>
            Our love for flowers was the inspiration behind choosing the name “Antiq”. The Tesu flower, traditionally used to make natural saffron color, has huge significance in the lives of Indian tribes and their culture. Saffron color symbolizes happiness and purity, just like our products. Our products at Antiq are inspired by natural design and materials, influenced by Indian culture, and having them in your space will surely bring aesthetic happiness.
          </p>
        </section>
      </main>

      
    </div>
  );
}

export default OurStoryPage;