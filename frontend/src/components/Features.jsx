import React from 'react'
import Card from './Card'

const Features = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text  text-center">
        OUR FEATURES
      </h1>

      <div className="flex flex-wrap gap-6 justify-center p-10">
        <Card
          title="Book appointment with top doctors"
          badge="Specialist"
          description="Book appointment with top doctors of India"
          image=""
          animationDelay="0"
        />

        <Card
          title="Crypto payments"
          badge="Ethereum"
          description="Secure and fast transactions using blockchain technology"
          image=""
          animationDelay="0"
        />

        <Card
          title="Custom cab allocation"
          badge="Book now"
          description="Priority ride matching with preferred drivers"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtOKMVHgwuIrj1rGohIB7meHX6D7eaNFBGXw&s"
          backImage="/api/placeholder/400/300"
          animationDelay="100"
        />

        <Card
          title="Personal Assistant"
          badge="With you 24/7"
          description="Dedicated support for all your travel needs"
          image=""
          backImage="/api/placeholder/400/300"
          animationDelay="200"
        />
      </div>
    </div>
  )
}

export default Features
