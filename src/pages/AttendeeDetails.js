import React, { useState, useEffect } from "react";
import styles from "../CSS/AttendeeDetails.module.css";
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const AttendeeDetails = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "hello@avirolagos.io",
		specialRequest: "",
		avatar: "",
	});
	
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const savedData = localStorage.getItem("attendeeForm");
		if (savedData) {
		  setFormData(JSON.parse(savedData));
		}
	}, []);
	
	useEffect(() => {
		localStorage.setItem("attendeeForm", JSON.stringify(formData));
	}, [formData]);

	const isValidUrl = (url) => {
		try {
			new URL(url);
			return /\.(jpg|jpeg|png|gif)$/i.test(url);
		} catch (_) {
			return false;
		}
	};
	
	const validateForm = () => {
		let newErrors = {};

		if (!formData.name.trim()) {
		  newErrors.name = "Name is required";
		}
	
		if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
		  newErrors.email = "Invalid email format";
		}
	
		if (!isValidUrl(formData.avatar)) {
			newErrors.avatar = "Please enter a valid image URL ";
		}	
	
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; 
	};
	
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	
	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
	
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "unsigned_upload"); 
	
		try {
			const response = await fetch("https://api.cloudinary.com/v1_1/djplp0wkl/image/upload", {
				method: "POST",
				body: formData
			});
	
			const data = await response.json();
	
			if (data.secure_url) {
				setFormData((prev) => ({ ...prev, avatar: data.secure_url })); 
			}
		} catch (error) {
			console.error("Error uploading image to Cloudinary:", error);
		}
	};
	
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			localStorage.setItem("attendeeForm", JSON.stringify(formData));
			navigate("/ticketready");
		}
	};

  return (
    <div className='container'>
	  <Header />
      
      <div className={styles.formContainer}>
			<div className={styles.attend_heading}>
				<h2 className={styles.title}>Attendee Details</h2>
				<p className={styles.stepIndicator}>Step 2/3</p>
			</div>
				
			
			<div className={styles.card}>
				<div className={styles.uploadSection}>
					<p className={styles.uploadLabel}>Upload Profile Photo</p>
				
					<div className={styles.uploadBox}>
    					{formData.avatar ? (
      						<img src={formData.avatar} alt="Uploaded Preview" className={styles.uploadedImage} />
    					) : (
      					<label className={styles.uploadLabell} htmlFor="fileInput"> <FontAwesomeIcon icon={faCloudArrowDown} size="2x" />
        					<br /> Drag & drop or click to upload
      					</label>
    					)}
						<input type="file" id="fileInput" accept="image/*" className={styles.fileInput} onChange={handleImageUpload} />
					</div>
          			{errors.avatar && <p className={styles.error}>{errors.avatar}</p>}
				</div>
					
				<form className={styles.form} onSubmit={handleSubmit}>
					<label className={styles.label}>Enter your name</label>
					<input type="text" name="name" className={styles.input} value={formData.name} placeholder="" onChange={handleChange} />
					{errors.name && <p className={styles.error}>{errors.name}</p>}
					
					<label className={styles.label}>Enter your email *</label>
					<div className={styles.inputWithIcon}>
						<span className={styles.icon}><FontAwesomeIcon icon={faEnvelope} /></span>
						<input type="email" name="email" className={styles.input} value={formData.email}  onChange={handleChange} />
					</div>
					
					
					<label className={styles.label}>Special request?</label>
					<textarea name="specialRequest" className={styles.textarea} placeholder="Textarea" value={formData.specialRequest} onChange={handleChange}></textarea>
					
					<div className={styles.buttonGroup}>
						<button type="button" className={styles.backButton} onClick={() => navigate("/")}>Back</button>
						<button type="submit" className={styles.submitButton}>Get My Free Ticket</button>
					</div>
				</form>

			</div>
				
      	</div>
    </div>
  );
};

export default AttendeeDetails;
