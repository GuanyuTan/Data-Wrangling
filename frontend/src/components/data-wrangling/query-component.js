import {
    Box, Tooltip, CircularProgress, InputAdornment, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, Button, TextField, IconButton

} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from 'react';


export const QueryComponent = (props) => {
    const { queryAns,
        setQueryAns,
        id,
        openId,
        handleAccChange,
        selection,
        setSelectedDoc,
        ...others } = props;
    const [currentAns, setCurrentAns] = useState("Here");
    const [edit, toggleEdit] = useState(false);
    const [helperText, setHelperText] = useState("");

    const handleChange = (event) => {
        if (event.target.value.trim() === "") {
            setHelperText("Enter an answer.");
            setCurrentAns(event.target.value.trim());
        }
        else {

        }
    }
    useEffect(() => {
        if (openId == id) {
            setCurrentAns(selection.context)
            setSelectedDoc(selection.pageIndex)
        }
    }, [selection])

    const removeQueryComponent = (e) => {
        e.stopPropagation();
        const copy = [...queryAns];
        copy.splice(id, 1);
        setQueryAns([...copy]);
    }
    const handleEdit = (e) => {
        toggleEdit(true);
    }

    const keyPress = (e) => {
        if (e.keyCode == 13) {
            if (!(currentAns.trim() === "")) {
                const copy = [...queryAns];
                copy[id].answer = currentAns;
                setQueryAns([...copy]);
                toggleEdit(false);
            }
        }
    }

    return (
        <>
            <Box marginBottom="10px">
                <Accordion
                    sx={{ color: (helperText.length > 1) ? "error.main" : "black" }}
                    elevation={9}
                    expanded={id === openId}
                    onChange={handleAccChange(id)}
                >
                    <AccordionSummary

                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                    >
                        <Box display='flex' alignItems="center">
                            <IconButton onClick={removeQueryComponent}>
                                <CloseIcon />
                            </IconButton>
                            <Typography style={{
                                overflowWrap: "anywhere"
                            }}>
                                {queryAns[id].query}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {!edit ? (
                            <Box paddingLeft='10px'>
                                <Tooltip title="Click to edit" placement='bottom-start'>
                                    <Typography
                                        onClick={handleEdit}
                                        style={{
                                            overflowWrap: "anywhere"
                                        }}>
                                        {currentAns}
                                    </Typography>
                                </Tooltip>
                            </Box>
                        ) : (
                            <Box>
                                <TextField
                                    size='small'
                                    error={helperText.length > 1}
                                    helperText={helperText}
                                    label="Press Enter to confirm answer."
                                    multiline
                                    onKeyDown={keyPress}
                                    fullWidth
                                    defaultValue={currentAns}
                                    required
                                    onChange={handleChange}

                                >

                                </TextField>
                            </Box>
                        )}


                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    )

}