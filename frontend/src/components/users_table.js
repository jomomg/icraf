import { Link } from 'react-router-dom';
import {
    Table,
    Badge,
    Button, 
    ButtonGroup,
    ListInlineItem,
    List,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

const renderUsers = (users, handleEdit, handleDelete) => {
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
            <ul style={{paddingLeft: '0'}}>
                {user.roles.map((role) =>
                        <li style={{display: 'inline', marginBottom: '0', paddingBottom: '0'}}
                        key={role.id}>
                            <Badge color='success'>{role.name}</Badge>{' '}
                        </li>
                )}
            </ul>
        </td>
        <td>
            <ButtonGroup>
                <Link to={`/users/${user.id}`}>
                    <Button color='info' size='sm'>
                        More info
                    </Button>
                </Link>
                <Button color='success' size='sm' onClick={() => handleEdit('user', user)}>
                    Edit
                </Button>
                <Button onClick={()=>handleDelete('user', user.id)} color='danger' size='sm'>
                    Delete
                </Button>
            </ButtonGroup>
        </td>
        </tr>
    ));
};

function UsersTable(props) {
    return (
        <Table bordered>
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
                <th>
                    Roles
                </th>
                </tr>
            </thead>
            <tbody>
                {renderUsers(props.users, props.handleEdit, props.handleDelete)}
            </tbody>
        </Table>
    );
};

export default UsersTable;