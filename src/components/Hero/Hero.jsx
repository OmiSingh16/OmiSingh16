import React from 'react'
import { getImageUrl } from '../../util'
import styles from './Hero.module.css';



export const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hii, I am Om</h1>
        <p className={styles.description}>
          I'm a Full-Stack Developer.Reach out if you'd like to learn more!
        </p>
        <a href="mailto:omprakash810280@gmail.com" className={styles.contactBtn}>Contact Me</a>
      </div>
      <img src={getImageUrl('hero/heroImage.png')} alt="Me" className={styles.heroImg} />
    </div>
  )
}


