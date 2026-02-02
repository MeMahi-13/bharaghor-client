import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`https://yessghor-server.vercel.app/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlace(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    try {
      setSaving(true);

      await fetch(`https://yessghor-server.vercel.app/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(place),
      });

      alert("Updated successfully ✅");
    } catch {
      alert("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;

  if (!place) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">No property data found.</p>
        <button
          onClick={() => navigate("/post")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* IMAGE SLIDER */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        modules={[Pagination, Autoplay]}
      >
        {place.images?.length > 0 ? (
          place.images.map((img, index) => (
            <SwiperSlide key={index} style={styles.slide}>
              <img src={img} alt="" style={styles.image} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide style={styles.slide}>
            <p>No images available</p>
          </SwiperSlide>
        )}
      </Swiper>

      {/* BASIC INFO */}
      <div className="border border-gray-300 rounded px-3 py-5 shadow mt-6">
        <h2 style={{ fontSize: "28px", fontWeight: "600" }}>
          <EditableText
            value={place.title}
            onSave={v => setPlace(p => ({ ...p, title: v }))}
          />
        </h2>

        <div className="flex justify-between gap-4 mt-2">
          <EditableRow icon={<CiLocationOn />} label="Location" value={place.location}
            onSave={v => setPlace(p => ({ ...p, location: v }))} />
          <EditableRow icon={<IoHomeOutline />} label="House No" value={place.houseNo}
            onSave={v => setPlace(p => ({ ...p, houseNo: v }))} />
          <EditableRow icon={<SlCalender />} label="Available Date" value={place.availableDate}
            onSave={v => setPlace(p => ({ ...p, availableDate: v }))} />
          <EditableRow icon={<FaBuilding />} label="Category" value={place.category}
            onSave={v => setPlace(p => ({ ...p, category: v }))} />
        </div>
      </div>

      {/* DESCRIPTION (EDITABLE) */}
      <div className="border rounded border-gray-300 px-3 py-5 shadow mt-8">
        <h2 className="font-semibold text-3xl">House Details</h2>
        <EditableTextarea
          value={place.description}
          onSave={v => setPlace(p => ({ ...p, description: v }))}
        />
      </div>

      {/* RECENT DETAILS (RENT EDITABLE) */}
      <div className="border rounded border-gray-300 px-3 py-5 shadow mt-8">
        <h2 className="font-semibold text-3xl">Recent Details</h2>
        <div className="flex gap-6 mt-6">
          <Info
            label="Rent"
            value={
              <EditableText
                value={place.rent}
                onSave={v => setPlace(p => ({ ...p, rent: v }))}
              />
            }
          />
          <Info label="Lease Term" value={place.leaseTerm} />
          <Info label="Available From" value={place.availableDate} />
        </div>
      </div>

      {/* FEATURES */}
      <div className="border rounded border-gray-300 px-3 py-5 shadow mt-8">
        <h2 className="text-2xl font-semibold">Property Features</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Feature label="Floor" value={place.floor}
            onSave={v => setPlace(p => ({ ...p, floor: v }))} />
          <Feature label="Bedroom" value={place.bedroom}
            onSave={v => setPlace(p => ({ ...p, bedroom: v }))} />
          <Feature label="Balcony" value={place.balcony}
            onSave={v => setPlace(p => ({ ...p, balcony: v }))} />
          <Feature label="Furnished" value={place.furnished} dropdown
            onSave={v => setPlace(p => ({ ...p, furnished: v }))} />
          <Feature label="Parking" value={place.parking} dropdown
            onSave={v => setPlace(p => ({ ...p, parking: v }))} />
        </div>
      </div>

      {/* UTILITIES */}
      <div className="border rounded border-gray-300 px-3 py-5 shadow mt-8">
        <h2 className="font-semibold text-3xl">Utilities & Amenities</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Feature label="Water" value={place.water} dropdown
            onSave={v => setPlace(p => ({ ...p, water: v }))} />
          <Feature label="Electricity" value={place.electricity} dropdown
            onSave={v => setPlace(p => ({ ...p, electricity: v }))} />
          <Feature label="Gas" value={place.gas} dropdown
            onSave={v => setPlace(p => ({ ...p, gas: v }))} />
          <Feature label="Security" value={place.security} dropdown
            onSave={v => setPlace(p => ({ ...p, security: v }))} />
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex items-center w-full justify-center">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-[#0988E3] border border-[#0988E3] text-white"
          style={styles.button}
        >
          {saving ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default PostDetails;

/* ---------- HELPERS ---------- */

function EditableText({ value, onSave }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(value ?? "");

  return edit ? (
    <input
      autoFocus
      value={text}
      onChange={e => setText(e.target.value)}
      onBlur={() => {
        setEdit(false);
        onSave(text);
      }}
      className="border px-1 rounded w-full"
    />
  ) : (
    <span onClick={() => setEdit(true)} className="cursor-pointer">
      {value ?? "—"}
    </span>
  );
}

function EditableTextarea({ value, onSave }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(value ?? "");

  return edit ? (
    <textarea
      autoFocus
      rows={4}
      value={text}
      onChange={e => setText(e.target.value)}
      onBlur={() => {
        setEdit(false);
        onSave(text);
      }}
      className="border p-2 rounded w-full mt-2"
    />
  ) : (
    <p onClick={() => setEdit(true)} className="cursor-pointer mt-2">
      {value ?? "—"}
    </p>
  );
}

function EditableBoolean({ value, onSave }) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <select
      autoFocus
      value={value ? "yes" : "no"}
      onChange={(e) => {
        onSave(e.target.value === "yes");
        setEdit(false);
      }}
      onBlur={() => setEdit(false)}
      className="border px-1 rounded"
    >
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  ) : (
    <span onClick={() => setEdit(true)} className="cursor-pointer">
      {value ? "Yes" : "No"}
    </span>
  );
}

function Feature({ label, value, onSave, dropdown }) {
  return (
    <div className="border flex justify-between px-3 py-2 rounded-md border-blue-300">
      <span>{label}</span>
      {dropdown
        ? <EditableBoolean value={value} onSave={onSave} />
        : <EditableText value={value} onSave={onSave} />}
    </div>
  );
}

function EditableRow({ icon, label, value, onSave }) {
  return (
    <p className="flex items-center gap-1">
      {icon}
      <label>{label}:</label>
      <EditableText value={value} onSave={onSave} />
    </p>
  );
}

function Info({ label, value }) {
  return (
    <div className="border flex justify-between rounded-md border-blue-300 px-3 py-2 w-1/3">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "100%",
    padding: "80px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  slide: {
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  button: {
    width: "409px",
    padding: "15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "12px",
    fontWeight: "500",
    fontSize: "24px",
  },
};
