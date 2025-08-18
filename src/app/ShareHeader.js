"use client"
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import logo from '../../src/app/images/whitelogo.png'
import { useDispatch, useSelector } from "react-redux";
import { getProfiledata } from "./store/ProdataAction";
import Image from 'next/image';

const ShareHeader = () => {

    const [show, setShow] = useState(false)

    const prodata = useSelector((state) => state.ProData?.profiledata);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfiledata())
    }, [dispatch])

    return (
        <header>
            <div className="container">
                <div className="header-data row justify-content-between py-2 align-items-center">
                    <div className="logo col-lg-2">
                        <Image style={{height:'50px'}} src={logo} alt="Logo"  />
                    </div>
                    <div className="d-flex col-lg-3">
                       <button className="btn btn-light mx-2">Login</button>
                      <button className="btn btn-light mx-2">Register</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default ShareHeader
