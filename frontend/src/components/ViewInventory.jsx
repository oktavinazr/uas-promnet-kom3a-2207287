import React, { Component } from "react";
import InventoryService from "../services/InventoryService";
import { Link } from "react-router-dom";

class ViewInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      item: {},
    };
  }

  componentDidMount() {
    InventoryService.getInventoryById(this.state.id).then((res) => {
      this.setState({ item: res.data });
    });
  }

  render() {
    const { item } = this.state;

    return (
      <div className="container mt-5">
        <div className="card mx-auto" style={{ width: '50%' }}>
          <h3 className="card-header text-center bg-dark text-white">View Inventory Details</h3>
          <div className="card-body bg-light">
            <table className="table table-bordered bg-white">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{item.id}</td>
                </tr>
                <tr>
                  <th>Nama Barang</th>
                  <td>{item.nama_barang}</td>
                </tr>
                <tr>
                  <th>Jumlah</th>
                  <td>{item.jumlah}</td>
                </tr>
                <tr>
                  <th>Harga Satuan</th>
                  <td>{item.harga_satuan}</td>
                </tr>
                <tr>
                  <th>Lokasi</th>
                  <td>{item.lokasi}</td>
                </tr>
                <tr>
                  <th>Deskripsi</th>
                  <td>{item.deskripsi}</td>
                </tr>
              </tbody>
            </table>
            <Link to="/" className="btn btn-dark">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewInventory;
