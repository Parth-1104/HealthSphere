import React from 'react';
import styled from 'styled-components';

const Card = ({ title, badge, description, image, backImage }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          {/* Back Side (Appears After Flip) */}
          <div className="back">
            <div className="back-content">
              {/* Back Image (Dynamic) */}
              <img 
                src={backImage} 
                alt="Back Side" 
                className="w-32 h-32 object-cover rounded-lg"
              />
              <strong>Hover Me</strong>
            </div>
          </div>

          {/* Front Side */}
          <div className="front">
            <div className="img">
              <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>

            <div className="front-content">
              <small className="badge">{badge}</small>
              <div className="description">
                <div className="title">
                  <p className="title">
                    <strong>{title}</strong>
                  </p>
                </div>
                <p className="card-footer">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

// Styled Wrapper (Same as Before)
const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 190px;
    height: 254px;
  }
  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
  }
  .front, .back {
    background-color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card:hover .content {
    transform: rotateY(180deg);
  }
`;

export default Card;
