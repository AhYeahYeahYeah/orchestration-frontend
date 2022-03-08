import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const columns = [
    { field: 'account', headerName: '账户', width: 170 },
    { field: 'cname', headerName: '真实姓名', width: 170 },
    { field: 'nickName', headerName: '昵称', width: 170 }
];

export default function UserForm({ users, selectionUser, setSelectionUser }) {
    return (
        <>
            <div style={{ marginTop: 5, height: `calc(100vh - 290px)`, width: '100%' }}>
                <DataGrid
                    // autoHeight
                    autoPageSize
                    rows={users}
                    columns={columns}
                    // pageSize={5}
                    checkboxSelection
                    components={{ Toolbar: GridToolbar }}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionUser(newSelectionModel);
                    }}
                    selectionModel={selectionUser}
                />
            </div>
        </>
    );
}

UserForm.propTypes = {
    setSelectionUser: PropTypes.func.isRequired,
    selectionUser: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired
};
