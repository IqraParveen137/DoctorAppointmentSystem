import React, { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../Api/API';
import { NavLink, useNavigate } from 'react-router';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [degree, setDegree] = useState('');
  const [fees, setFees] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState(null);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !password ||
      !image ||
      !speciality ||
      !experience ||
      !degree ||
      !fees ||
      !gender ||
      !address ||
      !phone ||
      !dob
    ) {
      return toast.error('Please Provide All Fields');
    }
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('degree', degree);
      formData.append('fees', fees);
      formData.append('gender', gender);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('speciality', speciality);
      formData.append('experience', experience);
      formData.append('dob', dob);

      if (image) {
        formData.append('image', image);
      }

      const res = await API.post('/doctor/signup', formData);

      console.log(res.data);

      if (res.data.success) {
        alert('Doctor Registered Successfully');
        navigate('/doctor-login');
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || 'Registration Failed');
    }
  };
  return (
    <div className='container mt-5'>
      <h2>Doctor Register</h2>

      <input
        className='form-control mb-2'
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Email'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className='form-control mb-2'
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className='form-control mb-2'
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
      >
        <option value=''>Select Degree</option>
        <option value='MBBS'>MBBS</option>
        <option value='BDS'>BDS</option>
        <option value='FCPS'>FCPS</option>
        <option value='MD'>MD</option>
        <option value='MS'>MS</option>
        <option value='MRCP'>MRCP</option>
        <option value='FRCS'>FRCS</option>
        <option value='DPT'>DPT</option>
        <option value='Pharm-D'>Pharm-D</option>
        <option value='MPhil'>MPhil</option>
        <option value='Other'>Other</option>
      </select>

      <select
        className='form-control mb-2'
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
      >
        <option value=''>Select Speciality</option>
        <option>General Physician</option>
        <option>Cardiologist</option>
        <option>Dermatologist</option>
        <option>Dentist</option>
        <option>Gynecologist</option>
        <option>Pediatrician</option>
        <option>Neurologist</option>
        <option>Psychiatrist</option>
        <option>Orthopedic</option>
        <option>Ophthalmologist</option>
        <option>ENT Specialist</option>
        <option>Urologist</option>
        <option>Gastroenterologist</option>
        <option>Pulmonologist</option>
        <option>Endocrinologist</option>
        <option>Nephrologist</option>
        <option>Oncologist</option>
        <option>General Surgeon</option>
        <option>Radiologist</option>
        <option>Anesthesiologist</option>
      </select>

      <input
        className='form-control mb-2'
        placeholder='Experience in years'
        value={experience}
        onChange={(e) => {
          if (/^\d{0,2}$/.test(e.target.value)) {
            setExperience(e.target.value);
          }
        }}
      />

      <input
        className='form-control mb-2'
        placeholder='Fee in Rs'
        value={fees}
        onChange={(e) => {
          if (/^\d{0,4}$/.test(e.target.value)) {
            setFees(e.target.value);
          }
        }}
      />
      <input
        className='form-control mb-2'
        placeholder='phone'
        value={phone}
        onChange={(e) => {
          if (/^\d{0,11}$/.test(e.target.value)) {
            setP(e.target.value);
          }
        }}
      />

      <input
        className='form-control mb-2'
        placeholder='Address'
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        className='form-control mb-2'
        type='date'
        onChange={(e) => setDob(e.target.value)}
      />

      <input
        className='form-control mb-2'
        type='file'
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className='btn btn-success' onClick={handleRegister}>
        Register
      </button>

      <p className='mt-3'>
        Already have an account?
        <NavLink to='/doctor-login'>Login</NavLink>
      </p>
    </div>
  );
};

export default DoctorRegister;
