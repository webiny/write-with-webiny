/* eslint-disable react/prop-types */
import "./Lux.scss";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

function Lux() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  console.log(title)

// add a query list
  const GET_LUX = gql`
  query ListLuxInput($where: LuxHomesListWhereInput) {
    listLuxHomes(where: $where) {
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
const { data, refetch } = useQuery(GET_LUX, {
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

const luxHomes = data?.listLuxHomes?.data;

  return (
    <Layout>
      <div className="Lux-section">
        <div className="cover-1">
        <div className="name-section">
            <p>Search by name or address:</p>
            <input
              type="text"
              placeholder="Search by name and address"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="name-section">
            <p>Search by name or address:</p>
            <input
              type="text"
              placeholder="Search by name and address"
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
                  onChange={(e) => setMinPrice(e.target.value)}
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
          {luxHomes?.map((luxs) => (
            <div className="cards" key={luxs.id}>
              <img src={luxs.coverImage} alt={luxs.name} />
              <h3>{luxs.name}</h3>
              <p><b>Address: </b> {luxs.address}</p>
              <p><b>Price:</b> ${luxs.price}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Lux;
