import React from 'react'
import { getImageUrl } from '../../util';
import styles from './About.module.css'

const About = () => {
  return (
    <section className={styles.container} id='about'>
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}><img src={getImageUrl('about/aboutImage.jpg')}alt="Siiting with a laptop" className={styles.aboutImage}/></div>
      <ul className={styles.aboutItems}>
        <li className={styles.aboutItem}><img src={getImageUrl('about/cursorIcon.png')} alt="cursor icon" />
        <div className={styles.aboutItemText}>
          <h3>Frontend Developer</h3>
          <p>
            I'm a frontend ddeveloper with exprience in building responsive and optimized sites.
          </p>
        </div>
        </li>
        <li className={styles.aboutItem}><img src={getImageUrl('about/serverIcon.png')} alt="cursor icon" />
        <div className={styles.aboutItemText}>
          <h3>Backend Developer</h3>
          <p>
           I have experience developing fast and optimised backend and API's
          </p>
        </div>
        </li>
        <li className={styles.aboutItem}><img src={getImageUrl('about/serverIcon.png')} alt="Ui icon" />
        <div className={styles.aboutItemText}>
          <h3>UI Designer</h3>
          <p>
            I have designed multiple landing page and have designed systems as well.
          </p>
        </div>
        </li>
      </ul>
    </section>
  )
}

export default About
