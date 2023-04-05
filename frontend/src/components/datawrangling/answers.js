import {
    Box, CircularProgress, LinearProgress, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, Button

} from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}


export const Answer = (props) => {
    const { answers, document, sendProps, ...others } = props;
    const column = [
        { field: "answer", headerName: "Answer", width: 300 },
        { field: "score", headerName: "Score", width: 100 },
        { field: "context", headerName: "Original Text", width: 600 },
    ]

    return (
        <>
            <Box marginBottom="10px">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant='h5'>Text Extracted</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box height="300px" overflow="scroll">
                            {document.map((doc, index) => (
                                <Box marginBottom="15px" key={doc.id}>
                                    <Typography sx={{overflowWrap: "anywhere"}} variant='body1'>
                                        {doc["content"]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box marginBottom="10px">
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant='h5'>Answers</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {answers.map((ans, index) => (
                            <Box
                            key={`answer_${index}`} 
                            sx={{ height: 400, width: '100%' }}>
                                <Typography variant='body1'>
                                    {ans["query"]}
                                </Typography >
                                <DataGrid
                                    pageSize={5}
                                    rows={ans["answers"]}
                                    columns={column}
                                >

                                </DataGrid>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
                <Box display="flex" justifyContent="flex-end" marginTop="10px">
                    <Box marginLeft="10px">
                        <Button onClick={sendProps}>
                            <Typography>
                                Refine
                            </Typography>
                        </Button>
                    </Box>
                    <Box marginLeft="10px">
                        <Button download="answers.json" href={'data:' + JSON.stringify({
                            // TODO fix the issue where document only returns part of meta and no content
                            // "document": [...document],
                            "answers": [...answers]
                        })}>
                            <Typography>
                                Save
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )

}