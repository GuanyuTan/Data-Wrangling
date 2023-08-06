// import styled from "@emotion/styled"
import { Button, Fab, styled } from "@mui/material"
import { Box } from "@mui/system";
import LayersIcon from '@mui/icons-material/Layers';
import Image from "next/image";


const anglediff = (theta) => {
    return (
        90 - theta / 2
    )
}
const innerCircleX = (theta) => {
    const x = 1 / 2 + 3 * Math.cos(theta * Math.PI / 180) / 8
    return (
        x
    )
}
const innerCircleY = (theta) => {
    const y = -1 / 2 + 3 * Math.sin(theta * Math.PI / 180) / 8
    return (
        y
    )
}

export const StyledButton = styled(Button)`
${({ theme }) => `
position:relative;
background-color: ${theme.palette.primary.main};
top:0;
left:0;
right:0;
bottom:0;
border-radius:50%;
height:100%;
width: 100%;
transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
})};
clip-path: 
    polygon(71.651% 37.5%, 71.429% 37.124%, 71.201% 36.752%, 70.967% 36.384%, 70.726% 36.02%, 70.479% 35.661%, 70.225% 35.305%, 69.966% 34.955%, 69.7% 34.608%, 69.429% 34.267%, 69.151% 33.93%, 68.868% 33.599%, 68.579% 33.272%, 68.284% 32.95%, 67.983% 32.634%, 67.678% 32.322%, 67.366% 32.017%, 67.05% 31.716%, 66.728% 31.421%, 66.401% 31.132%, 66.07% 30.849%, 65.733% 30.571%, 65.392% 30.3%, 65.045% 30.034%, 64.695% 29.775%, 64.339% 29.521%, 63.98% 29.274%, 63.616% 29.033%, 63.248% 28.799%, 62.876% 28.571%, 62.5% 28.349%, 62.12% 28.135%, 61.737% 27.926%, 61.35% 27.725%, 60.959% 27.53%, 60.565% 27.342%, 60.168% 27.161%, 59.768% 26.987%, 59.365% 26.82%, 58.959% 26.66%, 58.551% 26.508%, 58.139% 26.362%, 57.725% 26.224%, 57.309% 26.092%, 56.891% 25.968%, 56.47% 25.852%, 56.048% 25.743%, 55.624% 25.641%, 55.198% 25.546%, 54.77% 25.459%, 54.341% 25.38%, 53.911% 25.308%, 53.479% 25.243%, 53.047% 25.186%, 52.613% 25.137%, 52.179% 25.095%, 51.744% 25.061%, 51.308% 25.034%, 50.872% 25.015%, 50.436% 25.004%, 50.0% 25.0%, 50% 0, 100% 0, 93.12% 25%);
&:hover {
    variant: "extended";
    background-color: ${theme.palette.primary.dark};
     ;
    }
`}`;

export const AdibaCircularButtonGraph = () => {
    const width = 300
    const height = 300
    return (
        <Box sx={{ width: width, height: height, position: 'relative' }}>

            <Box sx={{ width: 85, height: 85 / 2, position: 'absolute', left: width / 2 - 85 / 2, top: height / 2 - 85 / 4 }}>
                <Image src='/adiba.png' width={85} height={85 / 2} alt='logo'>

                </Image>
            </Box>
            <StyledButton sx={{
                position: 'absolute',
                "&:hover": {
                    transform: 'scale(1.1)'
                },
            }}>
                <LayersIcon
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        transform: `translate(${innerCircleX(anglediff(60)) * width - width / 2}px, ${-innerCircleY(anglediff(60)) * height - height / 2}px)`
                    }}>

                </LayersIcon>
            </StyledButton>
            <StyledButton sx={{
                position: 'absolute',
                transform: 'rotate(60deg)',
                "&:hover": {
                    transform: 'rotate(60deg) scale(1.1)'
                },
            }}>
                <LayersIcon
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        transform: `translate(${innerCircleX(anglediff(60)) * width - width / 2}px, ${-innerCircleY(anglediff(60)) * height - height / 2}px) rotate(-60deg)`
                    }}>

                </LayersIcon>

            </StyledButton>
            <StyledButton sx={{
                position: 'absolute',
                transform: 'rotate(120deg)',
                "&:hover": {
                    transform: 'rotate(120deg) scale(1.1)'
                },
            }}>
                <LayersIcon
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        transform: `translate(${innerCircleX(anglediff(60)) * width - width / 2}px, ${-innerCircleY(anglediff(60)) * height - height / 2}px) rotate(-120deg)`
                    }}>

                </LayersIcon>

            </StyledButton>
            <StyledButton sx={{
                position: 'absolute',
                transform: 'rotate(180deg)',
                "&:hover": {
                    transform: 'rotate(180deg) scale(1.1)'
                },
            }}>
                <LayersIcon
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        transform: `translate(${innerCircleX(anglediff(60)) * width - width / 2}px, ${-innerCircleY(anglediff(60)) * height - height / 2}px) rotate(-180deg)`
                    }}>

                </LayersIcon>

            </StyledButton>
            <StyledButton sx={{
                position: 'absolute',
                transform: 'rotate(240deg)',
                "&:hover": {
                    transform: 'rotate(240deg) scale(1.1)'
                },
            }}>
                <LayersIcon
                    sx={{
                        color: 'white',
                        position: 'absolute',
                        transform: `translate(${innerCircleX(anglediff(60)) * width - width / 2}px, ${-innerCircleY(anglediff(60)) * height - height / 2}px) rotate(-240deg)`
                    }}>

                </LayersIcon>

            </StyledButton>
        </Box>
    )
}