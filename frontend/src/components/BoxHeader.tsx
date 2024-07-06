import { Box } from "@mui/material"
import { themeSettings } from "../theme"

interface props{
    title : string, 
    subtitle? : string, 
    extra? : string
}

export const BoxHeader = ({title , subtitle, extra}:props)=>{
    return(
        <Box sx={{ m:'15px',display:'flex', justifyContent:"space-between"}}>
            <Box>
                <Box fontSize='100%' sx={{color:themeSettings.palette.grey[400]}}>{title}</Box>
                <Box fontSize='75%' sx={{color:themeSettings.palette.grey[600]}}>{subtitle}</Box>
            </Box>
            <Box sx={{color:themeSettings.palette.secondary[500]}}>{extra}</Box>

        </Box>
    )
}