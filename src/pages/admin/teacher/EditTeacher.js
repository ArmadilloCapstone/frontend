import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
const EditTeacher = () => {
   
  let history = useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  
 
  const [user ,setUser] = useState({
      name:"",
      phone_num:"",
      gender:"",
      birth_date:""
  })
 
 
  const { name, phone_num, gender, birth_date} = user;
 
  const onInputChange = e => {
    setUser({ ...user,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
   
  const updateTeacher = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/v1/employee/${id}`, user);
    history.push("/");
  };
 
  const loadUser =  () => {
    fetch(`http://localhost:5000/api/v1/employee/${id}`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
        setUser({
                    id: id,
                    update: true,
                    name: result.response[0].name,
                    phone_num: result.response[0].phone_num,
                    gender: result.response[0].gender,
                    birth_date: result.response[0].birth_date
                });
            })
            .catch((error) => console.log("error", error));
  };
 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">교사 정보 수정하기</h4>
       
          <h5 className="text-success">교사 ID : {user.id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="phone_num"
              value={phone_num}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="gender"
              value={gender}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="birth_date"
              value={birth_date}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button onClick={updateTeacher} className="btn btn-secondary btn-block">수정</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditTeacher;
