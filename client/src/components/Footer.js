import React from 'react';

function Foot() {
    return (
    <footer className="bg-dark text-center text-white">
        <div className="container p-4">
            <section className="">
            <form action="">
                <div className="row d-flex justify-content-center">
                <div className="col-auto">
                    <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                    </p>
                </div>
                <div className="col-md-5 col-12">
                    <div className="form-outline form-white mb-4">
                    <input type="email" id="form5Example21" className="form-control" />
                    <label className="form-label" htmlFor="form5Example21">Email address</label>
                    </div>
                </div>
                
                <div className="col-auto">
                    <button type="submit" className="btn btn-outline-light mb-4">
                    Subscribe
                    </button>
                </div>
                </div>
            </form>
            </section>
            <section className="mb-4">
            <p>
                This site was developed by Harsh Kumar
            </p>
            </section>
            <section className="">
            
            
                </section>
        
                </div>
                <div className="text-center p-3 h2t1" >
                    © 2021 Copyright: Harsh Kumar
                </div>

        </footer>
    )
}

export default Foot;