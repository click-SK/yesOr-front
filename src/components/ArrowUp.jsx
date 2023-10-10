import React, {useEffect, useState} from 'react'
import {FaArrowAltCircleUp} from 'react-icons/fa'
import  '../styles/ArrowUp.scss';

export const ArrowUp = () => {
    // const [isBool, setIsBool] = useState(false);
    // useEffect(
    //     (e) => {
    //       document.addEventListener("scroll", scrollHandller);
    
    //       return function () {
    //         document.removeEventListener("scroll", scrollHandller);
    //       };
    //     },
    //     []
    //   );

    //   const scrollHandller = (e) => {
    //     if(e.target.documentElement.scrollTop > 300) {
    //         setIsBool(true)
    //     }
    //     else{
    //         setIsBool(false)
    //     }
    //   };

    //   const scrollTop = (e) => {
    //     window.scrollTo( 0, 10 );
    //   }

    const [isBool, setIsBool] = useState(false);

    useEffect(() => {
      document.addEventListener('scroll', scrollHandller)
      return () => document.removeEventListener('scroll', scrollHandller)
    }, [])
  
    const scrollHandller = (e) => {
      if(window.scrollY > 300) {
          setIsBool(true)
      }
      else{
          setIsBool(false)
      }
    };
  
    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

      return (
        <>
        {isBool && <div className='arrow-up'>
            <button style={{background:'transparent'}} onClick={scrollTop}>
            <FaArrowAltCircleUp className='FaArrowAltCircleUp'/>
            </button>
        </div>}
        </>
      )
}