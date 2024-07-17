import React, { useState } from "react";
import "./styles/addCompany.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const designations = [
  "Developer",
  "Manager",
  "System Admin",
  "Team Lead",
  "PM",
];
const skills = [
  "Java",
  "Angular",
  "CSS",
  "HTML",
  "JavaScript",
  "UI",
  "SQL",
  "React",
  "PHP",
  "GIT",
  "AWS",
  "Python",
  "Django",
  "C",
  "C++",
  "C#",
  "Unity",
  "R",
  "AI",
  "NLP",
  "Photoshop",
  "Node.js",
];

const AddCompany = () => {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyAddress: "",
    email: "",
    phoneNumber: "",
    empInfo: [],
  });

  const [employeeData, setEmployeeData] = useState({
    empName: "",
    empDesignation: "",
    empJoinDate: new Date(),
    empEmail: "",
    empPhoneNumber: "",
    skillInfo: [{ skillName: "", skillRating: 1 }],
    educationInfo: [{ instituteName: "", courseName: "", completedYear: "" }],
  });
  const navigate = useNavigate();

  const handleCompanyChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleEmployeeChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setEmployeeData({ ...employeeData, empJoinDate: e.target.value });
  };

  const handleAddSkill = () => {
    setEmployeeData({
      ...employeeData,
      skillInfo: [...employeeData.skillInfo, { skillName: "", skillRating: 1 }],
    });
  };

  const handleRemoveSkill = (index) => {
    const newSkills = employeeData.skillInfo.filter((_, i) => i !== index);
    setEmployeeData({ ...employeeData, skillInfo: newSkills });
  };

  const handleAddEducation = () => {
    setEmployeeData({
      ...employeeData,
      educationInfo: [
        ...employeeData.educationInfo,
        { instituteName: "", courseName: "", completedYear: "" },
      ],
    });
  };

  const handleRemoveEducation = (index) => {
    const newEducation = employeeData.educationInfo.filter(
      (_, i) => i !== index
    );
    setEmployeeData({ ...employeeData, educationInfo: newEducation });
  };

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const newSkills = employeeData.skillInfo.map((skill, i) =>
      index === i ? { ...skill, [name]: value } : skill
    );
    setEmployeeData({ ...employeeData, skillInfo: newSkills });
  };

  const handleEducationChange = (index, e) => {
    const newEducation = employeeData.educationInfo.map((edu, i) =>
      index === i ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setEmployeeData({ ...employeeData, educationInfo: newEducation });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...companyData, empInfo: [employeeData] };
    axios
      .post("https://easy-ecom-assignment-backend.onrender.com/addNewCompany", finalData)
      .then((res) => {
        navigate("/");
        toast.success("comapny added successfully");
      })
      .catch((error) => {
        toast.error("error");
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form_container">
      <div className="section_container">
        <h2>Company Basic Info</h2>
        <div className="label_container">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            required
            maxLength="50"
            value={companyData.companyName}
            onChange={handleCompanyChange}
          />
        </div>
        <div className="label_container">
          <label htmlFor="companyAddress">Company Address</label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={companyData.companyAddress}
            onChange={handleCompanyChange}
          />
        </div>
        <div className="label_container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength="100"
            value={companyData.email}
            onChange={handleCompanyChange}
          />
        </div>
        <div className="label_container">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            required
            maxLength="15"
            value={companyData.phoneNumber}
            onChange={handleCompanyChange}
          />
        </div>
      </div>

      <h2>Employee Info</h2>
      <div className="label_container">
        <label htmlFor="empName">Employee Name</label>
        <input
          type="text"
          id="empName"
          name="empName"
          required
          maxLength="25"
          value={employeeData.empName}
          onChange={handleEmployeeChange}
        />
      </div>
      <div className="label_container">
        <label htmlFor="empDesignation">Designation</label>
        <select
          id="empDesignation"
          name="empDesignation"
          required
          value={employeeData.empDesignation}
          onChange={handleEmployeeChange}
        >
          {designations.map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>
      <div className="label_container">
        <label htmlFor="empJoinDate">Join Date</label>
        <input
          id="empJoinDate"
          name="empJoinDate"
          type="date"
          value={employeeData.empJoinDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="label_container">
        <label htmlFor="empEmail">Email</label>
        <input
          type="email"
          id="empEmail"
          name="empEmail"
          required
          maxLength="100"
          value={employeeData.empEmail}
          onChange={handleEmployeeChange}
        />
      </div>
      <div className="label_container">
        <label htmlFor="empPhoneNumber">Phone Number</label>
        <input
          type="text"
          id="empPhoneNumber"
          name="empPhoneNumber"
          required
          maxLength="15"
          value={employeeData.empPhoneNumber}
          onChange={handleEmployeeChange}
        />
      </div>

      <h2>Skills Info</h2>
      {employeeData.skillInfo.map((skill, index) => (
        <div className="label_container" key={index}>
          <label htmlFor="skillName">Skill Name</label>
          <select
            id="skillName"
            name="skillName"
            required
            value={skill.skillName}
            onChange={(e) => handleSkillChange(index, e)}
          >
            {skills.map((skill, idx) => (
              <option key={idx} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          <label htmlFor="skillRating">Skill Rating</label>
          <input
            type="number"
            id="skillRating"
            name="skillRating"
            required
            min="1"
            max="5"
            value={skill.skillRating}
            onChange={(e) => handleSkillChange(index, e)}
          />
          <button type="button" onClick={() => handleRemoveSkill(index)}>
            Remove Skill
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddSkill}>
        Add Skill
      </button>

      <h2>Education Info</h2>
      {employeeData.educationInfo.map((edu, index) => (
        <div className="label_container" key={index}>
          <label htmlFor="instituteName">Institute Name</label>
          <input
            type="text"
            id="instituteName"
            name="instituteName"
            required
            maxLength="50"
            value={edu.instituteName}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            required
            maxLength="25"
            value={edu.courseName}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <label htmlFor="completedYear">Completed Year</label>
          <input
            type="text"
            id="completedYear"
            name="completedYear"
            required
            value={edu.completedYear}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <button type="button" onClick={() => handleRemoveEducation(index)}>
            Remove Education
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddEducation}>
        Add Education
      </button>

      <button type="submit">Save Company</button>
    </form>
  );
};

export default AddCompany;
