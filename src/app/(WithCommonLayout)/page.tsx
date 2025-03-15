"use client"

import { useUser } from "@/context/UserContext";


const HomePage =() => {

  const user=useUser();
  console.log(user,'user from home page')
  return (
    <div className="text-center mx-auto mt-5">
      <h1>Welcome to E-Mart Page </h1>
    </div>
  );
};

export default HomePage;