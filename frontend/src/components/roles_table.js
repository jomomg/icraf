import {
    Table
} from 'reactstrap';

const renderRoles = (roles) => {
    return roles.map((role) => (
        <tr key={role.id}>
        <td>
            {role.name}
        </td>
        <td>
            {role.description}
        </td>
        </tr>
    ));
};

function RolesTable(props) {
    return (
        <Table striped>
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