import React, { useEffect, useState } from "react";
import styles from "../CSS/TicketReady.module.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const TicketReady = () => {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    avatar: "",
    specialRequest: "",
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("attendeeForm"));
    if (savedData) {
      setTicketData(savedData);
    } else {
      navigate("/attendee-details"); 
    }
  }, [navigate]);

  return (
    <div className='container'>
      <Header />

      <div className={styles.readyContainer}>
        <div className={styles.ready_heading}>
          <h2 className={styles.title}>Ready</h2>
          <p className={styles.stepIndicator}>Step 3/3</p>
        </div>

        <div>
          <h2 className={styles.ticket_title}>Your Ticket is Booked!</h2>
          <p className={styles.subtitle}>
            Check your email for a copy or you can <span className={styles.download}>download</span>
          </p>
        </div>

        <div className={styles.content}>
			<div className={styles.content_item}>
				<h3 className={styles.eventTitle}>Techember Fest '25</h3>
          		<p className={styles.eventDetails}>
            		<span className={styles.icon}>📍</span> 04 Rumens road, Ikoyi, Lagos
          		</p>
          		<p className={styles.eventDetails}>
            		<span className={styles.icon}>📅</span> March 15, 2025 | 7:00 PM
          		</p>

          		<div className={styles.profileImage}>
            		<img src={ticketData.avatar} alt="Attendee" className={styles.image} />
          		</div>

          		<div className={styles.ticketInfo}>
             		<div className={styles.infoRow}>
						<div className={styles.infoColumn}>
							<p className={styles.label}>Enter your name</p> 
							<p className={styles.value}><strong>{ticketData.name}</strong></p>
						</div>
						<div className={styles.infoColumn}>
							<p className={styles.label}>Enter your email *</p>
							<p className={styles.value}><strong>{ticketData.email}</strong></p>
						</div>
             		</div>

					<div className={styles.infoRow}>
						<div className={styles.infoColumn}>
							<p className={styles.label}>Ticket Type:</p>
							<p className={styles.value}>VIP</p>
						</div>
						<div className={styles.infoColumn}>
							<p className={styles.label}>Ticket for:</p>
							<p className={styles.value}>1</p>
						</div>
					</div>

					<div className={styles.specialRequest}>
						<p className={styles.label}>Special request?</p>
						<p className={styles.value}>
							{ticketData.specialRequest ? ticketData.specialRequest : "Nil"}
						</p>
					</div>
				</div>

			</div>
          
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={() => navigate("/attendeedetails")}>
            Book Another Ticket
          </button>
          <button className={styles.downloadButton}>Download Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default TicketReady;
