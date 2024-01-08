import React, { Component } from "react";
import InventoryService from "../services/InventoryService";
import Swal from 'sweetalert2';

class CreateInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama_barang: "",
      jumlah: 0,
      harga_satuan: '',
      lokasi: "Bandung",
      deskripsi: "",
    };

    this.changeNamaBarang = this.changeNamaBarang.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeHargaSatuan = this.changeHargaSatuan.bind(this);
    this.changeLokasi = this.changeLokasi.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdateItem = this.saveOrUpdateItem.bind(this);
  }

  componentDidMount() {
    if (this.state.id !== "_add") {
      InventoryService.getInventoryById(this.state.id).then((res) => {
        let item = res.data;
        this.setState({
          nama_barang: item.nama_barang,
          jumlah: item.jumlah,
          harga_satuan: item.harga_satuan,
          lokasi: item.lokasi,
          deskripsi: item.deskripsi,
        });
      });
    }
  }

  saveOrUpdateItem = (e) => {
    e.preventDefault();
    let item = {
      nama_barang: this.state.nama_barang,
      jumlah: this.state.jumlah,
      harga_satuan: this.state.harga_satuan,
      lokasi: this.state.lokasi,
      deskripsi: this.state.deskripsi,
    };

    if (this.state.id === "_add") {
      InventoryService.createInventory(item).then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Data added successfully!',
        });
        this.props.history.push("/");
      });
    } else {
      InventoryService.updateInventory(item, this.state.id).then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Data updated successfully!',
        });
        this.props.history.push("/");
      });
    }
  };

  changeNamaBarang = (event) => {
    this.setState({ nama_barang: event.target.value });
  };

  changeJumlah = (event) => {
    this.setState({ jumlah: parseInt(event.target.value) });
  };

  changeHargaSatuan = (event) => {
    this.setState({ harga_satuan: parseInt(event.target.value) });
  };

  changeLokasi = (event) => {
    this.setState({ lokasi: event.target.value });
  };

  changeDeskripsi = (event) => {
    this.setState({ deskripsi: event.target.value });
  };

  cancel() {
    this.props.history.push("/");
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h3 className="text-center mt-4">Add Inventory Item</h3>
    ) : (
      <h3 className="text-center mt-4">Update Inventory Item</h3>
    );
  }

  render() {
    return (
      <div>
        <br />
        <div className="container mt-4">
          <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 bg-light">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nama Barang: </label>
                    <input
                      placeholder="Nama Barang"
                      name="nama_barang"
                      className="form-control"
                      value={this.state.nama_barang}
                      onChange={this.changeNamaBarang}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jumlah: </label>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        type="button"
                        onClick={() => this.setState({ jumlah: Math.max(0, this.state.jumlah - 1) })}
                      >
                        <span aria-hidden="true">-</span>
                      </button>
                      <input
                        // type="number"
                        placeholder="Jumlah"
                        name="jumlah"
                        className="form-control form-control-sm text-center"
                        style={{ width: '50px' }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={this.state.jumlah}
                        onChange={this.changeJumlah}
                      />
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        type="button"
                        onClick={() => this.setState({ jumlah: this.state.jumlah + 1 })}
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Harga Satuan: </label>
                    <input
                      type="number"
                      placeholder="Harga Satuan"
                      name="harga_satuan"
                      className="form-control"
                      value={this.state.harga_satuan}
                      onChange={this.changeHargaSatuan}
                    />
                  </div>
                  <div className="form-group">
                    <label> Lokasi: </label>
                    <select
                      name="lokasi"
                      className="form-control"
                      value={this.state.lokasi}
                      onChange={this.changeLokasi}
                    >
                      <option value="Bandung">Bandung</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Denpasar">Denpasar</option>
                      <option value="Manokwari">Manokwari</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Deskripsi: </label>
                    <textarea
                      placeholder="Deskripsi"
                      name="deskripsi"
                      className="form-control"
                      value={this.state.deskripsi}
                      onChange={this.changeDeskripsi}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateItem}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateInventory;
