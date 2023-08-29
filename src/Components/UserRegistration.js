import React, { useState } from "react";
import "./UserRegistration.css";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    dob: "",
    companyName: "",
    idCardNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      if (formData.password !== formData.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: "Passwords do not match",
        });
      } else {
        // Reset the confirmPassword error if passwords match
        setErrors({
          ...errors,
          confirmPassword: "",
        });
      }
    }

    // Inline validations
    switch (name) {
      // ... (other validation checks for fields)
      case "confirmPassword":
        // Check if Confirm Password matches Password
        if (value !== formData.password) {
          setErrors({
            ...errors,
            [name]: "Passwords do not match",
          });
        } else {
          // Reset the confirmPassword error if passwords match
          setErrors({
            ...errors,
            [name]: "",
          });
        }
        break;
      case "phoneNumber":
        const phoneNumberPattern = /^\d{10}$/;
        const isPhoneNumberValid = phoneNumberPattern.test(value);
        setErrors({
          ...errors,
          [name]: isPhoneNumberValid ? "" : "Invalid phone number",
        });
        break;
      case "alternatePhoneNumber":
        const alternatePhoneNumberPattern = /^\d{10}$/;
        const isAlternatePhoneNumberValid =
          alternatePhoneNumberPattern.test(value);
        setErrors({
          ...errors,
          [name]: isAlternatePhoneNumberValid ? "" : "Invalid phone number",
        });
        break;
      case "email":
        const emailPattern =
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const isEmailValid = emailPattern.test(value);
        setErrors({
          ...errors,
          [name]: isEmailValid ? "" : "Invalid email address",
        });
        break;
      case "pincode":
        const isPincodeValid = /^\d{6}$/.test(value);
        setErrors({
          ...errors,
          [name]: isPincodeValid ? "" : "Pincode must be 6 digits as integers",
        });
        break;
      case "password":
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const isPasswordValid = passwordPattern.test(value);
        setErrors({
          ...errors,
          [name]: isPasswordValid
            ? ""
            : "Password must be at least 8 characters, including one uppercase letter, one lowercase letter, and one digit",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check each field in formData for errors
    const fieldErrors = {};
    for (const fieldName in formData) {
      if (formData.hasOwnProperty(fieldName)) {
        if (
          fieldName !== "alternatePhoneNumber" &&
          formData[fieldName].trim() === ""
        ) {
          fieldErrors[fieldName] = "This field is required";
        }
      }
    }

    // Check if any errors exist in the fieldErrors object
    const isFieldErrorsEmpty = Object.keys(fieldErrors).length === 0;

    // Check if the form is valid
    if (isFieldErrorsEmpty && Object.values(errors).every((error) => !error)) {
      setIsSubmitted(true);
    } else {
      setErrors({ ...errors, ...fieldErrors });
    }
  };

  return (
    <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
      <div className="wrapper wrapper--w680">
        <div className="card card-4">
          <div className="card-body">
            {isSubmitted ? (
              <div className="label success-message">Registration successful!</div>
            ) : (
              <>
                <h2 className="title">Registration Form</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="name">
                          Name*
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        {errors.name && (
                          <div className="error-message">{errors.name}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="email">
                          Email*
                        </label>
                        <input
                          className="input--style-4"
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        {errors.email && (
                          <div className="error-message">{errors.email}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="phoneNumber">
                          Phone Number*
                        </label>
                        <input
                          className="input--style-4"
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                        />
                        {errors.phoneNumber && (
                          <div className="error-message">
                            {errors.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="alternatePhoneNumber">
                          Alternate Phone Number
                        </label>
                        <input
                          className="input--style-4"
                          type="tel"
                          id="alternatePhoneNumber"
                          name="alternatePhoneNumber"
                          value={formData.alternatePhoneNumber}
                          onChange={handleChange}
                        />
                        {errors.alternatePhoneNumber && (
                          <div className="error-message">
                            {errors.alternatePhoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="streetAddress">
                          Street Address*
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          id="streetAddress"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          required
                        />
                        {errors.streetAddress && (
                          <div className="error-message">
                            {errors.streetAddress}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="city">
                          City*
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                        {errors.city && (
                          <div className="error-message">{errors.city}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="state">
                          State*
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                        {errors.state && (
                          <div className="error-message">{errors.state}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="pincode">
                          Pincode*
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                        />
                        {errors.pincode && (
                          <div className="error-message">{errors.pincode}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="input-group">
                      <label className="label" htmlFor="dob">
                        Date of Birth*
                      </label>
                      <input
                        className="input--style-4"
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                      {errors.dob && (
                        <div className="error-message">{errors.dob}</div>
                      )}
                    </div>
                  </div>

                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="companyName">
                          Company Name*
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                        />
                        {errors.companyName && (
                          <div className="error-message">
                            {errors.companyName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="idCardNumber">
                          ID Card Number*
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          id="idCardNumber"
                          name="idCardNumber"
                          value={formData.idCardNumber}
                          onChange={handleChange}
                          required
                        />
                        {errors.idCardNumber && (
                          <div className="error-message">
                            {errors.idCardNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="password">
                          Password*
                        </label>
                        <input
                          className="input--style-4"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          className="password-toggle-button"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"} Password
                        </button>
                        {errors.password && (
                          <div className="error-message">{errors.password}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label" htmlFor="confirmPassword">
                          Confirm Password*
                        </label>
                        <input
                          className="input--style-4"
                          type={showPassword ? "password" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        {errors.confirmPassword && (
                          <div className="error-message">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-t-15">
                    <div className="button-container">
                      <button
                        className="btn btn--radius-2 btn--blue"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
