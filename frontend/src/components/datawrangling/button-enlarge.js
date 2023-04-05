import { Fab, styled, Avatar } from "@mui/material"
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export const StyledButton = styled(Fab)`
${({ theme }) => `
cursor: pointer;
background-color: ${theme.palette.primary.main};
transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
})};
&:hover {
    variant: "extended";
    background-color: ${theme.palette.primary.dark};
    transform: scale(1.3);
  }
`}
`;

