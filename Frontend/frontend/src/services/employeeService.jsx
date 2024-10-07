import axios from 'axios';

export const createEmployee = async (employeeData, token) => {
    const response = await axios.post('http://localhost:5000/api/employees/create', employeeData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
        },
    });
    return response.data;
};

export const getEmployees = async (token) => {
    const response = await axios.get('http://localhost:5000/api/employees', {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
};
export const deleteEmployeeService = async (id, authToken) => {
    try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`, {
            headers: {
                Authorization:authToken,
            },
        });
    } catch (error) {
        throw new Error('Failed to delete employee');
    }
};

// Get employee by ID
export const getEmployeeById = async (id, token) => {
    console.log(id)
    console.log(token)
    const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
};

// Update employee data
export const updateEmployeeService = async (id, employee, token) => {
    const response = await axios.put(`http://localhost:5000/api/employees/${id}`, employee, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
};