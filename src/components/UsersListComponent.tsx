import { User } from '../types'

interface UsersProps {
    users: User[]
}

export const UsersList = ({ users }: UsersProps) => (
    <table width="100%">
        <thead>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Country</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user.email}>
                    <td>
                        <img src={user.picture.large} alt="Profile picture" />
                    </td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td>
                        <button>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)
