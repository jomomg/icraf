import {
    Table,
    Button,
    ButtonGroup,
    Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';


function RolesTable(props) {
    return (
        <Table bordered>
            <thead>
                <tr>
                <th>
                    Role Name
                </th>
                <th>
                    Role Description
                </th>
                <th>
                    Role Permissions
                </th>
                </tr>
            </thead>
            <tbody>
                {
                    props.roles.map((role) => (
                        <tr key={role.id}>
                        <td>
                            {role.name}
                        </td>
                        <td>
                            {role.description}
                        </td>
                        <td>
                            <ul style={{paddingLeft: '0'}}>
                                {role.permissions.map((permission) =>
                                        <li style={{display: 'inline'}}
                                        key={permission.id}>
                                            <Badge color='success'>{permission.name}</Badge>{' '}
                                        </li>
                                )}
                            </ul>
                        </td>
                        <td>
                            <ButtonGroup>
                                <Button color='success' size='sm' onClick={() => props.handleEdit('role', role)}>
                                    Edit
                                </Button>
                                <Button onClick={()=>props.handleDelete('role', role.id)} color='danger' size='sm'>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
};

export default RolesTable;