import { Loading } from '@nextui-org/react'
import React from 'react'
import OnboardingCatchUp from '../auth/onboarding/OnboardingCatchUp'

const LoadingState = () => {
  return (
    <div className=" h-screen flex justify-center items-center text-elm-300">
      <Loading color='currentColor' size="xl" />
      <OnboardingCatchUp />
    </div>
  )
}

export default LoadingState