import {
    Table
} from 'reactstrap';

const renderPermissions = (permissions) => {
    return permissions.map((permission) => (
        <tr key={permission.id}>
        <td>
            {permission.name}
        </td>
        <td>
            {permission.description}
        </td>
        </tr>
    ));
};

function PermissionsTable(props) {
    return (
        <Table striped>
            <thead>
                <tr>
                <th>
                    Permission Name
                </th>
                <th>
                    Permission Description
                </th>
                </tr>
            </thead>
            <tbody>
                {renderPermissions(props.permissions)}
            </tbody>
        </Table>
    );
};

export default PermissionsTable;