import React from "react";
import { products, users } from "../../api/apiCalls";

export class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], users: [] };
  }

  componentDidMount = () => {
    products().then((res) =>
      this.setState({ products: res.data.slice(0, 10) })
    );
    users().then((res) => this.setState({ users: res.data }));
  };

  render() {
    return (
      <div className="columns is-multiline">
        {this.state.products.map((prod, index) => (
          <div key={index} className="card column is-3">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={`${prod.url}`} alt="" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={`${prod.url}`} alt="" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{this.state.users[index].name}</p>
                  <p className="subtitle is-6">
                    {this.state.users[index].email}
                  </p>
                </div>
              </div>
              <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. {/* <a href>@bulmaio</a>.
                <a href>#css</a> <a href>#responsive</a> */}
                <br />
                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}