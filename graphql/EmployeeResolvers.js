// import {Employee} from "../models/index.js";
const { Employee } = require("../models/index.js");


const EmployeeResolvers = {
    Query: {
        getAllEmployees: async () => {
            return await Employee.find({});
        },
        getEmployeeById: async (parent, args) => {
            return await Employee.findById(args._id);
        },
    },
    Mutation: {
        async addEmployee(_, { employee }) {
            if (!employee) return new Error("No employee data");

            try {
                const newEmployee = new Employee({
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    email: employee.email,
                    gender: employee.gender,
                    salary: employee.salary,
                });
                await newEmployee.save();
                return newEmployee;
            } catch (ex) {
                return ex;
            }
        },
        async updateEmployee(_, { _id, employee }) {
            if (!_id || !employee) return new Error("No employee data");

            const empExist = await Employee.findById(_id);
            if (!empExist) return new Error("Employee not found");

            try {
                await Employee.findByIdAndUpdate(_id, {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    email: employee.email,
                    gender: employee.gender,
                    salary: employee.salary,
                });
                return await Employee.findById(_id);
            }
            catch (ex) {
                return ex;
            }
            
        },
        async deleteEmployee(_, { _id }) {
            if (!_id) return new Error("No employee data");

            const empExist = await Employee.findById(_id);
            if (!empExist) return new Error("Employee not found");

            try {
                await Employee.findByIdAndDelete(_id);
                return true;
            } catch (ex) {
                return ex;
            }
        },
    },
};

module.exports = EmployeeResolvers;
