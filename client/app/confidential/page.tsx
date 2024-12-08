"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Confidential() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchResource = async () => {
      console.log(Cookies.get("authjs.session-token"));

      try {
        const res = await axios.get("http://localhost:5000/auth/resource", {
          withCredentials: true,
        });

        setMessage(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResource();
  }, []);

  return <div>{message}</div>;
}
