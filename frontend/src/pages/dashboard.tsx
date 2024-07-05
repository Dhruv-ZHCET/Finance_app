// import { useTheme } from "@emotion/react"
import { Box, useMediaQuery } from "@mui/material"
import { DashboardCard } from "../components/DashboardCard";
const gridParam = 
`
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
`
const gridmallScreen = 
`
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"
`
export const Dashboard = ()=>{
    // const {palette} = useTheme()
    const isAbove = useMediaQuery("(min-width:1200px)")
    return(
        <Box width="100%" height="100%" display="grid" gap="1.5rem"
        sx={isAbove?{gridTemplateAreas:gridParam, gridTemplateColumns:"repeat(3,minmax(370px,1fr))", gridTemplateRows:"repeat(10,minmax(60px,1fr))"}:
        {gridTemplateAreas:gridmallScreen,gridAutoColumns:"1fr", gridAutoRows:"80px"}
    }>
            <DashboardCard gridArea="b" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="a" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="c" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="d" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="e" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="f" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="h" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="g" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="i" bgcolor="#fff">Hello</DashboardCard>
            <DashboardCard gridArea="j" bgcolor="#fff">Hello</DashboardCard>
        </Box>
    )
}