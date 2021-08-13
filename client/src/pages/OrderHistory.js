import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import styled from 'styled-components';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <OContainer>
      <div className="container my-1">
        <Link to="/shop">← Back to Dishes</Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <ItemContainer>
                  {order.dishes.map(({ _id, image, name, price }, index) => (
                    <Item key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/foods/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </Item>
                  ))}
                </ItemContainer>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </OContainer>
  );
}

const OContainer = styled.div`  
  padding: 5rem;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;

  @media screen and (max-width:920px){
      grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width:670px){
      grid-template-columns: repeat(1, 1fr);
  }
`;

const Item =  styled.div`
  display: block;
  position: relative;
  overflow: hidden;

  img{
    width: 100%;
    height: 30vh;
    object-fit: cover;
}
`;
export default OrderHistory;
