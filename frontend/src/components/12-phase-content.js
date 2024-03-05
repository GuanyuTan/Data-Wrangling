import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataTable } from './task-table';
import { StyledButton } from './data-wrangling/button-enlarge';
import { PropTypes } from 'prop-types';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
const label = [
    'TASK',
    'REFS',
    'SUB-TASK',
    'DETAIL DESCRIPTION',
    'TEMPLATE'
]

const data_ = [{
    task: "IDENTIFY KEY VARIABLES",
    refs: 'CRISP-DM',
    subtask: [
        'Identify Variables Involved in model',
    ],
    detail: [
        [
            'Identify Dependent Variables in data *',
            'Identify Independent Variables in data *',
            'Identify additional data required by model',
        ]
    ],
    template: [
        [
            'GUIDELINE DP.3.1.a: VARIABLES IDENTIFICATION SAMPLE',
            'GUIDELINE DPM.1: ADDITIONAL DATA REQUIREMENTS'
        ]
    ]
}]

export function PhaseContent(props) {
    const { introText, data, children, ...others } = props
    const [activeStep, setActiveStep] = React.useState(0);

    const totalSteps = () => {
        return steps.length;
    };


    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };


    const handleNext = () => {
        const newActiveStep =
            isLastStep()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginY: '20px',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        margin: '20px',
                    }}>
                        <StyledButton>

                        </StyledButton>
                    </Box>
                    <Box >
                        <Typography>
                            {introText}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ margin: '20px' }}>
                        <DataTable data={data_} label={label}>

                        </DataTable>
                    </Box>
                    <div>
                        <React.Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} sx={{ mr: 1 }} disabled={activeStep === steps.length - 1}>
                                    Next
                                </Button>
                            </Box>
                        </React.Fragment>
                    </div>
                </Box>
            </Box>
        </div>
    )
};
PhaseContent.propTypes = {
    introText: PropTypes.string,
    data: PropTypes.Array,
};

