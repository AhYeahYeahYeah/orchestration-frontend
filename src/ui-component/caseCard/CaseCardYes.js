import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function CaseCardYes() {
    return (
        <Stack direction="row" spacing={1}>
            <Chip label="是" variant="outlined" />
        </Stack>
    );
}
