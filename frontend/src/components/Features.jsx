import React from 'react'
import Card from './Card'



const Features = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-10">
      <Card
        title="Crypto payments" 
        badge="Etherium" 
        // description="30 Mins | 1 Serving"
        image="https://example.com/front-image.jpg"
        backImage="https://example.com/back-image.jpg"
      />
      
      <Card 
        title="Custom cab allocation" 
        badge="book now" 
        // description="40 Mins | 2 Servings"
        image="https://example.com/chicken-front.jpg"
        backImage="https://example.com/chicken-back.jpg"
      />

      <Card 
        title="Personal Assistant " 
        badge="With you 18X7" 
        // description="15 Mins | 1 Serving"
        image="https://example.com/salad-front.jpg"
        backImage="https://example.com/salad-back.jpg"
      />
    </div>
  )
}

export default Features
