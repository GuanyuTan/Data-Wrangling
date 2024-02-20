import Head from "next/head";
import PropTypes from "prop-types";
import { DashboardLayout } from "../components/dashboard-layout";
import { Box, Button, Divider, Fade, Grid, Paper, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box
          component="div"
          display="flex"
          minHeight="400px"
          flexDirection="column"
          sx={{
            paddingTop: 3,
            overflow: "auto",
          }}
          maxHeight="600px"
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const useInInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    }
  }, [ref, observer]);
  return isIntersecting
}

const Page = () => {
  const divRef1 = useRef(false);
  const divRef2 = useRef(false);
  const divRef3 = useRef(false);

  const inView1 = useInInViewport(divRef1);
  const inView2 = useInInViewport(divRef2);
  const inView3 = useInInViewport(divRef3);


  return (
    <>
      <Head>
        <title>Data Wrangling</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: "80px",
        }}
      >
        <Box
          ref={divRef1}
          sx={{
            display:
              "flex",
            width: '100%',
            paddingY: "40px",
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(to bottom, #B2E0F2, #F9FAFC)',
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              width: "1000px",
              padding: "px"
            }}
          >
            <Fade in={inView1} appear={true} timeout={{ enter: 2000 }}>
              <Grid
                item
                lg={6}
                display={"flex"}
                flexDirection="column"
                justifyContent={"space-between"}
              >
                <Box>
                  <Box sx={{ marginBottom: "5px" }}>
                    <Typography variant="h1" color="">
                      Accelerating Digital Transformation through Big Data
                      Adoption
                    </Typography>
                    <Typography variant="h1" color="">(ADiBA)</Typography>
                  </Box>
                  <Box sx={{ marginBottom: "5px" }}>
                    <Typography variant="body" fontSize={20} color="">
                      Business digitalization journey made easy with data
                      analytics
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Box marginRight="5px">
                    <Button
                      variant="contained"
                      sx={{
                      }}>TRY FOR FREE</Button>
                  </Box>
                  <Box>
                    <Button >SEE HOW IT WORKS</Button>
                  </Box>
                </Box>
              </Grid>
            </Fade>
            <Fade in={inView1} appear={true} timeout={{ enter: 2000 }}>
              <Grid
                item
                lg={6}
                display={"flex"}
                flexGrow={1}
                alignSelf={"center"}
              >
                <Image
                  src={"/illus-2.png"}
                  width="500px"
                  height={`${500 * 0.7}px`}
                ></Image>
              </Grid>
            </Fade>
          </Grid>
        </Box>

        <Fade in={inView2} appear={true} timeout={{ enter: 2000 }}>
          <Box
            ref={divRef2}
            sx={{
              display: "flex",
              m: "30px",
              paddingX: "20px",
              width: "1000px",
              paddingY: "40px",

              justifyContent: "",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                p: "0px",
                paddingBottom: "5px",
                justifyContent: "",
              }}
            >
              <Grid
                item
                lg={5}
                display={"flex"}
                flexDirection="column"
                justifyContent={"space-between"}
              >
                <Box>
                  <Typography variant="h1">
                    Bring Your Business To A New Height
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontSize={18}>
                    Tapping into the power of Big Data Analytics.
                  </Typography>
                  <br></br>
                  <Typography variant="body" fontSize={18}>
                    Transform your business in Digitalization Age.
                  </Typography>
                </Box>
                <Box marginRight="5px" marginTop="7px">
                  <Button variant="contained">TRY FOR FREE</Button>
                </Box>
              </Grid>
              <Grid item lg={7} height={"100%"}>
                <Box display="flex" justifyContent="center" padding="auto">
                  <Image src={"/illus-3.png"} width={500} height={400}>
                    {/* <a href="https://storyset.com/business">Business illustrations by Storyset</a> */}
                  </Image>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Box
          ref={divRef3}
          sx={{
            display: "flex",
            width: '100%',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(to top, #B2E0F2, #F9FAFC)',
            paddingY: "40px",
          }}
        >
          <Fade in={inView3} appear={true} timeout={{ enter: 2000 }}>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                m: "20px",
                p: "0px",
                width: "1000px",
                justifyContent: "",
              }}
            >
              <Grid
                item
                lg={6}
                display={"flex"}
                flexDirection="column"
                justifyContent={"space-between"}
              >
                <Box>
                  <Typography variant="h2">
                    A Step-by-step Digital Transformation guide using Big Data
                    Analytics.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontSize={18}>
                    Wow this project is awesome! Let me tell you why right here,
                    right now.
                  </Typography>
                </Box>
                <Box marginRight="5px" marginTop="7px">
                  <Button variant="contained">SIGN UP NOW</Button>
                </Box>
              </Grid>
              <Grid
                item
                lg={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ marginBottom: "7px" }}>
                  <Typography variant="h2">Step 1: Register</Typography>
                  <Typography variant="body" fontSize={18}>
                    Register with us!
                  </Typography>
                  <br />
                  <Typography variant="body" fontSize={18}>
                    Let our experts help you in your digital transformation
                    planning journey.
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: "7px" }}>
                  <Typography variant="h2">Step 2: Use Our Tools</Typography>
                  <Typography variant="body" fontSize={18}>
                    Follow the step-by-step guides in our 12+1 process framework
                    to roll out your digital transformation plan.
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: "7px" }}>
                  <Typography variant="h2">Step 3: Engage With Us</Typography>
                  <Typography variant="body" fontSize={18}>
                    Our experts will assist you in a hand-holding approach.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Box >
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
