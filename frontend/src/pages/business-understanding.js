// import styled from "@emotion/styled";
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
        task: "IDENTIFY BUSSINESS GOAL",
        refs: 'CRISP-DM',
        subtask: [
            'BU.1.1 Understand & develop business overview write-up',
            'BU.1.2 Identify business goals and objectives',
            'BU.1.3 Review current environment',
            'BU.1.4 Identify strength, weaknesses, challenges and opportunities',
            'BU.1.5 Identify related regulations, acts and compliance needs regarding data'


        ],
        detail: [
            ['Functions, Organizational structure, department, roles, in what sector the business'],
            ['Vision, mission, core values, aim and objectives, KPI, Critical Success Factors (CSF)'],
            ['Who is the customers, supplier, suppliers for supplier, competitor, chain of reporting, stakeholders? \nExternal Environment:\nCustomers, Beneficiaries \nCompetitors (Traditional/Non-traditional - not usual key players in the field, i.e.: Air Asia in healthcare)\nSuppliers (i.e.: stability of supplies)\nOthers: weather, external labour forces, sentiment market, competing products, etc.\nParent Organizations'],
            ['Identify strength, weaknesses, challenges and opportunities with regard to current environment. (BU.1.3)'],
            ['List regulations, acts and compliance needs regarding data.']
        ],
        template: [
            ['INSTRUMENT BU.1.1: BUSINESS OVERVIEW'],
            ['INSTRUMENT BU.1.2: BUSINESS GOALS AND OBJECTIVES'],
            ['GUIDELINE BU.1.3: CURRENT ENVIRONMENT', 'INSTRUMENT BU.1.3: CURRENT ENVIRONMENT'],
            ['GUIDELINE BU.1.4: SWOT ANALYSIS', 'INSTRUMENT BU.1.4: SWOT ANALYSIS'],
            ['INSTRUMENT BU.1.5: LIST OF REGULATIONS, ACTS AND COMPLIANCE']
        ]
    },
    {
        task: "ASSESS SITUATION",
        refs: 'CRISP-DM',
        subtask: [
            "BU.2.1 Assess Decision Points of SWOT (BU.2.1)",
            "BU.2.2 Assess Decision Points of  functions, by role, by committee",
            "BU.2.3 Assess Decision Points of  objective and goal of enterprise",
            "Perform ability gap (cannot be taught, just simply unable to execute)",
        ],
        detail: [
            ['Identify major decision points, pain points, and potential strategic advantage opportunity areas',]
        ],
        template: [
            [
                'INSTRUMENT BU.2.1: SWOT ANALYSIS with DECISION POINTS',
                'GUIDELINE BU.2.2.1: BUSINESS OPPORTUNITIES',
                'GUIDELINE BU.2.2.2: IDENTIFYING BUSINESS OPPORTUNITIES',
                'GUIDELINE BU.2.2.3: EXAMPLE OF BUSINESS OPPORTUNITIES',
                'INSTRUMENT BU.2.2: BUSINESS OPPORTUNITIES',
                'INSTRUMENT BU.2.3: ORGANIZATIONAL  DRIVERS, GOALS & OBJECTIVES'
            ]
        ]

    },
    {
        task: "DEFINE DATA ANALYTICS GOALS OR INSIGHTS",
        refs: 'CRISP-DM',
        subtask: [
            'BU.3.1 Identify Analytics Goals of SWOT (BU.2.1)',
            'BU.3.2 Identify Analytics Goals of  functions, by role, by committee',
            'BU.3.3 Identify Analytics Goals of  objective and goal of enterprise'
        ],
        detail: [
            ['Identify the objectives of business opportunities detection, fraud detection or problem detection, process improvements (Cost improvements, Duration improvements), recommendations.',]
        ],
        template: [
            [
                'GUIDELINE BU.3.1:  SAMPLE QUESTIONS TO IDENTIFY INSIGHTS',
                'GUIDELINE BU.3.2: SAMPLE INSIGHTS FROM AND FOR BUSINESS PROCESS',
                'INSTRUMENT BU.3.1: SWOT ANALYSIS with INSIGHTS',
                'INSTRUMENT BU.3.2: BUSINESS OPPORTUNITIES with INSIGHTS',
                'INSTRUMENT BU.3.3: ORGANIZATIONAL DRIVERS, GOALS & OBJECTIVES with INSIGHTS'

            ]
        ]

    },
]
const Page = () => {

    return (
        <>
            <Head>
                <title>
                    Business Understanding
                </title>
            </Head>
            <Box
                sx={{
                    display:'flex',
                    // alignItems: 'center',
                    paddingY: '70px',
                    paddingX: '40px',
                    margin: '0px'
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