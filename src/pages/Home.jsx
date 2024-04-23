import React, { useContext, useState } from 'react'
import { MainTemplate } from '../templates/MainTemplate'
import { DashboardContent } from '../components/DashboardContent'

export const Home = () => {
  return (
    <MainTemplate>
        <div className="row homeContainer" >
          <DashboardContent />
        </div>
    </MainTemplate>
  )
}
