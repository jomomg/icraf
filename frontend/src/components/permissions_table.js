import {
    Table,
    ButtonGroup,
    Button
} from 'reactstrap';


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
                {
                    props.permissions.map((permission) => (
                        <tr key={permission.id}>
                        <td>
                            {permission.name}
                        </td>
                        <td>
                            {permission.description}
                        </td>
                        <td>
                            <ButtonGroup>
                                <Button 
                                    color='success' 
                                    size='sm' 
                                    onClick={() => props.handleEdit('permission', permission)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    color='danger' 
                                    size='sm'
                                    onClick={()=>props.handleDelete('permission', permission.id)}
                                >
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

export default PermissionsTable;