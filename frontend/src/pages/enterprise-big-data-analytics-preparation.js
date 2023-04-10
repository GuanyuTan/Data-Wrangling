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
        task: "SET UP STRATEGIC PLANNING TEAM",
        refs: '-',
        subtask: [
            'Set up team responsible for steering, planning and monitoring Big Data Analytics adoption and implementation in organization',
        ],
        detail: [
            [
                'Need to appoint people to be in-charge of the steering, planning and monitoring the Big Data Analytics adoption and implementation',
            ]
        ],
        template: [
            [
                'GUIDELINE STEP.1.1: STEERING TEAM ORGANIZATION CHART',
                'GUIDELINE STEP.1.2: STRATEGIC TEAM ORGANIZATION CHART',
                'INSTRUMENT STEP.1.2: STRATEGIC TEAM TOR',
            ]
        ]
    },
    {
        task: "PERFORM INTERNAL SITUATION ANALYSIS",
        refs: '-',
        subtask: [
            "Understand organization structure and identify the people who can give answers to data and analytics maturity of the organization",
            "Perform internal survey, to understand BD adoption stage and data maturity across organization.",
            "Perform skill gap (can be taught and later executed)",
            "Perform ability gap (cannot be taught, just simply unable to execute)",
        ],
        detail: [
            [
                'BD adoption stage and data maturity across organization, skills analysis, culture – how decisions are made, what you cannot do',
            ]
        ],
        template: [
            [
                'GUIDELINE DG.1.4a: DATA MATURITY GUIDELINE',
                'GUIDELINE DG.1.4b: DATA ANALYTICS MATURITY GUIDELINE',
                'INSTRUMENT DG.1.4b: DATA MATURITY SURVEY'
            ]
            ,
        ]

    },
    {
        task: "CREATE SENSE OF URGENCY",
        refs: 'KOTTER’s',
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
            [
                'Assess any potential threats that could arise in the near or distant future. These threats could involve assessing changes in technology, advancements of your competition, changes in market demand, etc. threats',
                'Give an opportunity for stakeholders to voice concerns and think openly about the big data analytics initiatives',
            ]
        ],
        template: [
            [
                'INSTRUMENT STEP.3.1: URGENCY THREATS AND OPPORTUNITIES',
                'INSTRUMENT STEP.3.2: CHALLENGES AND BENEFITS SURVEY',
                'INSTRUMENT STEP.3.3: BIG DATA OPPORTUNITY'
            ]

        ]

    },
    {
        task: "BUILD A GUIDING COALITION",
        refs: 'KOTTER’s',
        subtask: [
            'Form a powerful change task force  group with sufficient authority, effective change leaders and key stakeholders to direct the change endeavour',
            'Enable the group to perform together as a team',
        ],
        detail: [
            [
                'Form a powerful change task force  group with sufficient authority, effective change leaders and key stakeholders to direct the change endeavour',
                'Enable the group to perform together as a team'
            ]

        ],
        template: [
            [
                'INSTRUMENT STEP.4: TASK FORCE FORMATION',
            ]
        ]

    },
    {
        task: "FORM STRATEGIC VISION AND INITIATIVES",
        refs: 'KOTTER’s',
        subtask: [
            'Devise the procedures for acquiring that vision',
            'Construct a vision, mission, main strategy and core values to support the change effort',
        ],
        detail: [
            [
                'Encourages individuals to take part in vision, mission, main strategy and core values formulation',
                'Coordinates and aligns their actions'
            ]

        ],
        template: [
            [
                'INSTRUMENT STEP.5: VISION, CORE VALUES, & STRATEGIES',
            ]
        ]

    },
    {
        task: "ENLIST A VOLUNTEER ARMY",
        refs: 'KOTTER’s',
        subtask: [
            'Explore, and identify every route possible to convey the new vision and strategies',
            'Develop BDA allies through engagement within organization – (detail)',
            'Develop simple communication efforts',
        ],
        detail: [
            [
                'Conduct a series of sharing session to communicate the vision of analytic culture convincingly.'
            ]

        ],
        template: [
            [
                'INSTRUMENT STEP.6: COMMUNICATE THE VISION',
            ]
        ]

    },
    {
        task: "REMOVE BARRIERS",
        refs: 'KOTTER’s',
        subtask: [
            'Identify barriers of BDA and how to tackle',
        ],
        detail: [
            [
                'Ensure that the organizational processes and structure are in place and aligned with the overall organizational big data vision. Reward people for endorsing change and supporting in the process.'
            ]

        ],
        template: [
            [
                'INSTRUMENT STEP.7: BARRIERS AND SOLUTIONS',
            ]
        ]

    },
    {
        task: "GENERATE SHORT-TERM WINS",
        refs: 'KOTTER’s',
        subtask: [
            'Introduce case study and new data driven analytics culture in a top-value domain of the organization',
            'Plan and construct short-term case study wins',
            'Plan and construct visible performance improvements through case study',
            'Acknowledge and reward employees involved in the improvements through big data analytics'
        ],
        detail: [
            [
                'Create short term wins of Big Data Analytics',
                'Create many short term targets instead of one long-term goal, which are achievable and less expensive and have lesser possibilities of failure.'
            ]

        ],
        template: [
            [
                'INSTRUMENT STEP.8: TARGETS',
            ]
        ]

    },
]
const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Enterprise Big Data Analytics Preparation
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