
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import { Colors } from '../../../contexts/themeContext/themes';
import { FC } from 'react';
import { Box } from '@mui/material';

interface CommentSkeletonProps {
    bodyColor: Colors;
    subBarColor: Colors;
    boxColor: Colors;
    color: Colors;
    lineColor: Colors;
    darkColor: Colors;
}

export const CommentSkeleton: FC<CommentSkeletonProps> = ({
    bodyColor, subBarColor, boxColor, color, lineColor, darkColor }) => {
    return (
        <Card
            variant="outlined"
            sx={{    
                padding: "10px",
                width: '100%',
                margin: 0, 
                bgcolor: bodyColor,
                borderRadius: "5px",
                borderBottomRightRadius: "0",
                borderBottomLeftRadius: "0"}}>
            <CardContent orientation="horizontal">
                <div>
                    <Skeleton
                        sx={{
                            bgcolor: subBarColor,
                            marginBottom: "5px",

                            '&::before': {
                                backgroundColor: subBarColor,
                            },
                        }}
                        animation="wave"
                        variant="text"
                        height={15}
                        width={100} />
                    <Skeleton
                        sx={{
                            bgcolor: color,
                            marginBottom: "5px",

                            '&::before': {
                                backgroundColor: color,
                            },
                        }}
                        animation="wave"
                        level="body-sm"
                        variant="text"
                        height={15}
                        width={200} />
                </div>
            </CardContent>
            <CardContent sx={{ gap: 0.5, mt: 1 }}>
                <Skeleton
                    sx={{
                        bgcolor: boxColor,
                        marginBottom: "5px",

                        '&::before': {
                            backgroundColor: boxColor,
                        },
                    }}
                    level="body-xs"
                    variant="text"
                    animation="wave"
                    height={15}
                    width="92%" />
                <Skeleton
                    sx={{
                        bgcolor: lineColor,
                        marginBottom: "5px",

                        '&::before': {
                            backgroundColor: lineColor,
                        },
                    }}
                    level="body-xs"
                    variant="text"
                    animation="wave"
                    height={15}
                    width="99%" />
                <Skeleton
                    sx={{
                        bgcolor: darkColor,
                        marginBottom: "5px",

                        '&::before': {
                            backgroundColor: darkColor,
                        },
                    }}
                    level="body-xs"
                    variant="text"
                    animation="wave"
                    height={15}
                    width="96%" />
            </CardContent>
        </Card>
    );
}