import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails } from '../../redux/actions/userActions';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);
  const { user, success, error, appointments } = useSelector(
    (state) => state.user,
  );
  //delete user
  const handleDelete = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this user?',
    );
    if (confirm) {
      dispatch(deleteUser(id));
    }
    if (success) {
      toast.success('User Deleted!');
      navigate('/all-users');
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <Layout>
      <div className='row d-flex align-item-center bg-light mt-3 p-3'>
        <div className='col-md-4'>
          <h3 className='text-center'>User Details</h3>
          {user?.image && (
            <img
              src={`data:image/jpeg;base64,${user?.image}`}
              alt='userImage'
              height={200}
              width={200}
              className='rounded-1 bg-info'
            />
          )}
        </div>
        <div className='col-md-8'>
          <h4>NAME:{user?.name}</h4>
          <h4>EMAIL:{user?.email}</h4>
          <h4>PHONE:{user?.phone || 'NA'}</h4>
          <h4>ADDRESS:{user?.address || 'NA'}</h4>
          <button
            className='btn btn-danger'
            onClick={() => handleDelete(user?._id)}
          >
            Delete User
          </button>
        </div>
      </div>
      <div>
        <h2>All Appointments</h2>
        <table className='table mt-2'>
          <thead>
            <tr>
              <th>SN</th>
              <th>DATE</th>
              <th>DOCTOR ID</th>
              <th>FEES</th>
              <th>STATUS</th>
              <th>PAYMENT METHOD</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((a, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{a?.slotDate}</td>
                <td>{a?.doctorId}</td>
                <td>{a?.amount}</td>
                <td>{a?.status}</td>
                <td>{a?.payment ? 'ONLINE' : 'CASH'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UserDetails;
