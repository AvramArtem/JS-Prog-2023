import React from "react";
import ReactDOM from "react-dom";

import "./style.css"

function Site(){
    return(
        <>
            <div className="heading">
                Your Logo
            </div>

            <div className="sign-up">
                Sign up for a chance to win a $50 voucher
            </div>

            <div className="refreshing">
                <h1>Refreshing Summer menu is here!</h1>
                <p>Check out our Spring menu with new weekly specials and fresh, seasonal produce.</p>
                <button>Get our Menu</button>
            </div>

            <div className="menu-sunday">
                <div className="block">
                    <h1>NEW MENU</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quaerat laboriosam incidunt reiciendis odit cum nostrum. A, aperiam? Delectus, nostrum soluta. Suscipit distinctio, voluptates sint a dolores numquam perferendis nihil.</p>
                    <button>Go To Order</button>
                </div>
                <div className="block">
                    <h1>Healthy Sunday</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed quaerat laboriosam incidunt reiciendis odit cum nostrum. A, aperiam? Delectus, nostrum soluta. Suscipit distinctio, voluptates sint a dolores numquam perferendis nihil.</p>
                    <button>Book a Table</button>
                </div>
            </div>

            <div className="footer">
                <h1>For more details</h1>
                <p>Contact: +44 00 000 000</p>
                <p>Email ID: test@gmail.com</p>
            </div>
        </>
        
    )
}

ReactDOM.render( <Site />, document.querySelector("#root"))