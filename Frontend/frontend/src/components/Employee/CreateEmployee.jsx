import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { createEmployee as createEmployeeService } from '../../services/employeeService';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
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
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        imgUpload: null,
    });
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

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

    const handleFileChange = (event) => {
        setEmployee({ ...employee, imgUpload: event.target.files[0] });
    };

    const handleSubmit = async () => {
        try {
            // Create a FormData object to send the form data
            const formData = new FormData();
            formData.append('name', employee.name);
            formData.append('email', employee.email);
            formData.append('mobile', employee.mobile);
            formData.append('designation', employee.designation);
            formData.append('gender', employee.gender);
            formData.append('course', JSON.stringify(employee.course)); // Convert array to string
            if (employee.imgUpload) {
                formData.append('imgUpload', employee.imgUpload);
            }

            await createEmployeeService(formData, authToken);
            alert('Employee created successfully');
            navigate('/employees');
        } catch (error) {
            alert('Failed to create employee');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Create Employee
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={employee.name}
                        onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={employee.email}
                        onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                    />
                    <TextField
                        label="Mobile No"
                        variant="outlined"
                        fullWidth
                        value={employee.mobile}
                        onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })}
                    />
                    <FormControl fullWidth>
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
                    <FormControl component="fieldset">
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
                    <FormControl component="fieldset">
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
                    <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            padding: '0.75rem',
                            borderRadius: '25px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default CreateEmployee;
