// @flow strict
import React, { useState, useEffect } from "react";

function Post() {
  const baseUrl = "https://bdapis.vercel.app/geo/v2.0";

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    division: "",
    district: "",
    upazila: "",
    location: "",
    houseNo: "",
    category: "",
    rent: "",
    deposit: "",
    leaseTerm: "",
    availableDate: "",
    description: "",
    floor: "",
    furnished: "",
    parking: "",
    bedroom: "",
    commonBath: "",
    balcony: "",
    water: "",
    electricity: "",
    gas: "",
    security: "",
  });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // Fetch Divisions on mount
  useEffect(() => {
    fetch(`${baseUrl}/divisions`)
      .then((res) => res.json())
      .then((res) => setDivisions(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  // Handle Division change
  const handleDivisionChange = (e) => {
    const divisionId = e.target.value;
    const divisionObj = divisions.find((d) => d.id === divisionId);

    setSelectedDivision(divisionId);
    setSelectedDistrict("");
    setSelectedUpazila("");
    setDistricts([]);
    setUpazilas([]);

    setFormData((prev) => ({
      ...prev,
      division: divisionObj?.name || "",
      district: "",
      upazila: "",
    }));

    if (!divisionId) return;

    fetch(`${baseUrl}/districts/${divisionId}`)
      .then((res) => res.json())
      .then((res) => setDistricts(res.data || []))
      .catch((err) => console.error(err));
  };

  // Handle District change
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    const districtObj = districts.find((d) => d.id === districtId);

    setSelectedDistrict(districtId);
    setSelectedUpazila("");
    setUpazilas([]);

    setFormData((prev) => ({
      ...prev,
      district: districtObj?.name || "",
      upazila: "",
    }));

    if (!districtId) return;

    fetch(`${baseUrl}/upazilas/${districtId}`)
      .then((res) => res.json())
      .then((res) => setUpazilas(res.data || []))
      .catch((err) => console.error(err));
  };

  // Handle Upazila change
  const handleUpazilaChange = (e) => {
    const upazilaName = e.target.value;
    setSelectedUpazila(upazilaName);
    setFormData((prev) => ({ ...prev, upazila: upazilaName }));
  };

  // Handle image upload (max 4)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files].slice(0, 4));
  };

  // Handle text/select change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) {
      alert("User not logged in");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    images.forEach((img) => data.append("images", img));
    data.append("userId", user._id);

    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      alert("Post submitted for admin approval");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-10">
      <form onSubmit={handleSubmit} style={styles.container}>
        {/* IMAGE UPLOAD */}
        <div style={styles.grid}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={styles.slot}>
              {images[i] ? (
                <img
                  src={URL.createObjectURL(images[i])}
                  alt="preview"
                  style={styles.preview}
                />
              ) : (
                <label style={styles.placeholder}>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                  <span style={styles.plus}>+</span>
                  Upload
                </label>
              )}
            </div>
          ))}
        </div>

        {/* FORM FIELDS */}
        <div className="flex gap-10 py-5">
          <section style={styles.section}>
            <h3>Card Details</h3>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
            />

            {/* Division */}
            <select
              value={selectedDivision}
              onChange={handleDivisionChange}
              style={styles.input}
            >
              <option value="">Select Division</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* District */}
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!districts.length}
              style={styles.input}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Upazila */}
            <select
              value={selectedUpazila}
              onChange={handleUpazilaChange}
              disabled={!upazilas.length}
              style={styles.input}
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>

            <input
              name="location"
              placeholder="Location Details"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="houseNo"
              placeholder="House No"
              value={formData.houseNo}
              onChange={handleChange}
              style={styles.input}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">House Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
              <option value="hostel">Hostel</option>
              <option value="duplex">Duplex</option>
              <option value="studio">Studio Apartment</option>
              <option value="commercial">Commercial Space</option>
              <option value="showroom">Showroom</option>
              <option value="shop">Shop</option>
            </select>
          </section>

          {/* RENTAL DETAILS */}
          <section style={styles.section}>
            <h3>Rental Details</h3>
            <input
              name="rent"
              placeholder="Monthly Rent"
              value={formData.rent}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="deposit"
              placeholder="Deposit"
              value={formData.deposit}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="leaseTerm"
              placeholder="Lease Term"
              value={formData.leaseTerm}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="availableDate"
              placeholder="Available Date"
              value={formData.availableDate}
              onChange={handleChange}
              style={styles.input}
            />
          </section>
        </div>

        {/* HOUSE FEATURES */}
        <div className="flex gap-10 py-5">
          <section style={styles.section}>
            <h3>House Details</h3>
            <input
              name="floor"
              placeholder="Floor"
              value={formData.floor}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="bedroom"
              placeholder="Bedroom"
              value={formData.bedroom}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="commonBath"
              placeholder="Common Bath"
              value={formData.commonBath}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="balcony"
              placeholder="Balcony"
              value={formData.balcony}
              onChange={handleChange}
              style={styles.input}
            />

            <select
              name="furnished"
              value={formData.furnished}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Furnished</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select
              name="parking"
              value={formData.parking}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Parking</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </section>

          <section style={styles.section}>
            <h3>Utilities</h3>
            {["water", "electricity", "gas", "security"].map((item) => (
              <select
                key={item}
                name={item}
                value={formData[item]}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">{item.toUpperCase()}</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            ))}
          </section>
        </div>

        <button type="submit" style={styles.button}>
          POST
        </button>
      </form>
    </div>
  );
}

export default Post;

const styles = {
  container: {
    maxWidth: "100%",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #0988E3",
    borderRadius: "6px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },
  slot: {
    height: "90px",
    border: "1px dashed #ddd",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  placeholder: {
    textAlign: "center",
    color: "#999",
    fontSize: "12px",
    paddingTop: "15px",
  },
  plus: {
    fontSize: "24px",
    display: "block",
    lineHeight: "1",
  },
  preview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    marginTop: "8px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "12px",
  },
};
