import { PropTypes } from 'prop-types';
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
export const DataTable = (props) => {
    const { data, label, ...others } = props
    return (
        <TableContainer component={Paper} sx={{maxHeight: '100%'}} >
            <Table>
                <TableHead>
                    <TableRow>
                        {label.map((item, index) => {
                            return (
                                <TableCell key={`label_${index}`} >
                                    {item}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, id) => {

                        const maxRows = Math.max(item.subtask.length, item.detail.length, item.template.length);
                        return (
                            (item.subtask.length == maxRows) ? (
                                item.subtask.map((subtask, index) => (
                                    <TableRow key={`row_${index}`}>
                                        {(index == 0) ? (
                                            <TableCell key={`task_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top', }}>
                                                <Typography gutterBottom fontSize={14}>
                                                    {item.task}
                                                </Typography>
                                            </TableCell>
                                        ) : null}
                                        {(index == 0) ? (
                                            <TableCell key={`refs_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top', }}>
                                                <Typography gutterBottom fontSize={14}>
                                                    {item.refs}
                                                </Typography>
                                            </TableCell>
                                        ) : null}
                                        <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top', }}>
                                            <Typography gutterBottom fontSize={14}>
                                                {subtask}
                                            </Typography>
                                        </TableCell>
                                        {(item.detail.length == 1 && index == 0) ? (
                                            <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top', }} rowSpan={maxRows}>
                                                {item.detail[0].map((tem) => (
                                                    <Typography gutterBottom fontSize={14}>
                                                        {tem}
                                                    </Typography>
                                                ))}
                                            </TableCell>
                                        ) :
                                            (index < item.detail.length && item.detail.length != 1) ? (
                                                <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top', }}>
                                                    {item.detail[index].map((tem) => (
                                                        <Typography gutterBottom fontSize={14}>
                                                            {tem}
                                                        </Typography>
                                                    ))}
                                                </TableCell>
                                            ) : (index >= item.detail.length && item.detail.length != 1) ? (
                                                <TableCell sx={{ verticalAlign: 'top', }} >
                                                </TableCell>) : null
                                        }
                                        {(item.template.length == 1 && index == 0) ? (
                                            <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top', }} rowSpan={maxRows}>
                                                {item.template[0].map((tem) => (
                                                    <Link>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {tem}
                                                        </Typography>
                                                    </Link>
                                                ))}
                                            </TableCell>
                                        ) : (index < item.template.length && item.template.length != 1) ? (
                                            <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top', }}>
                                                {item.template[index].map((tem) => (
                                                    <Link>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {tem}
                                                        </Typography>
                                                    </Link>
                                                ))}
                                            </TableCell>
                                        ) : (index >= item.template.length && item.template.length != 1) ? (
                                            <TableCell sx={{ verticalAlign: 'top', }} >
                                            </TableCell>) : null
                                        }
                                    </TableRow>
                                ))
                            ) : (item.detail.length == maxRows) ? (
                                item.detail.map((detail, index) => (
                                    <TableRow key={`row_${index}`}>
                                        {(index == 0) ? (
                                            <TableCell key={`task_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top', }}>
                                                <Typography gutterBottom fontSize={14}>
                                                    {item.task}
                                                </Typography>
                                            </TableCell>
                                        ) : null}
                                        {(index == 0) ? (
                                            <TableCell key={`refs_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top', }}>
                                                <Typography gutterBottom fontSize={14}>
                                                    {item.refs}
                                                </Typography>
                                            </TableCell>
                                        ) : null}
                                        {(index < item.subtask.length) ? (
                                            <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top', }}>
                                                <Typography gutterBottom fontSize={14}>
                                                    {item.subtask[index]}
                                                </Typography>
                                            </TableCell >
                                        ) : (<TableCell sx={{ verticalAlign: 'top', }} >
                                        </TableCell>)}
                                        <TableCell sx={{ verticalAlign: 'top', }}>
                                            {item.detail[index].map((tem) => (
                                                <Typography gutterBottom fontSize={14}>
                                                    {tem}
                                                </Typography>
                                            ))}
                                        </TableCell>
                                        {(item.template.length == 1 && index == 0) ? (
                                            <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top', }} rowSpan={maxRows}>
                                                {item.template[0].map((tem) => (
                                                    <Link>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {tem}
                                                        </Typography>
                                                    </Link>
                                                ))}
                                            </TableCell>
                                        ) : (index < item.template.length && item.template.length != 1) ? (
                                            <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top', }}>
                                                {item.template[index].map((tem) => (
                                                    <Link>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {tem}
                                                        </Typography>
                                                    </Link>
                                                ))}
                                            </TableCell>
                                        ) : (index >= item.template.length && item.template.length != 1) ? (
                                            <TableCell sx={{ verticalAlign: 'top', }} >
                                            </TableCell>) : null
                                        }
                                    </TableRow>
                                ))

                            ) :
                                (item.template.length == maxRows) ? (
                                    item.template.map((template, index) => (
                                        <TableRow key={`row_${index}`}>
                                            {(index == 0) ? (
                                                <TableCell key={`task_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top', }}>
                                                    <Typography gutterBottom fontSize={14}>
                                                        {item.task}
                                                    </Typography>
                                                </TableCell>
                                            ) : null}
                                            {(index == 0) ? (
                                                <TableCell key={`refs_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top', }}>
                                                    <Typography gutterBottom fontSize={14}>
                                                        {item.refs}
                                                    </Typography>
                                                </TableCell>
                                            ) : null}
                                            {(index < item.subtask.length) ? (
                                                <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top', }}>
                                                    <Typography gutterBottom fontSize={14}>
                                                        {item.subtask[index]}
                                                    </Typography>
                                                </TableCell>
                                            ) : (<TableCell sx={{ verticalAlign: 'top', }}>
                                            </TableCell>)}
                                            {(item.detail.length == 1 && index == 0) ? (
                                                <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top', }} rowSpan={maxRows}>
                                                    {item.detail[0].map((tem) => (
                                                        <Typography gutterBottom fontSize={14}>
                                                            {tem}
                                                        </Typography>
                                                    ))}
                                                </TableCell>
                                            ) :
                                                (index < item.detail.length && item.detail.length != 1) ? (
                                                    <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top', }}>
                                                        {item.detail[index].map((tem) => (
                                                            <Typography gutterBottom fontSize={14}>
                                                                {tem}
                                                            </Typography>
                                                        ))}
                                                    </TableCell>
                                                ) : (index >= item.detail.length && item.detail.length != 1) ? (
                                                    <TableCell sx={{ verticalAlign: 'top', }} >
                                                    </TableCell>) : null
                                            }
                                            <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top', }} >
                                                {item.template[index].map((tem) => (
                                                    <Link>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {tem}
                                                        </Typography>
                                                    </Link>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : null)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
DataTable.propTypes = {
    data: PropTypes.array,
    label: PropTypes.array
};