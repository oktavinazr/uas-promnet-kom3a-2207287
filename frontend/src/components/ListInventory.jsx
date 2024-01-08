import React, { Component } from 'react';
import InventoryService from '../services/InventoryService';
import Swal from 'sweetalert2';

const MySwal = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success mx-1',
    cancelButton: 'btn btn-danger mx-1',
  },
  buttonsStyling: false,
});

class ListInventory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            searchQuery: '',
            filteredItems: [],
        };

        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(id) {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                InventoryService.deleteInventory(id)
                    .then(() => {
                        this.setState(prevState => ({
                            items: prevState.items.filter(item => item.id !== id),
                            filteredItems: prevState.filteredItems.filter(item => item.id !== id)
                        }));
                        MySwal.fire(
                            'Deleted!',
                            'Your item has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error("Error deleting item:", error);
                        MySwal.fire(
                            'Error!',
                            'There was an error deleting the item.',
                            'error'
                        );
                    });
            }
        });
    }
    
    viewItem(id) {
        this.props.history.push(`/view/${id}`);
    }

    editItem(id) {
        this.props.history.push(`/${id}`);
    }

    componentDidMount() {
        InventoryService.getInventories()
            .then(res => {
                if (!res.data) {
                    this.props.history.push('/');
                }
                const items = res.data || [];
                this.setState({ items, filteredItems: items });
            })
            .catch(error => {
                console.error("Error fetching inventories:", error);
            });
    }

    addItem() {
        this.props.history.push('/add/_add');
    }

    handleSearchChange = (event) => {
        const searchQuery = event.target.value;
        const { items } = this.state;

        const filteredItems = items.filter(item =>
            item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
        );

        this.setState({
            searchQuery,
            filteredItems,
        });
    };


    render() {
        let index = 1;
        const { searchQuery, filteredItems } = this.state;
        
        return (
            <div className="mt-4">
                <h2 className="text-center mb-4">Tabel Inventaris Barang</h2>
                <div className="row">
                    <button className="btn btn-dark"
                        onClick={this.addItem}>Tambah Data</button>
                    <input
                        type="text"
                        placeholder="Cari Nama Barang"
                        value={this.state.searchQuery}
                        onChange={this.handleSearchChange}
                        className="ml-2"
                    />
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>No</th>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                                <th>Harga Satuan</th>
                                <th>Lokasi</th>
                                <th>Deskripsi</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredItems.map(item =>
                                    <tr key={item.id}>
                                        <td>{index++}</td>
                                        <td>{item.nama_barang}</td>
                                        <td>{item.jumlah}</td>
                                        <td>{item.harga_satuan}</td>
                                        <td>{item.lokasi}</td>
                                        <td>{item.deskripsi}</td>
                                        <td>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    onClick={() => this.viewItem(item.id)}
                                                    className="btn btn-info mx-1" > View
                                                </button>
                                                <button
                                                    onClick={() => this.editItem(item.id)}
                                                    className="btn btn-warning mx-1" > Update
                                                </button>
                                                <button
                                                    onClick={() => this.deleteItem(item.id)}
                                                    className="btn btn-danger mx-1" > Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListInventory;