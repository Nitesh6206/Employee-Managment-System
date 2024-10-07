import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getEmployeeById, updateEmployeeService } from '../../services/employeeService';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function EditEmployee() {
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id, authToken);
        setEmployee(data);
      } catch (error) {
        alert('Failed to fetch employee data');
      }
    };
    if (id && authToken) {
      fetchEmployee();
    }
  }, [id, authToken]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (event) => {
    const { value } = event.target;
    setEmployee((prevState) => {
      const isChecked = prevState.course.includes(value);
      return {
        ...prevState,
        course: isChecked
          ? prevState.course.filter((course) => course !== value)
          : [...prevState.course, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployeeService(id, employee, authToken);
      alert('Employee updated successfully');
      navigate('/employees');
    } catch (error) {
      alert('Failed to update employee');
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: 'white',
        maxHeight: '80vh', // Increase max height to make it more scrollable
        overflowY: 'auto',
        margin: 'auto',
        padding: '2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#1976d2',
          borderRadius: '4px',
        },
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Edit Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Mobile"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Designation</InputLabel>
          <Select
            value={employee.designation}
            onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}
          >
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Designer">Designer</MenuItem>
          </Select>
        </FormControl>

        {/* Gender Section */}
        <FormControl component="fieldset" sx={{ mt: 3, display: 'block' }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            value={employee.gender}
            onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>
        </FormControl>

        {/* Course Section */}
        <FormControl component="fieldset" sx={{ mt: 3, display: 'block' }}>
          <FormLabel component="legend">Course</FormLabel>
          <FormGroup row>
            {['MCA', 'BCA', 'BSc'].map((course) => (
              <FormControlLabel
                key={course}
                control={
                  <Checkbox
                    checked={employee.course.includes(course)}
                    onChange={handleCourseChange}
                    value={course}
                  />
                }
                label={course}
              />
            ))}
          </FormGroup>
        </FormControl>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              padding: '10px 20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default EditEmployee;
