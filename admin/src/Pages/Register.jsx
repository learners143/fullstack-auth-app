// src/components/Register.js

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

const Register = () => {
  const [name,
    setName] = useState('');
  const [email,
    setEmail] = useState('');
  const [password,
    setPassword] = useState('');
  const [confirmPassword,
    setConfirmPassword] = useState('');
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const boxPadding = useBreakpointValue({ base: '4', md: '6' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast( {
        title: 'Passwords do not match', status: 'error', duration: 3000
      });
      return;
    }
    try {
      await authService.register(name, email, password);
      toast( {
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        position: 'top'
      });
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      toast( {
        title: 'Error registering', description: error.response.data.message, status: 'error', duration: 3000
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10" p={boxPadding} boxShadow="lg" rounded="md" bg={bgColor} color={textColor}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Heading mb="6">Register</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Register;