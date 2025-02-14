import React, { useState } from "react";
import Header from "../components/Header";
import styles from "../CSS/TicketSelection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [numTickets, setNumTickets] = useState(1);
  const navigate = useNavigate();

  const ticketOptions = [
    { type: "REGULAR ACCESS", price: "Free", left: 20 },
    { type: "VIP ACCESS", price: "$50", left: 20 },
    { type: "VVIP ACCESS", price: "$150", left: 20 },
  ];

  const handleNext = () => {
    if (!selectedTicket) {
      alert("Please select a ticket type.");
      return;
    }

    // Save selections to localStorage
    localStorage.setItem("ticketType", selectedTicket);
    localStorage.setItem("ticketQuantity", numTickets);

    // Navigate to the Attendee Details Page
    navigate("/attendeedetails");
};

return (
    <div className="container">
      <Header />
      <div className={styles.ticket_selection}>
        <div className={styles.ticket_heading}>
          <h2>Ticket Selection</h2>
          <p>Step 1/3</p>
        </div>

        <div className={styles.card}>
          <div className={styles.event_card}>
            <h3>Techember Fest '25</h3>
            <p>
              Join us for an unforgettable experience at <br /> Techember Fest! Secure your spot now.
            </p>
            <p>
              <FontAwesomeIcon icon={faLocationDot} /> Tech Hub Arena || March 15, 2025 | 7:00 PM
            </p>
          </div>

          <div className={styles.ticket_options}>
            <h4>Select Ticket Type:</h4>
            <div className={styles.ticket_option_item}>
              {ticketOptions.map((ticket) => (
                <button
                  key={ticket.type}
                  className={selectedTicket === ticket.type ? styles.active : ""}
                  onClick={() => setSelectedTicket(ticket.type)}
                >
                  <span className={styles.ticket_price}>{ticket.price}</span> 
                  <br />
                  <span className={styles.ticket_type}>{ticket.type}</span> 
                  <br />
                  <small className={styles.ticket_left}>{ticket.left} / 52</small>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.ticket_quantity}>
            <h4>Number of Tickets</h4>
            <select value={numTickets} onChange={(e) => setNumTickets(e.target.value)}>
              {[...Array(20).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.ticketselectbutton}>
            <button className={styles.cancel} onClick={() => navigate("/")}>Cancel</button>
            <button className={styles.next} onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
