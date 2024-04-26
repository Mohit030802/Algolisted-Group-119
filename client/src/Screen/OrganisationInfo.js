import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CCHeader from '../Components/CCHeader'
import OILeftMenu from '../Components/OILeftMenu'
import ContributorWork from './ContributorWork'
import { useParams } from 'react-router-dom';
import AboutUs from './AboutUs'


import Contributors from './Contributors'
import BuyMeACoffee from '../Components/BuyMeACoffee'
import CCHeaderDarkPlus from '../Components/CCHeaderPlus'

const OrganisationInfo = () => {
    const params = useParams();
    const { showpage } = params;
    console.log(showpage);

    return ( 
        <GrandContainer>
            <MobContainer>
                We are still working on Responsive Version of the website, please view the site with 
                width more than 1100px, a standard laptop or tablet landscape. 
                <img src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" alt="" />
            </MobContainer>
            <Container>
                <CCHeaderDarkPlus />
                <OILeftMenu marked={showpage} />
                <div className="cc-middle-content">
                 
                  {
                    showpage == "all-contributors" ? (<Contributors/>) : (<></>)
                  }
                  {
                    showpage == "contributor-work" ? (<ContributorWork/>) : (<></>)
                  }
                  {
                    showpage == "about-us" ? (<AboutUs/>) : (<></>)
                  }
                 
                </div>
            </Container>
        </GrandContainer>
    )
}

export default OrganisationInfo

const GrandContainer = styled.div`

`

const MobContainer = styled.div`
  width: 100vw;
  padding: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;

  img{
    width: calc(100% - 80px);
    margin: 40px;
    border-radius: 5px;
    display: block;
  }

  @media only screen and (min-width: 1099px){
    display: none;
  }
`

const Container = styled.div`
    @media only screen and (max-width: 1099px){
        display: none;
    }

    display: flex;
    justify-content: space-between;
    padding-left: 200px;

    a{
      color: #18489f;
    }

    .cc-middle-content{
      min-height: 100vh;
      width: 100%;
      /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
      padding: 80px 120px 50px 120px;
      position: relative;
      width: 100%;
      max-width: 1360px;
      min-width: 850px;
      margin: auto;
      
      @media only screen and (max-width: 1200px){
        padding: 80px 50px 50px 50px;
      }   


      .main-heading{
          font-size: 1.65rem;
          font-weight: 600;
          color: #292929;
      }

      h3{
        font-weight: 500;
        margin-top: 50px;
      }

      .founder-photo{
        img{
          height: 200px;
          width: 200px;
          border-radius: 50%;
        }
      }


      .heading-supporter{
        font-size: 0.85rem;
        font-weight: 200;
        line-height: 1.5rem;
        letter-spacing: 0.07rem;
        margin-bottom: 10px;

          /* a{
            color: #18489f;
            font-size: 0.95rem;
            font-weight: 300;
            margin-left: 0.25rem;
          } */
      }

      .sub-heading{
        font-size: 1.05rem;
        margin: 50px 0px 2.5px 0px;
        font-weight: 500;
      }

      .message{
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: #d5f7e1;
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 10px 0;

        .text{
            font-size: 0.8rem;
            color: #13803b;
            font-weight: 300;
            
        }
      }
    }
`