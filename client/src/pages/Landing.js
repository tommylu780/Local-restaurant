import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import ImgH from '../images/hero.jpg';

const Landing = () => {
    return (
        <HeroContainer>
            <Navbar />
            <HeroContent>
                <HeroItems>
                    <HeroH1>This is a test</HeroH1>
                    <HeroP>Come to our shop</HeroP>
                    <HeroBtn>Order now</HeroBtn>
                </HeroItems>
            </HeroContent>
        </HeroContainer>
    )
}

const HeroContainer = styled.div`
    background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)),
    url(${ImgH});
    height: 100vh;
    background-position: center;
    background-size: cover;
`;
const HeroContent = styled.div`
    height: calc(100vh -80px);
    max-height: 100%;
    width: 100vw;
    padding: 0rem calc((100vw - 1330px)/2);
`;
const HeroItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    max-height: 100%;
    padding: 0 2rem;
    width: 650px;
    color: #fff;
    text-transform: uppercase;
    line-height: 1;
    font-weight: 1;
    font-weight: bold;

    @media screen and (max-width: 650px){
        width: 100%;
    }
`;

const HeroH1 = styled.div`
    font-size: clamp(2.5rem, 10vw, 5rem);
    margin-bottom: 1rem;
    box-shadow: 3px 5px #e9ba23;
    letter-spacing: 3px;
`;

const HeroP = styled.div`
    font-size: clamp(2rem, 2.5vw, 3rem);
    margin-bottom: 2rem;
`;

const HeroBtn = styled.div`
    font-size: 1.4rem;
    padding: 1rem 4rem;
    border: none;
    background: #e31837;
    color: #fff;
    transition: 0.2 ease-out;

    &:hover {
        background: #ffc500;
        transition: 0.2s ease-out;
        cursor: pointer;
        color: #000;
    }
`;


export default Landing

