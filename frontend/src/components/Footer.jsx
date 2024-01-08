import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <footer className="footer bg-dark text-center py-3">
                    <div className="container">
                        <span className="text-white">
                            © 2024 Oktavina Zahra Rahmawati. All rights reserved.
                        </span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
