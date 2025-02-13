import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../CSS/Header.module.css';
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
	<header className={styles.header}>
		<div className={styles.logo}><img src={logo} alt='logo'/></div>
		<nav className={styles.navbar}>
			<a href="/">Events</a>
        	<a href="/">My Tickets</a>
        	<a href="/">About Project</a>
		</nav>
		<button className={styles.myticketsBtn}>MY TICKETS <FontAwesomeIcon icon={ faArrowRight } /></button>

		

	</header>
  )
}

export default Header;



