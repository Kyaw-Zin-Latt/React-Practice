import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div class="navbar bg-primary text-primary-content">
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal p-0">
                    <li>
                        <NavLink className={({isActive}) => isActive ? 'text-red-500' : '' } to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? 'text-red-500' : '' } to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? 'text-red-500' : '' } to="/search">Search</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar