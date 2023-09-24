import { SortBy, User } from '../types.d'

interface UsersProps {
    users: User[]
    showColors: boolean
    onDeleteRow: (email: string) => void
    onSortColumn: (column: SortBy) => void
}

export const UsersList = ({ users, showColors, onDeleteRow, onSortColumn }: UsersProps) => (
    <table width="100%">
        <thead>
            <tr>
                <th>Photo</th>
                <th onClick={() => onSortColumn(SortBy.NAME)}>Name</th>
                <th onClick={() => onSortColumn(SortBy.LAST)}>Last Name</th>
                <th onClick={() => onSortColumn(SortBy.COUNTRY)}>Country</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => {
                const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                const color = showColors ? backgroundColor : 'transparent'

                return (
                    <tr key={user.email} style={{ backgroundColor: color }}>
                        <td>
                            <img src={user.picture.large} alt="Profile picture" />
                        </td>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.location.country}</td>
                        <td>
                            <button onClick={() => onDeleteRow(user.email)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
)
