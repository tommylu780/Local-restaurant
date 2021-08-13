import React, { useEffect } from 'react';
import DishItem from './DishItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_DISHES } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_DISHES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import styled from 'styled-components';

function DishList() {
  const [state, dispatch] = useStoreContext();

  const { currentCulture } = state;

  const { loading, data } = useQuery(QUERY_DISHES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_DISHES,
        dishes: data.dishes,
      });
      data.dishes.forEach((dish) => {
        idbPromise('dishes', 'put', dish);
      });
    } else if (!loading) {
      idbPromise('dishes', 'get').then((dishes) => {
        dispatch({
          type: UPDATE_DISHES,
          dishes: dishes,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterDishes() {
    if (!currentCulture) {
      return state.dishes;
    }

    return state.dishes.filter(
      (dish) => dish.culture._id === currentCulture
    );
  }

  return (
    <div className="my-2">
      <h2>Our Dishes:</h2>
      {state.dishes.length ? (
        <div className="flex-row">
          <MenuItemStyled >
          {filterDishes().map((dish) => (
            <DishItem
              key={dish._id}
              _id={dish._id}
              image={dish.image}
              name={dish.name}
              price={dish.price}
              quantity={dish.quantity}
            />
          ))}
          </MenuItemStyled>
        </div>
      ) : (
        <h3>You haven't added any dishes yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

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
        .items-content{
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
                            color: #fff;
                            align-items: center;
                            justify-content: center;
                            transition: all .4s ease-in-out;
                        }
                    }
            }

            .items-image{
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
            .items-image:hover{
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
                            background-color: grey;
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

export default DishList;
