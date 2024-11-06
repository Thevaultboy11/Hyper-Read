import React from 'react'
import { Paper } from '@mui/material'
import Skeleton from '@mui/material/Skeleton';

function CurvedLineChartSkeleton() {
  return (
    <>
        <Paper className="col-span-12" elevation={3}>
        <div className="row">
            <div className="md:col-span-6 col-span-12 p-5 ml-5">
            <p className="text-xl font-normal"><Skeleton variant='text' width={60} height={40} /></p>
            </div>
            <div className="col-span-12 pl-10 pb-5 pr-10">
                <Skeleton variant='rounded' height={200} />
            </div>
        </div>
        </Paper>
    </>
  )
}

export default CurvedLineChartSkeleton