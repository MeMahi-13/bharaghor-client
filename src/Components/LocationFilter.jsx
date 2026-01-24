import { useEffect, useState } from "react";

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
      <select value={selectedDivision} onChange={handleDivisionChange} style={styles.select}>
        <option value="">Division</option>
        {divisions.map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>

      <select
        value={selectedDistrict}
        onChange={handleDistrictChange}
        disabled={!districts.length}
        style={styles.select}
      >
        <option value="">District</option>
        {districts.map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>

      <select
        value={selectedUpazila}
        onChange={(e) => setSelectedUpazila(e.target.value)}
        disabled={!upazilas.length}
        style={styles.select}
      >
        <option value="">Thana</option>
        {upazilas.map((u) => (
          <option key={u.id} value={u.name}>{u.name}</option>
        ))}
      </select>
    </div>
  );
};

export default LocationFilter;

const styles = {
  select: {
    flex: 1,
    height: "40px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
};
