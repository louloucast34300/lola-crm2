import * as React from "react";
import { useRef } from "react";
import { motion, useCycle} from "framer-motion";
import { useDimensions } from "./use-dimension";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import NavbarHori from './NavbarHori';
import '../../css/navbar.css';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const Navbar = (props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
    <motion.div
    initial={false}
    animate={isOpen ? "open": "closed"}
    custom={height}
    ref={containerRef}>
        <NavbarHori delete={props.delete} lastname={props.user.lastname} username={props.user.username}/>
    </motion.div>
    
     <motion.nav className="navBar"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={isOpen?"background open": "background"} variants={sidebar} />
      <Navigation toggle={() => toggleOpen()} open={isOpen}/>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
    </>
   
  );
};