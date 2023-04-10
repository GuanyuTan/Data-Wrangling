// import styled from "@emotion/styled";
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DataTable } from "../components/task-table";
import { Box } from "@mui/system";
import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout"
const label = [
    'TASK',
    'REFS',
    'SUB-TASK',
    'DETAIL DESCRIPTION',
    'TEMPLATE'
]



const data = [
    {
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
    },
    {
        task: "SELECT MODELING TECHNIQUES",
        refs: 'CRISP-DM',
        subtask: [
            "Identify techniques to perform analytics",
            "Select techniques to perform analysis",
        ],
        detail: [
            [
                'Refer to Instrument DPM.1 for component design',
                'Refer to Instrument DPM.2 for alternative techniques'
            ],
            [
                'Use evaluation matrix to help select (limitation, underlying assumption, previous performance, availability of tools/libraries, availability in Visualization tool, ease of use based on team experience, availability of help/training, availability of contractor/consultant, cost to develop or procure',
                'Develop performance measure criteria and perform pilot comparison',
                'Choose one method based results of performance matrix and pilot comparison'

            ]
        ],
        template: [
            [
                'GUIDELINE DPM.2.1: COMPONENT DESIGN',
                'INSTRUMENT DPM.2.1: COMPONENT DESIGN',
                'GUIDELINE DPM.2.2: TECHNIQUES VERSUS ANALYTICS METRICS'
            ],
            [
                'INSTRUMENT DPM.2.2: EVALUATION METRICS VS TECHNIQUES/MODELS'
            ]
        ]

    },
    {
        task: "DESIGN TEST",
        refs: 'CRISP-DM',
        subtask: [
            'Design experiment to evaluate',
            'Split training and test data'
        ],
        detail: [
            [
                'Prepare testing datasets',
                'Prepare cross validation for training and testing',
                'Develop performance measure',
                'Prepare tagging of data for evaluation of model'
            ],
            [
                'Split training and testing data according to cross-validation strategy'
            ]
        ],
        template: [
            [
                'INSTRUMENT DPM.3.1: TRAINING AND TEST DATASET REQUIREMENTS',
                'INSTRUMENT DPM.3.2: PERFORMANCE MEASURE'
            ],
        ]

    },
    {
        task: "BUILD MODEL",
        refs: 'CRISP-DM',
        subtask: [
            'Design model',
            'Set parameters',
            'Describe model',
            'Develop model'
        ],
        detail: [
            [
                'Design model architecture',
                'Perform feature engineering and extraction',
                'Perform feature reduction and selection',
                'Test embedded and wrapper approach for feature selection'

            ],
            [
                'Identify model parameters',
                'Tune model parameters'
            ],
            [
                'Write up technical specification about model'
            ],
            [
                'Choose implementation tool',
                'Implement and program model'
            ]
        ],
        template: [
            [
                'GUIDELINE DPM.4.1: Example of MODEL ARCHITECTURE ',
                'GUIDELINE DPM.4.2: Example of FEATURE ENGINEERING FLOWCHART',
                'GUIDELINE DPM.4.3: Example of FEATURE REDUCTION TECHNIQUES',
                'GUIDELINE DPM.4.4: Example of FEATURE REDUCTION FLOWCHART',
                'GUIDELINE DPM.4.5: FEATURE REDUCTION COMPARISON'
            ],
        ]

    },
    {
        task: "ASSESS MODEL",
        refs: 'CRISP-DM',
        subtask: [
            'Run sample tests with data and validate output',
            'Revise parameter setting',
            'Explore models',
            'Report performance of models'
        ],
        detail: [
            [
                'Run model',
                'Record performance measure'

            ],
            [
                'Tune parameter and design of model',
                'Perform parameter optimization using machine learning if necessary',
                'Repeat until satisfactory performance obtained',

            ],
            [
                'Explore other  models',
                'Explore other design',
                'Repeat DPM.4 until satisfactory performance obtained',

            ],
            [
                'Write report on model from DPM.4 and performance of model'
            ]

        ],
        template: [
            [
                'GUIDELINE DPM.5: MODEL MANAGEMENT'
            ],
        ]

    },
    {
        task: "MANAGE MODEL",
        refs: 'CRISP-DM',
        subtask: [
            'Manage folders and access'
        ],
        detail: [
            [
                'Create folders',
                'Configure access to folders'
            ]

        ],
        template: [
            [
                'GUIDELINE DPM.6: MODEL CONFIGURATION MANAGEMENT',
                'INSTRUMENT DPM.6: MODEL CONFIGURATION MANAGEMENT'
            ]
        ]

    },
    {
        task: "DEPLOY MODEL",
        refs: 'CRISP-DM',
        subtask: [
            'Plan and deployment of model to user/data product developer',
        ],
        detail: [
            [
                'Deploy model to be embedded into data product with accuracy report'
            ]

        ],
        template: [
            ['INSTRUMENT DPM.7 MODEL DEPLOYMENT SPECIFICATION'],
        ]

    },
]
const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Analytics Product Modeling
                </title>
            </Head>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '70px',
                    height: '100%',
                    paddingX: '40px',
                    paddingBottom: '40px'
                }}
            >
                <DataTable data={data} label={label}>

                </DataTable>
                {/* <TableContainer component={Paper} >
                    <Table >
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
                                                    <TableCell key={`task_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top',   }}>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {item.task}
                                                        </Typography>
                                                    </TableCell>
                                                ) : null}
                                                <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top',    }}>
                                                    <Typography gutterBottom fontSize={14}>
                                                        {subtask}
                                                    </Typography>
                                                </TableCell>
                                                {(index < item.detail.length) ? (
                                                    <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top',   }}>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {item.detail[index]}
                                                        </Typography>
                                                    </TableCell>
                                                ) : (<TableCell sx={{ verticalAlign: 'top',  }}>
                                                </TableCell>)}
                                                {(index < item.template.length) ? (
                                                    <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top' ,   }}>
                                                        <Link>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.template[index]}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                ) : (<TableCell sx={{ verticalAlign: 'top' ,   }} >
                                                </TableCell>)}
                                            </TableRow>
                                        ))
                                    ) : (item.detail.length == maxRows) ? (
                                        item.detail.map((detail, index) => (
                                            <TableRow key={`row_${index}`}>
                                                {(index == 0) ? (
                                                    <TableCell key={`task_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top',  }}>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {item.task}
                                                        </Typography>
                                                    </TableCell>
                                                ) : null}
                                                {(index < item.subtask.length) ? (
                                                    <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top',  }}>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {item.subtask[index]}
                                                        </Typography>
                                                    </TableCell >
                                                ) : (<TableCell sx={{ verticalAlign: 'top',  }} >
                                                </TableCell>)}
                                                <TableCell sx={{ verticalAlign: 'top',  }}>
                                                    <Typography key={`detail_${id}_${index}`} gutterBottom fontSize={14}>
                                                        {detail}
                                                    </Typography>
                                                </TableCell>
                                                {(index < item.template.length) ? (
                                                    <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top',  }}>
                                                        <Link>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.template[index]}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                ) : (<TableCell sx={{ verticalAlign: 'top',  }} >
                                                </TableCell>)}
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
                                                    {(index < item.subtask.length) ? (
                                                        <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top',  }}>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.subtask[index]}
                                                            </Typography>
                                                        </TableCell>
                                                    ) : (<TableCell sx={{ verticalAlign: 'top',  }}>
                                                    </TableCell>)}
                                                    {(index < item.detail.length) ? (
                                                        <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top',  }}>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.detail[index]}
                                                            </Typography>
                                                        </TableCell>
                                                    ) : (<TableCell sx={{ verticalAlign: 'top',  }} >
                                                    </TableCell>)}
                                                    <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top',  }} >
                                                        <Link>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {template}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : null)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer> */}
            </Box>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;