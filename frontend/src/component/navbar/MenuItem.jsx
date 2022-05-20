import React from 'react'
import {Link} from 'react-router-dom';
import {motion} from "framer-motion"
import {MdOutlineDashboard} from 'react-icons/md'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {BsCardList} from 'react-icons/bs'
import {SiInfluxdb} from 'react-icons/si'
import {IoRocketOutline} from 'react-icons/io5'

const variants ={
    open: {
        y: 0,
        paddingLeft:"25px",
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 }
        }
      },
      closed: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 }
        }
      }
}
const colors = ["white"];
const links = ["Tableau de bord", "Clients", "Prestation", "FLux de production","Facturation"];
const path = ["/","/client","/prestation","/order","/facturation"]
const icons =[<MdOutlineDashboard/>, <AiOutlineUserAdd/>, <BsCardList/>, <SiInfluxdb/>, <IoRocketOutline/>]
export const MenuItem = ({i,toggle}) => {
    const style = { border: `1px solid ${colors}` };
    const styleText = {color:"white"}
    const text = links[i];
    const icon = icons[i];
    const paths = path[i];
    return (
        <>
        <motion.li className="menu-link"
        variants={variants}
        background="red"
        whileHover={{ scale: 1.1 , background:"purple"}}
        whileTap={{ scale: 0.95 }}
        >
        <div className="icon-placeholder" style={style} >{icon}</div>
        <div className="text-placeholder" style={styleText} ><Link onClick={toggle}className="a-link" to={`${paths}`}>{text}</Link></div>
      </motion.li>
        </>
    
    );
  };

