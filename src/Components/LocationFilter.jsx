import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const baseUrl = "https://bdapis.vercel.app/geo/v2.0";

const LocationFilter = ({
  selectedDivision,
  selectedDistrict,
  selectedUpazila,
  setSelectedDivision,
  setSelectedDistrict,
  setSelectedUpazila,
}) => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/divisions`)
      .then((res) => res.json())
      .then((res) => setDivisions(res.data || []));
  }, []);

  const handleDivisionChange = (e) => {
    const val = e.target.value;
    setSelectedDivision(val);
    setSelectedDistrict("");
    setSelectedUpazila("");
    setDistricts([]);
    setUpazilas([]);

    if (!val) return;
    const div = divisions.find((d) => d.name === val);
    fetch(`${baseUrl}/districts/${div.id}`)
      .then((r) => r.json())
      .then((r) => setDistricts(r.data || []));
  };

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setSelectedDistrict(val);
    setSelectedUpazila("");
    setUpazilas([]);

    if (!val) return;
    const dist = districts.find((d) => d.name === val);
    fetch(`${baseUrl}/upazilas/${dist.id}`)
      .then((r) => r.json())
      .then((r) => setUpazilas(r.data || []));
  };

  return (
    <div className="mt-5 flex gap-3">
      {/* Division */}
      <SelectWrapper>
        <select
          value={selectedDivision}
          onChange={handleDivisionChange}
          style={styles.select}
        >
          <option value="">Division</option>
          {divisions.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </SelectWrapper>

      {/* District */}
      <SelectWrapper>
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!districts.length}
          style={styles.select}
        >
          <option value="">District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </SelectWrapper>

      {/* Thana */}
      <SelectWrapper>
        <select
          value={selectedUpazila}
          onChange={(e) => setSelectedUpazila(e.target.value)}
          disabled={!upazilas.length}
          style={styles.select}
        >
          <option value="">Thana</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>
      </SelectWrapper>
    </div>
  );
};

export default LocationFilter;

const SelectWrapper = ({ children }) => (
  <div style={styles.wrapper}>
    {children}
    <IoChevronDown style={styles.icon} />
  </div>
);

const styles = {
  wrapper: {
    position: "relative",
    flex: 1,
  },
  select: {
    width: "100%",
    height: "40px",
    padding: "8px 36px 8px 12px", 
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  icon: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: "18px",
    color: "#555",
  },
};
