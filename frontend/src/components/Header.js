import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark bg-dark">
                        <div>
                            <a href="/users" className="navbar-brand d-flex align-items-center">
                                <img
                                    src="upilogo.png"
                                    width="30"
                                    height="30"
                                    className="mr-2"
                                    alt="Logo"
                                />
                                <span className="ml-2">Inventaris Barang</span>
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;
