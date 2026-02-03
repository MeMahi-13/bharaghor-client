import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
function Post() {
  const baseUrl = "https://bdapis.vercel.app/geo/v2.0";
  const navigate = useNavigate();

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

  // Fetch divisions on mount
  useEffect(() => {
    fetch(`${baseUrl}/divisions`)
      .then((res) => res.json())
      .then((res) => setDivisions(res.data || []))
      .catch(console.error);
  }, []);

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
      .catch(console.error);
  };

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
      .catch(console.error);
  };

  const handleUpazilaChange = (e) => {
    const upazilaName = e.target.value;
    setSelectedUpazila(upazilaName);
    setFormData((prev) => ({ ...prev, upazila: upazilaName }));
  };

  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setImages((prev) => [...prev, ...files]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) return alert("User not logged in");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    images.forEach((img) => data.append("images", img));
    data.append("userId", user._id);

    try {
      const res = await fetch("https://yessghor-server.vercel.app/posts", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        alert("Post submitted for admin approval");
        navigate("/");
      } else {
        alert("Failed to submit post");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-10">
      <form onSubmit={handleSubmit} style={styles.container}>
        {/* IMAGE UPLOAD */}
       <div style={styles.uploadBox}>
  <label style={styles.placeholder}>
    <input
      type="file"
      accept="image/*"
      multiple
      hidden
      onChange={handleImageChange}
    />
     <BsUpload style={styles.uploadIcon} />
    <p className="font-semibold text-[#1E293B] text-lg">Click to upload or drag and drop</p>
    <small className="font-normal text-[#64748B]">PNG, JPG, JPEG or WebP (Max 10MB per file)</small>
  </label>
</div>

{/* Image previews */}
{images.length > 0 && (
  <div style={styles.previewGrid}>
    {images.map((img, index) => (
      <img
        key={index}
        src={URL.createObjectURL(img)}
        alt="preview"
        style={styles.preview}
      />
    ))}
  </div>
)}


        {/* FORM FIELDS */}
        <div className=" py-5">
          {/* Card Details */}
          <section style={styles.section}>
            <h3 className="font-semibold text-3xl text-[#101828] leading-8 mb-5">Card Details</h3>
            <div className="flex gap-3 items-center">
               <div className="flex-1">
              <label htmlFor="" className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
            />
            </div>
           <div className="flex-1">
              <label htmlFor="" className="block text-sm font-medium mb-1">Phone</label>
             <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
            </div>
            <div className="flex-1">
              <label htmlFor="" className="block text-sm font-medium mb-1">Category</label>
             <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select an option</option>
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
            </div>
            </div>
           <div className="flex-1">
            <label htmlFor="" className="block text-sm font-medium mb-1">Location</label>
            <input
              name="location"
              placeholder="Description of location"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
            />
           </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="block text-sm font-medium mb-1">
                <label htmlFor="" className="block text-sm font-medium mb-1">Division</label>
                <select
              value={selectedDivision}
              onChange={handleDivisionChange}
              style={styles.input}
            >
              <option value="">Select an option</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
              </div>
<div className="block text-sm font-medium mb-1">
  <label htmlFor="" className="block text-sm font-medium mb-1">District</label>
  <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!districts.length}
              style={styles.input}
            >
              <option value="">Select an option</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
</div>
<div className="block text-sm font-medium mb-1"           >
  <label htmlFor="" className="block text-sm font-medium mb-1">Thana</label>
    <select
              value={selectedUpazila}
              onChange={handleUpazilaChange}
              disabled={!upazilas.length}
              style={styles.input}
            >
              <option value="">Select an option</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
</div>
<div className="block text-sm font-medium mb-1">
    <label htmlFor="" className="block text-sm font-medium mb-1">House No</label>
     <input
              name="houseNo"
              placeholder="House No"
              value={formData.houseNo}
              onChange={handleChange}
              style={styles.input}
            />
            
  </div>
             </div>
            
        
    <div>
      </div>       
           <div>
            <label htmlFor="" style={styles.label}>House Details & Features</label>
           
            <textarea
              name="description"
              placeholder="Description....."
              value={formData.description}
              onChange={handleChange}
              style={{ ...styles.input, minHeight: "80px" }}
            />
           </div>
          </section>

          {/* RENTAL DETAILS */}
          <section className="mt-[48px]">
  <h3 className="font-semibold text-3xl text-[#101828] leading-8 mb-5">
    Rental Details
  </h3>

  {/* 3-column grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <label  className="block text-sm font-medium mb-1">
        Monthly Rent
      </label>
      <input
        name="rent"
        placeholder="Write your monthly rent"
        value={formData.rent}
        onChange={handleChange}
        className="w-full border border-[#0988E3] rounded-md px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        Security Deposit
      </label>
      <input
        name="deposit"
        placeholder="Amount required as a security deposit"
        value={formData.deposit}
        onChange={handleChange}
        className="w-full border border-[#0988E3] rounded-md px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        Available Date
      </label>
      <input
        name="availableDate"
        placeholder="Available Date"
        value={formData.availableDate}
        onChange={handleChange}
        className="w-full border border-[#0988E3] rounded-md px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        Lease Term
      </label>
      <input
        name="leaseTerm"
        placeholder="Lease Term"
        value={formData.leaseTerm}
        onChange={handleChange}
        className="w-full border border-[#0988E3] rounded-md px-3 py-2"
      />
    </div>
  </div>

  {/* Full width textarea */}
  <div className="mt-4">
    <label className="block text-sm font-medium mb-1">
      Description
    </label>
    <textarea
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
      className="w-full border border-[#0988E3] rounded-md px-3 py-2 min-h-[100px]"
    />
  </div>
</section>

        </div>

        {/*Property Features */}
       
         <section className="mt-[88px]">
  <h3 className="font-semibold text-3xl text-[#101828] leading-8 mb-5">
    Property Features
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input
      name="floor"
      placeholder="Floor"
      value={formData.floor}
      onChange={handleChange}
      className="w-full border border-[#0988E3] rounded-md px-3 py-2"
    />

    <input
      name="bedroom"
      placeholder="Bedroom"
      value={formData.bedroom}
      onChange={handleChange}
      className="w-full border border-[#0988E3] rounded-md px-3 py-2"
    />
     <input
      name="attatchedbathroom"
      placeholder="Attatched Bathroom"
      value={formData.bedroom}
      onChange={handleChange}
      className="w-full border border-[#0988E3] rounded-md px-3 py-2"
    />

    <input
      name="commonBath"
      placeholder="Common Bath"
      value={formData.commonBath}
      onChange={handleChange}
      className="w-full border border-[#0988E3] rounded-md px-3 py-2"
    />
<select
      name="furnished"
      value={formData.furnished}
      onChange={handleChange}
      className="w-full border border-[#0988E3] rounded-md px-3 py-2 bg-white"
    >
      <option value="">Furnished</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
    <input
      name="balcony"
      placeholder="Balcony"
      value={formData.balcony}
      onChange={handleChange}
      className="w-full border border-[#0988E3] rounded-md px-3 py-2"
    />

    

    <select
      name="parking"
      value={formData.parking}
      onChange={handleChange}
      className="w-full border border-[#0988E3] rounded-md px-3 py-2 bg-white"
    >
      <option value="">Parking</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>
</section>

          {/*  Utilities & Amenities */}
          <section className="mt-[47px]">
  <h3 className="font-semibold text-3xl text-[#101828] leading-8 mb-5">
    Utilities & Amenities
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {["water", "electricity", "gas", "security"].map((item) => (
      <select
        key={item}
        name={item}
        value={formData[item]}
        onChange={handleChange}
        className="w-full border border-[#0988E3] rounded-md px-3 py-2 bg-white"
      >
        <option value="">
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    ))}
  </div>
</section>

 <div className="w-full flex justify-center mt-[71px]">
  <div className="flex items-center gap-6">
    <button className="bg-[#0988E3] border-solid border border-[#0988E3] text-[#FFFFFF]" type="submit" style={styles.button}>
      Post
    </button>
    <button className="text-[#0988E3] border-solid border border-[#0988E3]" type="button" style={styles.button}>
      Cancel
    </button>
  </div>
</div>

       
      </form>
    </div>
  );
}

export default Post;

// STYLES
const styles = {
  container: {
    maxWidth: "100%",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "10px",
  },
  label:{
fontWeight:"600",
fontSize:"20px",
color:"#101828",
lineHeight:"120%",
paddingBottom:"8px",
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
    display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", 
  textAlign: "center",
  color: "#667085",
  cursor: "pointer",
  height: "100%", 
  },
  plus: {
     fontSize: "36px",
  lineHeight: "1",
  display: "block",
  marginBottom: "6px",
  },
  preview: {
   width: "100%",
  height: "120px",
  objectFit: "cover",
  borderRadius: "6px",
  border: "1px solid #ddd",
  },
  section: {
    //display: "flex",
    //flexDirection: "column",
    //flex: 1,
  },
  button: {
    width: "409px",
    padding: "20px 20px",
    
    
    
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "12px",
    fontWeight:"500",
    fontSize:"24px",
  },
  uploadBox: {
  width: "100%",
  height: "140px",
  border: "2px solid #E2E8F0",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginBottom: "20px",
},
previewGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  gap: "10px",
},
uploadIcon: {
  fontSize: "36px",
  color: "#0988E3",
  marginBottom: "8px",
},
};
