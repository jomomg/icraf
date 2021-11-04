import { Link } from 'react-router-dom';
import {
    Table,
    Badge,
} from 'reactstrap';

const renderUsers = (users) => {
    return users.map((user) => (
        <tr key={user.id}>
        <td>
            {user.first_name}
        </td>
        <td>
            {user.last_name}
        </td>
        <td>
            {user.other_names}
        </td>
        <td>
            {user.email}
        </td>
        <td>
        <Link to={`/users/${user.id}`}>
            <Badge color="success">
                more info
            </Badge>
        </Link>
        </td>
        </tr>
    ));
};

function UsersTable(props) {
    return (
        <Table striped>
            <thead>
                <tr>
                <th>
                    First Name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    Other names
                </th>
                <th>
                    Email
                </th>
                </tr>
            </thead>
            <tbody>
                {renderUsers(props.users)}
            </tbody>
        </Table>
    );
};

export default UsersTable;