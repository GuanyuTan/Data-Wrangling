import {
    Box, Typography , Accordion, AccordionSummary, AccordionDetails, Button

} from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
                            {document?document.map((doc, index) => (
                                <Box marginBottom="15px" key={doc.id}>
                                    <Typography sx={{ overflowWrap: "anywhere" }} variant='body1'>
                                        {doc["content"]}
                                    </Typography>
                                </Box>
                            )):<></>}
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
                        {answers?answers.map((ans, index) => (
                            <Box
                                marginY='50px'
                                key={`answer_${index}`}
                                sx={{ height: 400, width: '100%' }}>
                                <Box>
                                    <Typography variant='body1' gutterBottom >
                                        {ans["query"]}
                                    </Typography >
                                </Box>

                                <DataGrid
                                    pageSize={5}
                                    rows={ans["answers"]}
                                    columns={column}
                                >

                                </DataGrid>
                            </Box>
                        )):<></>}
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
                            // "answers": [...answers]
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