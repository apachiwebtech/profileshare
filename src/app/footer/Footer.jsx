import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div>

            <div className="tags-sec full-width">
                <ul>
                    <li><Link href="#" title="">About</Link></li>
                    <li><Link href="#" title="">Privacy Policy</Link></li>
                    <li><Link href="#" title="">Cookies Policy</Link></li>
                    <li><Link href="#" title="">Copyright Policy</Link></li>
                </ul>
                <div className="cp-sec">
                    <img src="images/logo2.png" alt="" />
                    <p><img src="images/cp.png" alt="" />Copyright 2023</p>
                </div>
            </div>
        </div>
    )
}

export default Footer