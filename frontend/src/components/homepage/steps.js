import { Card, Box, Typography, IconButton, CardContent } from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useState } from "react";

export const Steps = () => {
    const [index, setIndex] = useState(0);
    const handleNext = (e) => {
        if (index < 3) {
            setIndex(index + 1)
        }
    }
    const handlePrev = (e) => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }
    return (
        <Card elevation={4} sx={{ backgroundColor: "rgba(243, 244, 246, 0.2)", marginBottom: "7px", height: "300px", margin: "auto", display: "flex" }}>
            <CardContent sx={{ display: 'flex', alignItems: "center" }}>
                <Box sx={{ flexGrow: 0, marginRight: "5px" }}>
                    <IconButton onClick={handlePrev} disabled={index==0}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                </Box>

                <Box flexGrow={1}>
                    <SwipeableViews index={index}>
                        <div>
                            <Typography variant="h2">Step 1: Register</Typography>
                            <Typography variant="body" fontSize={18}>
                                Register with us!
                            </Typography>
                            <br />
                            <Typography variant="body" fontSize={18}>
                                Let our experts help you in your digital transformation planning journey.
                            </Typography>
                        </div>
                        <div>

                            <Typography variant="h2">Step 2: Use Our Tools</Typography>
                            <Typography variant="body" fontSize={18}>
                                Follow the step-by-step guides in our 12+1 process framework
                                to roll out your digital transformation plan.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h2">Step 3: Engage With Us</Typography>
                            <Typography variant="body" fontSize={18}>
                                Our experts will assist you in a hand-holding approach.
                            </Typography>
                        </div>
                    </SwipeableViews>
                </Box>
                <Box flexGrow={0}>
                    <IconButton onClick={handleNext}  disabled={index==2}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    )
}