import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getEmployees as getEmployeesService, deleteEmployeeService } from '../../services/employeeService';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [count,setCount]=useState();
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployeesService(authToken);
        setEmployees(data);
        setCount(data.length)
      } catch (error) {
        alert('Failed to fetch employees');
      }
    };
    fetchEmployees();
  }, [authToken]);

  const handleDelete = async (id) => {
    try {
      await deleteEmployeeService(id, authToken);
      setEmployees(employees.filter((emp) => emp._id !== id));
      alert('Employee deleted successfully');
    } catch (error) {
      alert('Failed to delete employee');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Employee List
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ color: 'white' }}>
  <h3>Total Count: {count}</h3>
  <Button
    variant="contained"
    sx={{ textTransform: 'none', fontWeight: 'bold' }}
    color="primary"
    component={Link}
    startIcon={<PersonAddIcon />}
    to="/create-employee"
  >
    Add New Employee
  </Button>
</Box>
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              {['Avatar', 'Name', 'Email', 'Mobile', 'Designation', 'Gender', 'Course', 'Actions'].map((header) => (
                <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                <TableCell sx={{ textAlign: 'center' }}>
                  {emp.imgUpload ? (
                    <img
                      src={`http://localhost:5000/${emp.imgUpload}`} // Construct the image URL
                      alt={emp.name}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{emp.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{emp.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{emp.mobile}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{emp.designation}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{emp.gender}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{emp.course}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Tooltip title="Edit">
                    <IconButton color="primary" component={Link} to={`/edit-employee/${emp._id}`}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="secondary" onClick={() => handleDelete(emp._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default EmployeeList;
