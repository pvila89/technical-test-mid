import './App.css'

import { useEffect, useMemo, useRef, useState } from 'react'

import { UsersList } from './components/UsersList'
import { SortBy, User } from './types.d'

function App() {
    const [users, setUsers] = useState<User[]>([])
    const [showColors, setShowColors] = useState<boolean>(false)
    const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
    const [filterByCountry, setFilterByCountry] = useState<string | null>(null)
    const initialUsers = useRef<User[]>([])

    const toggleColors = () => setShowColors(!showColors)
    const toggleSortByCountry = () => {
        const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
        setSorting(newSortingValue)
    }

    const handleFilterByCountry = (event: React.ChangeEvent<HTMLInputElement>) => setFilterByCountry(event.target.value)

    const handleDeleteRow = (email: string) => setUsers(users.filter((user) => user.email !== email))

    const handleSortByColumn = (column: SortBy) => setSorting(column)

    const handleResetUsers = () => {
        setUsers(initialUsers.current)
    }

    const filteredUsers = useMemo(() => {
        return typeof filterByCountry === 'string' && filterByCountry.length > 0
            ? users.filter((user) => user.location.country.toLowerCase().includes(filterByCountry.toLowerCase()))
            : users
    }, [users, filterByCountry])

    const sortedUsers = useMemo(() => {
        if (sorting === SortBy.NONE) return filteredUsers
        if (sorting === SortBy.COUNTRY)
            return filteredUsers.sort((a, b) => a.location.country.localeCompare(b.location.country))
        if (sorting === SortBy.LAST) return filteredUsers.sort((a, b) => a.name.last.localeCompare(b.name.last))
        if (sorting === SortBy.NAME) return filteredUsers.sort((a, b) => a.name.first.localeCompare(b.name.first))
        return filteredUsers
    }, [filteredUsers, sorting])

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
                        {sorting === SortBy.COUNTRY ? 'Sorted by Country' : 'No Sort by Country'}
                    </button>
                    <button onClick={handleResetUsers}>Restore Users</button>
                    <input onChange={handleFilterByCountry} type="text" placeholder="Filter By Country" />
                </header>
                <main>
                    <UsersList
                        users={sortedUsers}
                        showColors={showColors}
                        onDeleteRow={handleDeleteRow}
                        onSortColumn={handleSortByColumn}
                    />
                </main>
            </div>
        </>
    )
}

export default App
