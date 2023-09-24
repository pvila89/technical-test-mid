import './App.css'

import { useEffect, useRef, useState } from 'react'

import { UsersList } from './components/UsersList'
import { User } from './types'

function App() {
    const [users, setUsers] = useState<User[]>([])
    const [showColors, setShowColors] = useState<boolean>(false)
    const [sortByCountry, setSortByCountry] = useState<boolean>(false)
    const [filterByCountry, setFilterByCountry] = useState<string | null>(null)
    const initialUsers = useRef<User[]>([])

    const toggleColors = () => setShowColors(!showColors)
    const toggleSortByCountry = () => setSortByCountry(!sortByCountry)
    const handleFilterByCountry = (event: React.ChangeEvent<HTMLInputElement>) => setFilterByCountry(event.target.value)

    const handleDeleteRow = (email: string) => setUsers(users.filter((user) => user.email !== email))

    const handleResetUsers = () => {
        setUsers(initialUsers.current)
    }

    const filteredUsers =
        typeof filterByCountry === 'string' && filterByCountry.length > 0
            ? users.filter((user) => user.location.country.toLowerCase().includes(filterByCountry.toLowerCase()))
            : users

    const sortUsers = sortByCountry
        ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
        : filteredUsers

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=100')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.results)
                initialUsers.current = data.results
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    return (
        <>
            <div className="App">
                <h1>Technical Test</h1>
                <header>
                    <button onClick={toggleColors}>{showColors ? 'Colored rows' : 'No Colored rows'}</button>
                    <button onClick={toggleSortByCountry}>
                        {sortByCountry ? 'Sorted by Country' : 'No Sort by Country'}
                    </button>
                    <button onClick={handleResetUsers}>Restore Users</button>
                    <input onChange={handleFilterByCountry} type="text" placeholder="Filter By Country" />
                </header>
                <main>
                    <UsersList users={sortUsers} showColors={showColors} onDeleteRow={handleDeleteRow} />
                </main>
            </div>
        </>
    )
}

export default App
