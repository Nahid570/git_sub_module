import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";

import { useGetRequest } from "../hooks/useGetRequest";
import { usePostRequest } from '../hooks/usePostRequest';
import { usePatchRequest } from "../hooks/usePatchRequest";
import { useDeleteRequest } from "../hooks/useDeleteRequest";


function Login() {
  // const testGetRequest = () => {
  //     getRequest('users').then(res=>{
  //         console.log(res);
  //     }).catch(err=>{
  //         console.log(err);
  //     });
  // }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSuccess = (data) => {
    console.log("from react query success: ", data);
    //dispatch(loginSuccess(data));
  };
  const onError = (error) => {
    console.log("from react query error: ", error.message);
  };

  const { isLoading, mutate: submitLogin } = usePostRequest(
    "auth/login",
    {
      username,
      password,
    },
    onSuccess,
    onError
  );

  // const { isLoading, refetch } = useGetRequest(
  //   "get-users",
  //   "users",
  //   onSuccess,
  //   onError
  // );

  // const { isLoading, mutate: submitUser } = usePostRequest("users", {
  //   name: "testname",
  //   email: "test@test.com",
  //   mobileNumber: "01245663985",
  //   password: "123456678",
  //   status: "active",
  // },
  // onSuccess,
  // onError
  // );

  // const { isLoading, mutate: updateUser } = usePatchRequest(
  //   "users/62a6fcd96c91bce27b0dcfd6",
  //   {
  //     name: "testname1",
  //   },
  //   onSuccess,
  //   onError
  // );

  // const { isLoading, mutate: deleteUser } = useDeleteRequest(
  //   "users/62a704fc1ffd750da2a2c2d7",
  //   onSuccess,
  //   onError
  // );

  const { isLoading: getUsersLoading, refetch: getData } = useGetRequest(
    "get-all-users",
    "users/62a0867a73e8c039b675c882",
    onSuccess,
    onError
  );
  const handleLogin = () => {

  }

  return (
    <div>
      <form style={{ marginTop: "50px" }}>
        Username:{" "}
        <input
          type="text"
          name="username"
          placeholder="Email or Mobile no"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="button" name="submit" value="Submit" onClick={getData} />
      </form>

      {/* <button name="allUsers" onClick={refetch}>
        All Users
      </button> */}
    </div>
  );
}

export default Login