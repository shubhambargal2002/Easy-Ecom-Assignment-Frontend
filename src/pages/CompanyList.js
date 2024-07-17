import React, { useState, useEffect } from "react";
import "./styles/companyList.css";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { IconEdit, IconTrashX } from "@tabler/icons-react";
import Modal from "react-modal";
import {useNavigate} from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CompanyList = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [companyIdToDelete, setCompanyIdToDelete] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://easy-ecom-assignment-backend.onrender.com/getAllCompanies")
      .then((res) => setData(res.data))
      .catch((error) => toast.error("error"));
  }, []);

  const deleteCompany = (id) => {
    axios
      .delete(`https://easy-ecom-assignment-backend.onrender.com/deleteCompany/${id}`)
      .then(() => {
        setData(data.filter((company) => company._id !== id));
        setShowModal(false);
      })
      .catch((error) =>
        console.error("There was an error deleting the company!", error)
      );
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: "600" }}>{row?.companyName}</td>
                <td style={{ color: "#228BE6" }}>{row?.email}</td>
                <td>{row?.phoneNumber}</td>
                <td>{moment(data?.createdAt).format("DD MMM YYYY, hh:mma")}</td>
                <td>
                  <IconEdit  style={{cursor:"pointer"}} onClick={() =>
                navigate("/editCompany", {
                  state: {
                    companyId: row?._id,
                  },
                })
              }/>{" "}
                  <IconTrashX
                    onClick={() => {
                      setCompanyIdToDelete(row?._id);
                      setShowModal(true);
                    }}
                    style={{cursor:"pointer"}}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal
        isOpen={showModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <h2>Delete Company</h2>
          <p style={{ color: "red" }}>
            Are your sure you want to delete this Company from company list...?
          </p>

          <div
            style={{ display: "flex", alignItems: "center", columnGap: "20px" }}
          >
            <button
              onClick={() => {
                setShowModal(false);
              }}
              style={{
                cursor: "pointer",
                border: "1px solid #868e96",
                color: "#333",
                boxSizing: "border-box",
                borderRadius: "4px",
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                height: "36px",
                padding: "0px 18px",
                background: "transparent",
                outline: "none",
              }}
            >
              Cancel
            </button>
            <button
              style={{
                cursor: "pointer",
                border: "none",
                boxSizing: "border-box",
                borderRadius: "4px",
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                height: "36px",
                padding: "0px 18px",
                backgroundColor: "#fa5252",
                color: "#fff",
                outline: "none",
              }}
              onClick={() => {
                deleteCompany(companyIdToDelete);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CompanyList;
