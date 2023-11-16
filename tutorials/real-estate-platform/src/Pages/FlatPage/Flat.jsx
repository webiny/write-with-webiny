/* eslint-disable react/prop-types */
import "./Flat.scss";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

function Flat() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  // add a query list
  const GET_HOMES = gql`
    query ListFlatsInput($where: FlatsListWhereInput) {
      listFlats(where: $where) {
        data {
          coverImage
          name
          address
          price
        }
      }
    }
  `;

  // step3: Add instances for the data
  const { data, refetch } = useQuery(GET_HOMES, {
    variables: {
      where: {
        OR: [
          { name_contains: title },
          { address_contains: address },
          { AND: [{ price_gte: minPrice }, { price_lte: maxPrice }] },
        ],
      },
    },
  });

  useEffect(() => {
    if (address || title || (minPrice && maxPrice)) {
      refetch({
        where: {
          OR: [
            { name_contains: title ? title : null },
            { address_contains: address ? address : null },
            { AND: [{ price_gte: minPrice }, { price_lte: maxPrice }] },
          ],
        },
      });
    }
  }, [title, address, maxPrice, minPrice, refetch]);

  const flats = data?.listFlats?.data;

  return (
    <Layout>
      <div className="Flat-section">
        <div className="cover-1">
          <div className="name-section">
            <p>Search by name:</p>
            <input
              type="text"
              placeholder="Search by name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="name-section">
            <p>Search by address:</p>
            <input
              type="text"
              placeholder="Search by name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="price-section">
            <p>Search with price range:</p>
            <div className="price-input">
              <div>
                Min{" "}
                <input
                  type="number"
                  placeholder="price"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                Max{" "}
                <input
                  type="number"
                  placeholder="price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="cover-2">
          {flats?.map((flat) => (
            <div className="cards" key={flat.id}>
              <img src={flat.coverImage} alt={flat.name} />
              <h3>{flat.name}</h3>
              <p>Address: {flat.address}</p>
              <p>Price: ${flat.price}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Flat;

