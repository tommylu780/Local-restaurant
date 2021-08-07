import React from 'react'
import styled from 'styled-components'
import css from '../../images/cv_css.png'

const TypeMenu = () => {
    return (
    <ShopContainer>
        <ShopH2>Choose a type:</ShopH2>
        <ButtonContainer>
        <ShopBtn>Asian</ShopBtn>
        </ButtonContainer>
        <MenuItemStyled >
        <div className="grid-item">
                        <div className="portfolio-content">
                            <div className="portfolio-image">
                                <img src={css} alt=""/>
                                <ul>
                                    <li>
                                        <a href='#'>
                                            Github
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            FB
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <h6>Test</h6>
                            <p>Test 1</p>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="portfolio-content">
                            <div className="portfolio-image">
                                <img src={css} alt=""/>
                                <ul>
                                    <li>
                                        <a href='#'>
                                            Github
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#'>
                                            FB
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <h6>Co Do Restaurant</h6>
                            <p>Test 1</p>
                        </div>
                    </div>
        </MenuItemStyled>
    </ShopContainer>
    )
}

const ShopContainer = styled.div`
    height: 100vh;
    padding: 5rem;
`;

const ShopH2 = styled.div`
    display: flex;
    margin-left: 150px;
    width: 380px;
    font-size: clamp(0.5rem, 5vw, 3rem);
    margin-bottom: 1rem;
    box-shadow: 0 4px 2px -2px #e9ba23;
    letter-spacing: 3px;

`;
const ShopBtn = styled.div`
    outline: none;
    border: none;
    background-color: #e31837;
    padding: .4rem 2rem;
    font-size: inherit;
    color: #fff;
    cursor: pointer;
    transition: all .4s ease-in-out;
    margin-bottom: .6rem;
    border-radius: 1rem;

    &:hover {
        background: #ffc500;
        transition: 0.2s ease-out;
        cursor: pointer;
        color: #000;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 70%;
    margin: 2.4rem auto;
`;

const MenuItemStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    @media screen and (max-width:920px){
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width:670px){
        grid-template-columns: repeat(1, 1fr);
    }
    .grid-item{
        .portfolio-content{
            display: block;
            position: relative;
            overflow: hidden;
            h6{
                font-size: 1.3rem;
                margin: 0 0 5px 0;
            }
            p{
                font-size: 1rem;
                margin: 0 0 5px 0;
            }
            img{
                width: 100%;
                height: 30vh;
                object-fit: cover;
            }
            ul{
                transform: translateY(-600px);
                transition: all .4s ease-in-out;
                position: absolute;
                left: 50%;
                top: 40%;
                opacity: 0;
                li{
                        background-color: #2e344e;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 1rem;
                        border-radius: 50%;
                        width: 3rem;
                        height: 3rem;
                        margin: 0 .5rem;
                        transition: all .4s ease-in-out;
                        &:hover{
                            background-color: #007bff;
                        }
                        a{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all .4s ease-in-out;
                        }
                    }
            }

            .portfolio-image{
                &::before{
                    content: "";
                    position: absolute;
                    left: 2%;
                    top: 4%;
                    height: 0;
                    width: 0;
                    transition: all .4s ease-in-out;
                }
            }
            .portfolio-image:hover{
                ul{
                    transform: translateY(0);
                    transform: translate(-50%, -50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all .4s ease-in-out;
                    opacity: 1;
                    li{
                        transition: all .4s ease-in-out;
                        &:hover{
                            background-color: #007bff;
                        }
                        a{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all .4s ease-in-out;
                        }
                    }

                    li:hover{
                        svg{
                            color: #fff;
                        }
                    }
                    svg{
                        font-size: 2rem;
                    }
                }
                &::before{
                    height: calc(100% - 30%) ;
                    width: calc(100% - 4%);
                    background-color: white;
                    opacity: 0.9;
                    transform-origin: left;
                    
                    transition: all .4s ease-in-out;
                }
            }
        }
    }
`;

export default TypeMenu
