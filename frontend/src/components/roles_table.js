import {
    Table,
    Button,
    ButtonGroup,
} from 'reactstrap';
import { Link } from 'react-router-dom';


const renderRoles = (roles) => {
    return roles.map((role) => (
        <tr key={role.id}>
        <td>
            {role.name}
        </td>
        <td>
            {role.description}
        </td>
        <td>
            <ButtonGroup>
                <Link to={``}>
                    <Button color='info' size='sm'>
                        More info
                    </Button>
                </Link>
                <Button color='success' size='sm'>
                    Edit
                </Button>
                <Button color='danger' size='sm'>
                    Delete
                </Button>
            </ButtonGroup>
        </td>
        </tr>
    ));
};

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
                </tr>
            </thead>
            <tbody>
                {renderRoles(props.roles)}
            </tbody>
        </Table>
    );
};

export default RolesTable;