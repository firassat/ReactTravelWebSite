import React, { useState, useEffect, useRef } from 'react';
// import Pro from './li';
import { Link , useNavigate} from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { border, height } from '@mui/system';
import Avatar from 'react-avatar-edit';
import { Button } from 'react-bootstrap';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import img from './profile.png';
import './pro.css';
// import { useForm } from "react-hook-form";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fontawesome/fontawesome-free/css/all.min.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBInput,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

const Profile = () => {
  

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const [attData, setAttData] = useState(null);
  const [showAttModal, setShowAttModal] = useState(false);
  const toggleShowAttModal = () => setShowAttModal(!showAttModal);

  const [resData, setResData] = useState(null);
  const [showResModal, setShowResModal] = useState(false);
  const toggleShowResModal = () => setShowResModal(!showResModal);

  const [showEditModal, setShowEditModal] = useState(false);
  const toggleShowEditModal = () => setShowEditModal(!showEditModal);
  const [editFirstNameRef, setEditFirstNameRef] = useState();
  const [editLastNameRef, setEditLastNameRef] = useState();
  const [editPhoneNumberRef, setPhoneNumberRef] = useState();

  const navigate = useNavigate();

  const handleEdit = async (data) => {

    const formData = new FormData();
    formData.append("first_name", editFirstNameRef);
    formData.append("last_name", editLastNameRef);
    formData.append("phone_number", editPhoneNumberRef);

     // Send data to the backend via POST
    const response = await fetch('http://127.0.0.1:8000/api/user/editProfileInfo', {  // Enter your IP address here
      method: 'POST', 
      body: formData,
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      console.log(response);
      if (!response.ok) {
				throw new Error(
				  `This is an HTTP error: The status is ${response.status}`
				);
      }

      toggleShowEditModal()
      getData()
      
  };

  const handlelogout = async () => {
    // e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/logout',  {
        method:'POST',
        headers :{
        'Authorization': `Bearer  ${token}`,
        'accept':"application/json"

      }});
      console.log(response);
      if(response.status===200){
        localStorage.removeItem('token');
        navigate('/');
      }

    }
    catch {
      
    }
    
  }
  const [showPictureModal, setShowPictureModal] = useState(false);
  const togglesShowPictureModal = () => setShowPictureModal(!showPictureModal);

  const [src, setsrc] = useState(false);
  const [picture, setPicture] = useState();
  const [pview, setpview] = useState(false);

  const onClose = () => {
    setpview(null);
  }
  const onCrop = (view) => {
    setpview(view);
  };
  const saveCropImage = () => {
    setPicture(pview);
    togglesShowPictureModal();
    updateImage();
  }

  const cancelTrip = async (id) => {

    const formData = new FormData();
    formData.append("reservation_id", id);

     // Send data to the backend via POST
    const response = await fetch('http://127.0.0.1:8000/api/trip/cancellingReservation', {  // Enter your IP address here
      method: 'POST', 
      body: formData,
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      console.log(response);
     
      let actualData = await response.json();
      
      if(actualData.success)
      {
        alert(actualData.data)
      }else{
        alert(actualData.message)
      }
      
  };

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
      `http://127.0.0.1:8000/api/user/profile`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      );
      if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
      }
      let actualData = await response.json();
      console.log(actualData);
      setEditFirstNameRef(actualData.data.first_name)
      setEditLastNameRef(actualData.data.last_name)
      setPhoneNumberRef(actualData.data.phone_number)
      setPicture(actualData.data.photo)
      setData(actualData);
      setError(null);
    } catch(err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }  
  }
  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
  const updateImage = async() => {
    try {
      let bf = DataURIToBlob(pview);
      const formData = new FormData();
      formData.append("image", bf, 'image.jpg')
     
      const response = await fetch(
      `http://127.0.0.1:8000/api/user/editProfilePhoto`,
      {
        method: 'POST', 
        body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      );
      console.log(await response.json());
      if (!response.ok) {
        console.log(await response.json());
      throw new Error(
        `This is an HTTP error: The status is ${await response.json()}`
      );
      }
      getAtt()
    } catch(err) {
      setError(err.message);
      setAttData(null);
    } finally {
      setLoading(false);
    }  
  }
  const removeAtt = async (id,type) => {
    try {
      const formData = new FormData();
      formData.append("section_id", id);
      formData.append("section_type", type);

      const response = await fetch(
      `http://127.0.0.1:8000/api/user/removeFromFavourites`,
      {
        method: 'POST', 
        body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      );
      if (!response.ok) {
        console.log(await response.json());
      throw new Error(
        `This is an HTTP error: The status is ${await response.json()}`
      );
      }
      getAtt()
    } catch(err) {
      setError(err.message);
      setAttData(null);
    } finally {
      setLoading(false);
    }  
  }
  const getAtt = async () => {
    try {
      const response = await fetch(
      `http://127.0.0.1:8000/api/user/getFavouriteList`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      );
      if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
      }
      let actualData = await response.json();

      setAttData(actualData);
      setError(null);
    } catch(err) {
      setError(err.message);
      setAttData(null);
    } finally {
      setLoading(false);
    }  
  }

  const getRes = async () => {
    try {
      const response = await fetch(
      `http://127.0.0.1:8000/api/user/getLastReservations`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      );
      if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
      }
      let actualData = await response.json();

      setResData(actualData);
      setError(null);
    } catch(err) {
      setError(err.message);
      setAttData(null);
    } finally {
      setLoading(false);
    }  
  }

	useEffect(() => {
		getData()
    getAtt()
    getRes()
	}, []);

  return (
    <div>
      {
        <section style={{ backgroundColor: '#eee' }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBBreadcrumbItem>
                    <a href='#'>Home </a>
                  </MDBBreadcrumbItem>
                  <a href='#'>/ User</a>

                 
                
                      <img className='im' src={img}
                        style={{ marginLeft: "900px", width: "60px" }}
                      ></img>
                   
              
                  <MDBBreadcrumbItem>
                    <a href="#">
                    </a>
                  </MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4 w-100">
                  <MDBCardBody className="text-center">

            
                  {loading && <div>Loading Profile...</div>}
                  {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                  )}
                   {!loading && data && (
                    <div>
                    <div className="d-flex justify-content-center mb-2">
                     
                      <img

                        style={{
                          width: "200px"
                          , height: "200px",
                          objectFit: "cover"
                          , border: "4px solid green",
                          borderRadius: "50%",
                        }}
                        onClick={() => togglesShowPictureModal()}
                        src=
                        {picture ? picture : ""}
                        alt=''

                      />

                  
                    </div>
                  

                   
                    <label htmlFor="" className='mt-3'>{data.data.first_name} {data.data.last_name}</label>
                    </div>
                   )}

                  </MDBCardBody>
                </MDBCard>

      
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4 w-100">
                  <MDBCardBody>
                  {loading && <div>Loading Profile...</div>}
                  {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                  )}

                  {!loading && data && (
                    <div>
                    <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>First Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data.data.first_name}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr className="w-100" />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Last Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data.data.last_name}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr className="w-100" />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data.data.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr className="w-100"/>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{data.data.phone_number}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  </div>)}
                    
                  </MDBCardBody>
                </MDBCard>

                <MDBRow>
                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0 w-100">
                      <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">More Options</span></MDBCardText>
                        <MDBCardText onClick={toggleShowEditModal} className="mb-1" style={{ fontSize: '17px' }}> Edit Profile
                     
                            </MDBCardText>
                        

                        <MDBCardText onClick={toggleShowAttModal} className="mt-4 mb-1" style={{ fontSize: '17px' }}>Show Favorite</MDBCardText>
                        <MDBCardText onClick={toggleShowResModal} className="mt-4 mb-1" style={{ fontSize: '17px' }}>Show Last Reservation</MDBCardText>


                        <MDBCardText onClick={handlelogout} className="mt-4 mb-1" style={{ fontSize: '17px' }}>Logout</MDBCardText>
                      

              
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          { attData &&
          <MDBModal show={showAttModal} setShow={setShowAttModal} tabIndex='-1'>
            <MDBModalDialog size='fullscreen'>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Yout Favorite List</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleShowAttModal}></MDBBtn>
                </MDBModalHeader>
            
                  <MDBModalBody>
                    <MDBCardText className='fs-4 fw-bold'>Attractions</MDBCardText>
                    <MDBRow className='mb-3'>
                      { attData &&
                        attData.attractions.map(data => (
                        <MDBCol lg={3}>
                          <MDBCard shadow='0' className='w-100'>
                            <MDBCardImage src={data.photo.path} position='top'  className="square rounded" />
                            <MDBCardBody className='px-0 py-1'>
                              <MDBCardTitle className="text-start fw-bold">{data.name}</MDBCardTitle>
                              <MDBCardText>
                                {Array.from({ length: data.rate }, (value, key) => (
                                  <span className="rate-bullet border border-1 border-success bg-success rounded-circle  me-1"></span>
                                ))}
                                {Array.from({ length: 5 - data.rate }, (value, key) => (
                                  <span className="rate-bullet border border-1 border-success rounded-circle  me-1"></span>
                                ))}
                                <span className="subtitle ms-1">{data.num_of_ratings} reviews</span>
                              </MDBCardText>
                              <MDBBtn onClick={() => removeAtt(data.id,1)} className='btn-danger'>Remove</MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                        ))}
                    </MDBRow>
                    <hr/>
                    <MDBCardText  className='fs-4 fw-bold'>Trips</MDBCardText>
                    <MDBRow>
                  
                      { attData &&
                        attData.trips.map(data => (
                        <MDBCol lg={3}>
                          <MDBCard className='w-100' shadow='0'>
                            <MDBCardImage src={data.photo.path} position='top'  className="square rounded" />
                            <MDBCardBody className='px-0 py-1'>
                              <MDBCardTitle className="text-start fw-bold">{data.description}</MDBCardTitle>
                              <MDBCardText>
                                {Array.from({ length: data.rate }, (value, key) => (
                                  <span className="rate-bullet border border-1 border-success bg-success rounded-circle  me-1"></span>
                                ))}
                                {Array.from({ length: 5 - data.rate }, (value, key) => (
                                  <span className="rate-bullet border border-1 border-success rounded-circle  me-1"></span>
                                ))}
                                <span className="subtitle ms-1">{data.num_of_ratings} reviews</span>
                                <p>{data.destination.name}, <span className='fw-bold'>{data.destination.country.name}</span></p>
                              </MDBCardText>
                            
                              <MDBBtn onClick={() => removeAtt(data.id,0)} className='btn-danger'>Remove</MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        
                        </MDBCol>
                    
                        ))}
                      
                     
                    </MDBRow>
                    <hr/>
                    <MDBCardText className='fs-4 fw-bold'>Hotels</MDBCardText>
                    <MDBRow>
                  
                      { attData &&
                        attData.hotels.map(data => (
                        
                        <MDBCol lg={3}>
                          <MDBCard  className='w-100' shadow='0'>
                            <MDBCardImage src={data.photo[0].path} position='top'  className="square rounded" />
                            <MDBCardBody className='px-0 py-1'>
                              <MDBCardTitle className="text-start fw-bold">{data.name}</MDBCardTitle>
                              <MDBCardText>
                                {Array.from({ length: data.rate }, (value, key) => (
                                  <span className="rate-bullet border border-1 border-success bg-success rounded-circle  me-1"></span>
                                ))}
                                {Array.from({ length: 5 - data.rate }, (value, key) => (
                                  <span className="rate-bullet border border-1 border-success rounded-circle  me-1"></span>
                                ))}
                                <span className="subtitle ms-1">{data.num_of_ratings} reviews</span>
                                <p>{data.city.name}, <span className='fw-bold'>{data.city.country.name}</span></p>
                              </MDBCardText>
                            
                              <MDBBtn onClick={() => removeAtt(data.id,2)} className='btn-danger'>Remove</MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                         
                        </MDBCol>
                    
                        ))}
                      
                     
                    </MDBRow>
                    <hr/>
                    <MDBCardText className='fs-4 fw-bold'>Flights</MDBCardText>
                    <MDBRow>
                  
                      { attData &&
                        attData.flights.map(data => (
                        <MDBCol lg={3}>
                          <MDBCard  className='w-100' shadow='0'>
                            <MDBCardImage src={data.airline_photo} position='top'  className="square rounded" />
                            <MDBCardBody className='px-0 py-1'>
                              <MDBCardTitle className="text-start fw-bold"><span className='fw-normal'>from</span> {data.from} <span className='fw-normal'>to</span> {data.to}</MDBCardTitle>
                              <MDBCardText>
                               
                                <p>{data.airline_name}, <span className='fw-bold'>{data.From_hour} : {data.To_hour}</span></p>
                              </MDBCardText>
                            
                              <MDBBtn onClick={() => removeAtt(data.id,3)} className='btn-danger'>Remove</MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                        
                        </MDBCol>
                    
                        ))}
                      
                     
                    </MDBRow>
                     
                  </MDBModalBody>

            
             
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          }

          { resData &&
          <MDBModal show={showResModal} setShow={setShowResModal} tabIndex='-1'>
            <MDBModalDialog size='fullscreen'>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Your Last Reservations</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleShowResModal}></MDBBtn>
                </MDBModalHeader>
            
                  <MDBModalBody>
                    <MDBCardText>Attractions</MDBCardText>
                    <MDBRow>
                  
                      { resData &&
                        resData.attractions.map(data => (
                        <MDBCol lg={6}>
                           <MDBCard  shadow='0' className='mb-3 w-100'>
                            <MDBRow>
                              <MDBCol lg={4}>
                                <MDBCardImage src={data.photo.path} position='top'  className="square rounded" />
                              </MDBCol>
                              <MDBCol lg={8}>
                                <MDBCardBody className='px-0 py-1'>
                                  <MDBCardTitle className="text-start fw-bold">{data.name}</MDBCardTitle>
                                  <MDBCardText>
                                    {Array.from({ length: data.rate }, (value, key) => (
                                      <span className="rate-bullet border border-1 border-success bg-success rounded-circle  me-1"></span>
                                    ))}
                                    {Array.from({ length: 5 - data.rate }, (value, key) => (
                                      <span className="rate-bullet border border-1 border-success rounded-circle  me-1"></span>
                                    ))}
                                    <span className="subtitle ms-1">{data.num_of_ratings} reviews</span>
                                    <p className='m-0'>Book Date: <span className='fw-bold'>{data.book_date}</span></p>
                                    <p>Payment: <span className='fw-bold'>{data.payment} SYP</span></p>
                                  </MDBCardText>
                                 </MDBCardBody>
                              </MDBCol>
                            </MDBRow>  
                          </MDBCard>
                        
                        </MDBCol>
                    
                        ))}
                      
                     
                    </MDBRow>
                    <MDBCardText>Trips</MDBCardText>
                    <MDBRow>
                  
                      { resData &&
                        resData.trips.map(data => (
                          <MDBCol lg={6}>
                          <MDBCard  shadow='0' className='mb-3 w-100'>
                           <MDBRow>
                             <MDBCol lg={4}>
                               <MDBCardImage src={data.photo.path} position='top'  className="square rounded" />
                             </MDBCol>
                             <MDBCol lg={8}>
                               <MDBCardBody className='px-0 py-1'>
                                 <MDBCardTitle className="text-start fw-bold">{data.description} ,<span className='fw-normal'>{data.days_number} Days</span></MDBCardTitle>
                                 <MDBCardText>
                                   {Array.from({ length: data.rate }, (value, key) => (
                                     <span className="rate-bullet border border-1 border-success bg-success rounded-circle  me-1"></span>
                                   ))}
                                   {Array.from({ length: 5 - data.rate }, (value, key) => (
                                     <span className="rate-bullet border border-1 border-success rounded-circle  me-1"></span>
                                   ))}
                                   <span className="subtitle ms-1">{data.num_of_ratings} reviews</span>
                                   <p className='m-0'>Book Date: <span className='fw-bold'>{data.departure_date}</span></p>
                                   <p>Payment: <span className='fw-bold'>{data.money_spent} SYP</span></p>
                                 </MDBCardText>
                                 <MDBBtn onClick={() => cancelTrip(data.reservation_id)} className='btn-danger'>Cancel</MDBBtn>
                                </MDBCardBody>
                             </MDBCol>
                           </MDBRow>  
                         </MDBCard>
                       
                       </MDBCol>
                    
                        ))}
                      
                     
                    </MDBRow>

                    <MDBCardText>Hotels</MDBCardText>
                    <MDBRow>
                  
                      { resData &&
                        resData.rooms.map(data => (
                          <MDBCol lg={6}>
                          <MDBCard  shadow='0' className='mb-3 w-100'>
                           <MDBRow>
                             <MDBCol lg={4}>
                               <MDBCardImage src={data.photo.path} position='top'  className="square rounded" />
                             </MDBCol>
                             <MDBCol lg={8}>
                               <MDBCardBody className='px-0 py-1'>
                                 <MDBCardTitle className="text-start fw-bold">{data.hotel.name}</MDBCardTitle>
                                 <MDBCardText>
                                  <p className='m-0'>Number Of Adults: <span className='fw-bold'>{data.num_of_adults}</span>, Number Of Children: <span className='fw-bold'>{data.num_of_children}</span></p>
                                   <p className='m-0'>Check In: <span className='fw-bold'>{data.check_in}</span>, Check Out: <span className='fw-bold'>{data.check_out}</span></p>
                                   <p>Payment: <span className='fw-bold'>{data.price} SYP</span></p>
                                 </MDBCardText>
                                
                                </MDBCardBody>
                              </MDBCol>
                              </MDBRow>
                              </MDBCard>
                              </MDBCol>
                        ))}
                      
                     
                    </MDBRow>

                    <MDBCardText>Flights</MDBCardText>
                    <MDBRow>
                  
                      { resData &&
                        resData.flights.map(data => (
                    
              
                          <MDBCol lg={6}>
                          <MDBCard shadow='0' className='mb-3 w-100'>
                           <MDBRow>
                             <MDBCol lg={4}>
                               <MDBCardImage src={data.airline_photo} position='top'  className="square rounded" />
                             </MDBCol>
                             <MDBCol lg={8}>
                               <MDBCardBody className='px-0 py-1'>
                               <MDBCardTitle className="text-start fw-bold"><span className='fw-normal'>from</span> {data.from} <span className='fw-normal'>to</span> {data.to}, {data.departe_day}</MDBCardTitle>
                               <MDBCardText>
                               <p className='m-0'>{data.airline_name}, <span className='fw-bold'>{data.From_hour} : {data.To_hour}</span></p>
                                      <p>Payment: <span className='fw-bold'>{data.payment} SYP</span></p>
                                 </MDBCardText>
                                
                                </MDBCardBody>
                              </MDBCol>
                              </MDBRow>
                              </MDBCard>
                              </MDBCol>
                        ))}
                      
                     
                    </MDBRow>
                     
                  </MDBModalBody>

            
             
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          }

          { data &&
          <MDBModal show={showEditModal} setShow={setShowEditModal} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Edit Profile</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleShowEditModal}></MDBBtn>
                </MDBModalHeader>
            
                  <MDBModalBody>
                    
                      <MDBInput className='mb-3' label='First Name' id='firstname' type='text' value={editFirstNameRef} onChange={(e) => setEditFirstNameRef(e.target.value)} />
                      <MDBInput className='mb-3'  label='Last Name' id='lastname' type='text' value={editLastNameRef} onChange={(e) => setEditLastNameRef(e.target.value)} />
                      <MDBInput className='mb-3'  label='Phone' id='phone' type='number' value={editPhoneNumberRef} onChange={(e) => setPhoneNumberRef(e.target.value)} />
                
                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color='secondary' type='button' onClick={toggleShowEditModal}>
                      Close
                    </MDBBtn>
                    <MDBBtn  onClick={handleEdit}>Save changes</MDBBtn>
                  </MDBModalFooter>
             
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          }

        { data &&
          <MDBModal show={showPictureModal} setShow={setShowPictureModal} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Edit Profile</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={togglesShowPictureModal}></MDBBtn>
                </MDBModalHeader>
                  <MDBModalBody>
                    <div>
                      <Avatar
                        width={"100%"}
                        onClose={onClose}
                        height={400}
                        onCrop={onCrop}
                        src={src}
                        shadingColor={"#474649"}
                        backgroundColor={"#474649"}
                      
                      />
                  
                    </div>
                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color='secondary' type='button' onClick={togglesShowPictureModal}>
                      Close
                    </MDBBtn>
                    <MDBBtn   onClick={saveCropImage}>Save changes</MDBBtn>
                  </MDBModalFooter>
              
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          }
        </section> 
      }
      
    </div>
  );
}

export default Profile;
