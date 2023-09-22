import './App.css'

import { useEffect, useState } from 'react'

import { UsersList } from './components/UsersListComponent'
import { User } from './types'

function App() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=100')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.results)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    return (
        <>
            <div className="App">
                <h1>Technical Test</h1>
                <UsersList users={users} />
            </div>
        </>
    )
}

export default App
