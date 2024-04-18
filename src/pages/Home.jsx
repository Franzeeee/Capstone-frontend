import React, { useContext, useState } from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { DashboardContent } from '../components/DashboardContent'

export const Home = () => {
  return (
    <MainTemplate>
        <div className="col-sm-6" style={{border: '1px solid red'}}>
          Col 2 
          <DashboardContent />
        </div>
    </MainTemplate>
  )
}
