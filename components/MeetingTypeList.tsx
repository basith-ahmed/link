"use client"

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'

const MeetingTypeList = () => {

    const router = useRouter()

    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting'>()

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start a new meeting"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        color="bg-orange-1"
        />
        <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Shedule a new meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        color="bg-blue-1"
        />
        <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="View invitation link"
        handleClick={() => router.push('/recordings')}
        color='bg-purple-1'
        />
        <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check your recordings"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        color="bg-yellow-1"
        />
    </section>
  )
}

export default MeetingTypeList