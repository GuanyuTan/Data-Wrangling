import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Button,
    Card,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const response = [
    {
        id: 0,
        type: "Short Term",
        threats: [
            {
                id: uuid(),
                text: "User resistance"
            },
            {
                id: uuid(),
                text: "Policy not clear"
            }
        ],
        opportunities: [
            {
                id: uuid(),
                text: "Customer base broaden up"
            },
        ]
    },
    {
        id: 1,
        type: "Long Term",
        threats: [
            {
                id: uuid(),
                text: "Economical issue"
            },

        ],
        opportunities: [
            {
                id: uuid(),
                text: "Company direction"
            },
        ]
    }

];

const editButton = () => (
    <IconButton color="primary">
        <EditIcon>

        </EditIcon>
    </IconButton>
)

export const TableA = (props) => (
    <Card {...props}>
        <CardHeader title="Urgency Threats and Opportunities" />
        <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>

                            </TableCell>
                            <TableCell>
                                Threats
                            </TableCell>
                            <TableCell sortDirection="desc">
                                Opportunities
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response.map((cat) => (
                            <TableRow
                                hover
                                key={cat.id}
                            >
                                <TableCell>
                                    {cat.type}
                                </TableCell>
                                <TableCell>
                                    {cat.threats.map((item, index) => (
                                        <Box key={`some${index}`} display="flex" alignItems='center' padding="10px" justifyContent="space-between">
                                            <Typography>
                                                {item.text}
                                            </Typography>
                                            <Box>
                                                <IconButton color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {cat.opportunities.map((item) => (
                                        <Box display="flex" alignItems='center' padding="10px" justifyContent="space-between">
                                            <Typography>
                                                {item.text}
                                            </Typography>
                                            <Box>
                                                <IconButton color="primary" variant='contained'>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </PerfectScrollbar>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
            }}
        >
            <Button
                color="success"
                endIcon={<ArrowRightIcon fontSize="small" />}
                size="small"
                variant='contained'
            >
                New Urgency
            </Button>
        </Box>
    </Card>
);
