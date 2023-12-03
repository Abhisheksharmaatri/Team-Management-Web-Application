# API Documentation

## URLs

### GET Users

Url: `/api/users/:page-number`

Request:{
    Type: Get,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: {
        domain: String,
        Gender: String,
        availability: Boolean
    }
}

Response:{
    success: true,
    status: 200,
    data:{
        users: [
            {
                id: Number,
                firstName: String,
                lastName: String,
                email: String,
                avatar: String,
                available: Boolean,
                gender: String,
                domain: String
            }
        ]
    },
    message: "Users fetched successfully",
    error: null
}

### GET User

Url:`/api/users/:id`

Request: {
    Type: Get
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: null
}

Response: {
    success: true,
    status: 200,
    data:{
        user: {
            id: Number,
            firstName: String,
            lastName: String,
            email: String,
            avatar: String,
            available: Boolean,
            gender: String,
            domain: String
        }
    },
    message: "User fetched successfully",
    error: null
}

### Create User

Url:`/api/users`

Request: {
    Type: Post,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: {
        firstName: String,
        lastName: String,
        email: String,
        domain: String
        gender: String
    }
}

Response: {
    success: true,
    status: 200,
    data:{
        user: {
            id: Number,
            firstName: String,
            lastName: String,
            email: String,
            avatar: String,
            available: Boolean,
            gender: String,
            domain: String
        }
    },
    message: "User created successfully",
    error: null
}

### Update User

Url: `/api/users/:id`

Request: {
    Type: Put,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: {
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        avatar: String,
        domain: String,
        available: Boolean
    }
}

Response: {
     success: true,
    status: 200,
    data:{
        user: {
            id: Number,
            firstName: String,
            lastName: String,
            email: String,
            avatar: String,
            available: Boolean,
            gender: String,
            domain: String
        }
    },
    message: "User updated successfully",
    error: null
}

### Delete User

Url: `/api/users/:id`

Request: {
    Type: Post,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: {
        id: Number
    }
}

Response: {
     success: true,
    status: 200,
    data:{
        user: {
            id: Number
        }
    },
    message: "User deleted successfully",
    error: null
}


### Create Team

Url: `/api/teams`

Request:{
    Type: Post,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: {
        name: String,
        description: String,
        members: [
            {
                id: Number
            }
        ]
    }
}

Response: {
    success: true,
    status: 200,
    data:{
        team: {
            id: Number,
            name: String,
            description: String,
            members: [
                {
                    id: Number
                }
            ]
        }
    },
    message: "Team created successfully",
    error: null
}

### Get Team

Url: `/api/teams/:id`

Request:{
    Type: Get,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: null
}

Response: {
    success: true,
    status: 200,
    data:{
        team: {
            id: Number,
            name: String,
            description: String,
            members: [
                {
                    id: Number
                }
            ]
        }
    },
    message: "Team fetched successfully",
    error: null
}

### Update Team

Url: `/api/teams/:id`

Request:{
    Type: Put,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: {
        name: String,
        description: String,
        members: [
            {
                id: Number
            }
        ]
    }
}

Response: {
    success: true,
    status: 200,
    data:{
        team: {
            id: Number,
            name: String,
            description: String,
            members: [
                {
                    id: Number
                }
            ]
        }
    },
    message: "Team updated successfully",
    error: null
}


### Delete Team

Url: `/api/teams/:id`

Request:{
    Type: Delete,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: null
}

Response: {
    success: true,
    status: 200,
    data:{
        team: {
            id: Number
        }
    },
    message: "Team deleted successfully",
    error: null
}

### Get Teams

Url: `/api/teams/:page-number`

Request:{
    Type: Get,
    Headers: {
        Authorization: Bearer ${token}
    },
    Body: null
}

Response: {
    success: true,
    status: 200,
    data:{
        teams: [
            {
                id: Number,
                name: String,
                description: String,
                members: [
                    {
                        id: Number
                    }
                ]
            }
        ]
    },
    message: "Teams fetched successfully",
    error: null
}