import {
    Table,
    ButtonGroup,
    Button
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
        <td>
            <ButtonGroup>
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

function PermissionsTable(props) {
    return (
        <Table bordered>
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