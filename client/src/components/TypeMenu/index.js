import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CULTURES,
  UPDATE_CURRENT_CULTURE,
} from '../../utils/actions';
import { QUERY_CULTURES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';


function TypeMenu() {
  const [state, dispatch] = useStoreContext();

  const { cultures } = state;

  const { loading, data: cultureData } = useQuery(QUERY_CULTURES);

  useEffect(() => {
    if (cultureData) {
      dispatch({
        type: UPDATE_CULTURES,
        cultures: cultureData.cultures,
      });
      cultureData.cultures.forEach((culture) => {
        idbPromise('cultures', 'put', culture);
      });
    } else if (!loading) {
      idbPromise('cultures', 'get').then((cultures) => {
        dispatch({
          type: UPDATE_CULTURES,
          cultures: cultures,
        });
      });
    }
  }, [cultureData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CULTURE,
      currentCulture: id,
    });
}
    return (
    <ShopContainer>
        <ShopH2>Choose Restaurant:</ShopH2>
        <ButtonContainer>
        {cultures.map((item) => (
                <ShopBtn key={item._id}
                         onClick={() => {
                         handleClick(item._id);}}
                  >
                      {item.name}
                </ShopBtn>
        ))}
        </ButtonContainer>
    </ShopContainer>
    );
}

const ShopContainer = styled.div`
    height: 15vh;
    padding: 5rem;
    @media only screen and (max-width: 768px){
        height: 25vh;
    }
    @media only screen and (max-width: 485px){
        height: 35vh;
    }
`;

const ShopH2 = styled.div`
    display: flex;
    margin-left: 150px;
    width: 500px;
    font-size: clamp(0.5rem, 5vw, 3rem);
    margin-bottom: 1rem;
    box-shadow: 0 4px 2px -2px #e9ba23;
    letter-spacing: 3px;

    @media only screen and (max-width: 680px) {
        margin-left: -15px;
        width: 340px;
      }

    @media only screen and (max-width: 425px) {
        margin-left: -15px;
        width: 250px;
      }
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
    width: 80%;
    margin: 2.4rem auto;
`;

export default TypeMenu;