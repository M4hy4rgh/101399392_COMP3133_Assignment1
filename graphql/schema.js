const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
}

enum Gender { 
    male,
    female,
    other
}

type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    salary: Float!
}

input UserInput {
    username: String!
    email: String!
    password: String!
}

input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    salary: Int!
}
type LoginResponse {
    user: User
    token: String
}

type Query {
    login(username: String!, password: String!): LoginResponse
    getAllEmployees: [Employee]
    getEmployeeById(_id: String!): Employee
}

type Mutation {

    signup(user: UserInput!): User

    addEmployee(employee: EmployeeInput!): Employee

    updateEmployee(_id: String!, employee: EmployeeInput!): Employee

    deleteEmployee(_id: String!): Boolean

}

`;

module.exports = typeDefs;
