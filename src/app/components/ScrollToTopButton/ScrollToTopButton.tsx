'use client';

import React, { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import ArrowUpWardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="solid"
      color="primary"
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 1000,
      }}
    >
      <ArrowUpWardIcon />
    </Button>
  );
};

export default ScrollToTopButton;
