// src/components/Login.js

import React, {
  useState
} from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react';
import authService from '../Context/AuthContext';
import ColorModeSwitcher from '../Components/ColorModeSwitcher';

const Login = () => {
  const [email,
    setEmail] = useState('');
  const [password,
    setPassword] = useState('');
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const boxPadding = useBreakpointValue( {
    base: '4', md: '6'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      toast( {
        title: 'Login successful', status: 'success', duration: 3000, position: 'top'
      });
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      toast( {
        title: 'Error logging in', description: error.response.data.message, status: 'error', duration: 3000
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10" p={boxPadding} boxShadow="lg" rounded="md" bg={bgColor} color={textColor}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Heading mb="6">Login</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;