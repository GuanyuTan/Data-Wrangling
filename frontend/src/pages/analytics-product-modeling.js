import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout"
import PerfectScrollbar from "react-perfect-scrollbar";

const label = [
    'TASK',
    'SUB-TASK',
    'DETAIL DESCRIPTION',
    'TEMPLATE'
]
const data = [
    {
        task: "SET UP STRATEGIC PLANNING TEAM",
        subtask: [
            'Set up team responsible for steering, planning and monitoring Big Data Analytics adoption and implementation in organization',
        ],
        detail: [
            'Need to appoint people to be in-charge of the steering, planning and monitoring the Big Data Analytics adoption and implementation',
        ],
        template: [
            'GUIDELINE STEP.1.1: STEERING TEAM ORGANIZATION CHART',
            'GUIDELINE STEP.1.2: STRATEGIC TEAM ORGANIZATION CHART',
            'INSTRUMENT STEP.1.2: STRATEGIC TEAM TOR',
        ]
    },
    {
        task: "PERFORM INTERNAL SITUATION ANALYSIS",
        subtask: [
            "Understand organization structure and identify the people who can give answers to data and analytics maturity of the organization",
            "Perform internal survey, to understand BD adoption stage and data maturity across organization.",
            "Perform skill gap (can be taught and later executed)",
            "Perform ability gap (cannot be taught, just simply unable to execute)",
        ],
        detail: [
            'BD adoption stage and data maturity across organization, skills analysis, culture – how decisions are made, what you cannot do',
        ],
        template: [
            'GUIDELINE DG.1.4a: DATA MATURITY GUIDELINE',
            'GUIDELINE DG.1.4b: DATA ANALYTICS MATURITY GUIDELINE',
            'INSTRUMENT DG.1.4b: DATA MATURITY SURVEY'
            ,
        ]

    },
    {
        task: "CREATE SENSE OF URGENCY",
        subtask: [
            'Explore the big data market and technology',
            'Perform proxy benchmarking of DA in similar or competitors organization',
            'Identify and examine crises, potential crises, threats, or significant prospects in the near or distant future.',
            'Deliver proof that change is vital ',
            'Identify, express and convey the Big Opportunity ',
            'Relate an outer change factor with a unique capability of the organization (external factors)',
            'Identify the stakes and consequences of not using BDA',
            'Initiate honest dialogues and discussions and seek support from stakeholders, customers, and influential industry leaders to strengthen your standing',
            'Present, convince and get support from top management to spearhead BDA adoption',
        ],
        detail: [
            'Assess any potential threats that could arise in the near or distant future. These threats could involve assessing changes in technology, advancements of your competition, changes in market demand, etc. threats',
            'Give an opportunity for stakeholders to voice concerns and think openly about the big data analytics initiatives',
        ],
        template: [
            'INSTRUMENT STEP.3.1: URGENCY THREATS AND OPPORTUNITIES',
            'INSTRUMENT STEP.3.2: CHALLENGES AND BENEFITS SURVEY',
            'INSTRUMENT STEP.3.3: BIG DATA OPPORTUNITY'

        ]

    },
    {
        task: "BUILD A GUIDING COALITION",
        subtask: [
            'Form a powerful change task force  group with sufficient authority, effective change leaders and key stakeholders to direct the change endeavour',
            'Enable the group to perform together as a team',
        ],
        detail: [
            'Form a powerful change task force  group with sufficient authority, effective change leaders and key stakeholders to direct the change endeavour',
            'Enable the group to perform together as a team'

        ],
        template: [
            'INSTRUMENT STEP.4: TASK FORCE FORMATION',
        ]

    },
]
const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Home
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
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {label.map((item, index) => {
                                    return (
                                        <TableCell key={`label_${index}`}>
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
                                                    <TableCell key={`task_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top' }}>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {item.task}
                                                        </Typography>
                                                    </TableCell>
                                                ) : null}
                                                <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top' }}>
                                                    <Typography gutterBottom fontSize={14}>
                                                        {subtask}
                                                    </Typography>
                                                </TableCell>
                                                {(index < item.detail.length) ? (
                                                    <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top' }}>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {item.detail[index]}
                                                        </Typography>
                                                    </TableCell>
                                                ) : (<TableCell>
                                                </TableCell>)}
                                                {(index < item.template.length) ? (
                                                    <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top' }}>
                                                        <Link>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.template[index]}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                ) : (<TableCell>
                                                </TableCell>)}
                                            </TableRow>
                                        ))
                                    ) : (item.detail.length == maxRows) ? (
                                        item.detail.map((detail, index) => (
                                            <TableRow key={`row_${index}`}>
                                                {(index == 0) ? (
                                                    <TableCell key={`task_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top' }}>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {item.task}
                                                        </Typography>
                                                    </TableCell>
                                                ) : null}
                                                {(index < item.subtask.length) ? (
                                                    <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top' }}>
                                                        <Typography gutterBottom fontSize={14}>
                                                            {item.subtask[index]}
                                                        </Typography>
                                                    </TableCell>
                                                ) : (<TableCell>
                                                </TableCell>)}
                                                <TableCell sx={{ verticalAlign: 'top' }}>
                                                    <Typography key={`detail_${id}_${index}`} gutterBottom fontSize={14}>
                                                        {detail}
                                                    </Typography>
                                                </TableCell>
                                                {(index < item.template.length) ? (
                                                    <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top' }}>
                                                        <Link>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.template[index]}
                                                            </Typography>
                                                        </Link>
                                                    </TableCell>
                                                ) : (<TableCell>
                                                </TableCell>)}
                                            </TableRow>
                                        ))

                                    ) :
                                        (item.template.length == maxRows) ? (
                                            item.template.map((template, index) => (
                                                <TableRow key={`row_${index}`}>
                                                    {(index == 0) ? (
                                                        <TableCell key={`task_${id}_${index}`} rowSpan={maxRows} sx={{ verticalAlign: 'top' }}>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.task}
                                                            </Typography>
                                                        </TableCell>
                                                    ) : null}
                                                    {(index < item.subtask.length) ? (
                                                        <TableCell key={`subtask_${id}_${index}`} sx={{ verticalAlign: 'top' }}>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.subtask[index]}
                                                            </Typography>
                                                        </TableCell>
                                                    ) : (<TableCell>
                                                    </TableCell>)}
                                                    {(index < item.detail.length) ? (
                                                        <TableCell key={`detail_${id}_${index}`} sx={{ verticalAlign: 'top' }}>
                                                            <Typography gutterBottom fontSize={14}>
                                                                {item.detail[index]}
                                                            </Typography>
                                                        </TableCell>
                                                    ) : (<TableCell>
                                                    </TableCell>)}
                                                    <TableCell key={`template_${id}_${index}`} sx={{ verticalAlign: 'top' }} >
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
                </TableContainer>
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