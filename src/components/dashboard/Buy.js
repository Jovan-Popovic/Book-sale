/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Link } from "react-router-dom";
import { xChange } from "../../api/apiCalls";
import Moment from "react-moment";
import "moment-timezone";

export const Buy = (props) => {
  const [buy, getBuy] = React.useState([]);

  React.useEffect(() => {
    xChange("/transactions")
      .then((res) => {
        getBuy(res.data.buy);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const removeTransaction = (id) => props.removeTransaction(getBuy, buy, id);

  return (
    <React.Fragment>
      <h2 className="subtitle has-text-centered mb-5">
        See all products that you have purchased
      </h2>
      <div className="box columns is-multiline is-centered mb-5">
        {buy.length ? (
          buy.map((product) =>
            product.buyerConsent ? (
              ""
            ) : (
              <div key={product._id} className="card column is-3 mx-5 my-5">
                <div className="card-image">
                  <figure className="image is-1by1">
                    <img src={product.productId.imageUrl} alt="" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image">
                        <img
                          src={
                            product.seller.profilePictureUrl ||
                            require("../../img/profile.png")
                          }
                          className="is-circle"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{product.productId.name}</p>
                      <p className="subtitle is-6">
                        <Link to={`users/${product.seller.username}`}>
                          @{product.seller.username}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="content">
                    <p>Waiting for sellers response...</p>
                    <p>
                      Bought at:{" "}
                      <Moment date={product.createdAt} format="LLLL" />
                    </p>
                    {product.sellerConsent ? (
                      <button
                        className="button is-success"
                        onClick={() => {
                          props.acceptRequest(product._id);
                          removeTransaction(product._id);
                          props.showNotification(
                            `You've finally purchased ${product.productId.name}, have fun with it :)`,
                            "is-success"
                          );
                        }}
                      >
                        <i className="fas fa-check-circle" />
                        &nbsp; Confirm
                      </button>
                    ) : (
                      <React.Fragment>
                        <Link
                          className="button is-primary mr-3"
                          to={`/products/${product.productId._id}`}
                        >
                          <i className="fas fa-store-alt" /> &nbsp; Check store
                        </Link>
                        <button
                          className="button is-danger"
                          onClick={() => {
                            props.rejectRequest(product._id);
                            removeTransaction(product._id);
                            props.showNotification(
                              `You gave up on ${product.productId.name}, if you want you can try buying it again on the store`,
                              "is-info"
                            );
                          }}
                        >
                          <i className="fas fa-trash-alt" />
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="modal-card-body has-text-centered">
            <p>
              You didn't purchased any product. To find product go to home page
              and find what you want
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
