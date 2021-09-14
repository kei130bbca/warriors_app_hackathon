import React from 'react';

function Header(props) {
    return (
        <header>
            <div className="hero is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1>{props.title}</h1>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;