import React from "react";

export class Header extends React.Component {
    render(){
        return(
        <div className="container">
            <div className="header">
                <header>
                    <h1>HieroScript</h1>
                    <p>version 0.01</p>
                    {/* we'll probably put more stuff in here soon */}
                </header>
            </div>
        </div>        
        );   
    }
}