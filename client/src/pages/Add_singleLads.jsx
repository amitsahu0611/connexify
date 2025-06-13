/** @format */

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createLead} from "../redux/slice/Lead.slice";
import TopLoader from "../components/TopLoader";
import {
  getDivisionsByWorkspace,
  getSourcesByWorkspace,
  getAllCategories,
} from "../redux/slice/dropdownSlice";

const initialData = {
  name: "",
  phone: "",
  source: "",
  workspace_id: 0,
  inhouse_division: "",
  service_categories: "",
  requirements: "",
  budget: "",
  email: "",
  alternate_phone: "",
  city_name: "",
  feedback: "",
  company_name: "",
  createdBy: 0,
};

const labelMap = {
  name: "Name",
  phone: "Phone",
  source: "Source",
  inhouse_division: "Inhouse Division",
  service_categories: "Service Categories",
  requirements: "Requirements",
  budget: "Budget",
  email: "Email",
  alternate_phone: "Alternate Phone",
  city_name: "City Name",
  feedback: "Feedback",
  company_name: "Company Name",
};

export default function Add_singleLads() {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.lead);
  const {divisions, sources, categories} = useSelector(
    (state) => state.dropdown
  );

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const workspace_id = localStorage.getItem("workspace_id");
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      const {user_id} = user;
      setFormData((prev) => ({
        ...prev,
        createdBy: user_id,
        workspace_id,
      }));

      dispatch(getDivisionsByWorkspace(workspace_id));
      dispatch(getSourcesByWorkspace(workspace_id));
      dispatch(getAllCategories(workspace_id));
    }
  }, [user, dispatch]);

  const requiredFields = ["name", "phone"];

  const validate = () => {
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = `${labelMap[field]} is required`;
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone must be a 10-digit number";
    }

    if (
      formData.alternate_phone &&
      !/^\d{10}$/.test(formData.alternate_phone.trim())
    ) {
      newErrors.alternate_phone = "Alternate phone must be a 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    setErrors((prev) => ({...prev, [name]: ""}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(createLead(formData))
      .unwrap()
      .then(() => {
        setFormData(initialData);
      })
      .catch(() => {});
  };

  const inputClass = (field) =>
    `w-full px-4 py-2 border rounded-md text-sm focus:outline-none ${
      errors[field]
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-2 focus:ring-navy-500"
    }`;

  const filteredFields = Object.keys(formData).filter((field) =>
    labelMap[field]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {loading && <TopLoader loading={loading} />}
      <span className='pl-2'>Add Single Lead</span>
      <div className='h-screen bg-gray-100'>
        <div className=' mx-auto p-8 mt-5 bg-white'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='🔍 Search lead fields (e.g. email, phone)'
              className='w-full md:w-1/2 border border-navy-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy-500 text-sm'
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className='grid grid-cols-1 md:grid-cols-2 gap-6'
          >
            {filteredFields.map((field) => (
              <div key={field}>
                <label className='block text-sm text-navy-700 mb-1'>
                  {labelMap[field]}
                  {requiredFields.includes(field) && (
                    <span className='text-red-500 ml-1'>*</span>
                  )}
                </label>

                {["source", "inhouse_division", "service_categories"].includes(
                  field
                ) ? (
                  <select
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={inputClass(field)}
                  >
                    <option value=''>Select</option>
                    {field === "source" &&
                      Array.isArray(sources) &&
                      sources.map((v, index) => (
                        <option key={index} value={v.name}>
                          {v.source_name}
                        </option>
                      ))}
                    {field === "inhouse_division" &&
                      Array.isArray(divisions) &&
                      divisions.map((v, index) => (
                        <option key={index} value={v.name}>
                          {v.division_name}
                        </option>
                      ))}
                    {field === "service_categories" &&
                      Array.isArray(categories) &&
                      categories.map((v, index) => (
                        <option key={index} value={v.name}>
                          {v.category_name}
                        </option>
                      ))}
                  </select>
                ) : field.includes("phone") ? (
                  <div className='flex items-center gap-2'>
                    <span className='text-lg'>🇮🇳</span>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`${inputClass(field)} border-yellow-500`}
                      placeholder='Enter phone number'
                    />
                  </div>
                ) : (
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={inputClass(field)}
                    placeholder={`Enter ${labelMap[field]}`}
                  />
                )}

                {errors[field] && (
                  <p className='text-sm text-red-500 mt-1'>{errors[field]}</p>
                )}
              </div>
            ))}

            <div className='md:col-span-2 pt-6 flex justify-end'>
              <button
                type='submit'
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1E75D3] hover:bg-blue-700"
                } text-white font-semibold py-2 px-6 rounded-md transition-all`}
              >
                {loading ? "Submitting..." : " Add Lead"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
