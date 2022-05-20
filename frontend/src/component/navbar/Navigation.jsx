import React from 'react'
import {motion} from "framer-motion"
import {MenuItem} from "./MenuItem";
import Logo from '../../image/logo-crm-smile-color.png'

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
      },
      closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
      }
};
const variantText = {
    open: {
        opacity :1,
        color:"white"
    },
    closed:{
        opacity:0,
        color:"transparent"
    }
}
export const Navigation = ({toggle,open}) => {
    return(
        <>
        <motion.ul className={open?"nav-open":"nav-close"} variants={variants}>
        <motion.img className='logo-nav-verti' variants={variantText} src={Logo}/>
{itemIds.map(i => (
  <MenuItem i={i} key={i} toggle={toggle}/>
))}
</motion.ul>

        </>
    )
}
   


const itemIds = [0, 1, 2, 3, 4];