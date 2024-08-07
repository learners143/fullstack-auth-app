// src/components/ColorModeSwitcher.js

import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === 'dark' ? <FaSun /> : <FaMoon />;

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={icon}
      aria-label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
      {...props}
    />
  );
};

export default ColorModeSwitcher;
