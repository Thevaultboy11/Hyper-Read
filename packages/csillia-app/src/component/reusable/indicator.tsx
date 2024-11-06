import React from 'react'
import { CgTrending, CgTrendingDown } from "react-icons/cg";

function IndicatorPositive(props:any) {
  return (
    <>
        <div className="flex justify-between rounded-xl bg-green-200">
            <CgTrending className='ml-0.5 mr-0.5 text-green-600'/>
            <p className='text-sm font-normal ml-0.5 mr-0.5 text-green-600'>{props.value}</p>
        </div>
    </>
  )
}

function IndicatorNegative(props:any) {
    return (
      <>
          <div className="flex justify-between rounded-xl bg-red-200">
              <CgTrendingDown className='ml-0.5 mr-0.5 text-red-600'/>
              <p className='text-sm font-normal ml-0.5 mr-0.5 text-red-600'>{props.value}</p>
          </div>
      </>
    )
  }

export { IndicatorPositive, IndicatorNegative }