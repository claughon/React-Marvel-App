let token = `0ff0390f7afb`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://ranger-marvel.herokuapp.com/api/superheros`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
    });

    if (!response.ok){
        throw new Error('Failed to fetch data from server')
    }
    return await response.json()
    },

    create: async(data:any = {}) => {
        const response = await fetch(`https://ranger-marvel.herokuapp.com/api/superheros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Failed to create new data on server')
        }
    },

    update: async(id:string, data:any = {}) => {
        const response = await fetch (`https://ranger-marvel.herokuapp.com/api/superheros/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error(`Failed to Update Drone ID ${id} on server`)
        }
        body: JSON.stringify(data)
    },

    delete: async(id:string) => {
        const response = await fetch(`https://ranger-marvel.herokuapp.com/api/superheros/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if(!response.ok){
            throw new Error(`Failed to Delete Drone ID ${id} on server`)
        }
        return await response.json()
    }
}