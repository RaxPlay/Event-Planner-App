import React from 'react'

export const Home = ({user}) => {
  return (
    <div>
      { user ? (
        <div>
          Welcome {user.username}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
