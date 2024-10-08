import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../context/auth";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
                if (res.data.ok) {
                    setOk(true);
                    console.log(res.data.ok)
                }
                else {
                    setOk(false);
                }
            }
            catch (error) {
                console.log("Authorization failed", error);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />
}