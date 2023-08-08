// import styled from "@emotion/styled";
import { Divider, Link, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { DataTable } from "../components/task-table";
import { Box } from "@mui/system";
import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout"
import { PropTypes } from "prop-types";
import { useState } from "react";
const phase = [
    { title: 'Strategic Teams Setup and Enculturation Preparation' },
    { title: 'Business Understanding' },
    { title: 'Data Management and Understanding' },
    { title: 'Data Governance' },
    { title: 'Tools, Technology and Infrastructure Procurement' },
    { title: 'Project Planning' },
    { title: 'Data Preparation' },
    { title: 'Data Product Modelling' },
    { title: 'Data Product Development' },
    { title: 'Model and Product' },
    { title: 'Evaluation' },
    { title: 'Data Product Deployment' }
]

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box component="div"
                    display='flex'
                    minHeight="400px"
                    flexDirection="column"
                    sx={{
                        paddingTop: 3,
                        overflow: "auto"
                    }}
                    maxHeight="600px">
                    {children}
                </Box>
            )}

        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}




const Page = () => {
    const [tabValue, setTabValue] = useState(0)
    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    }

    return (
        <>
            <Head>
                <title>
                    ADiBA | 12 Phase Framework
                </title>
            </Head>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingY: '70px',
                    paddingX: '40px',
                    margin: '0px'
                }}
            >
                <Box sx={{margin: '40px'}} display={'flex'}>
                    <Tabs
                        orientation="vertical"
                        variant="fullwidth"
                        onChange={handleTabChange}
                        value={tabValue}
                        centered
                        indicatorColor="primary"
                        scrollButtons='auto'
                        selectionFollowsFocus
                        sx={{ borderRight: 1, borderColor: 'divider' }}

                    >
                        {phase.map((item) => {
                            return (
                                <Tab
                                    key={item.title}
                                    label={item.title}
                                    style={{
                                        width: '200px',
                                    }} />
                            )
                        })}
                    </Tabs>
                    <Divider orientation="vertical" />
                    <TabPanel value={tabValue} index={0}>
                        Item 1
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        Item 2
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        Item 3
                    </TabPanel>
                    <TabPanel value={tabValue} index={3}>
                        Item 4
                    </TabPanel>
                    <TabPanel value={tabValue} index={4}>
                        Item 5
                    </TabPanel>
                    <TabPanel value={tabValue} index={5}>
                        Item 6
                    </TabPanel>
                    <TabPanel value={tabValue} index={6}>
                        Item 7
                    </TabPanel>
                    <TabPanel value={tabValue} index={7}>
                        Item 8
                    </TabPanel>
                    <TabPanel value={tabValue} index={8}>
                        Item 9
                    </TabPanel>
                    <TabPanel value={tabValue} index={9}>
                        Item 10
                    </TabPanel>
                    <TabPanel value={tabValue} index={10}>
                        Item 11
                    </TabPanel>
                    <TabPanel value={tabValue} index={11}>
                        Item 12
                    </TabPanel>
                </Box>
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