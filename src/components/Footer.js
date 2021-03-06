import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../supports/css/components/footer-distributeds.css';

class Footer extends Component {
    render() { 
        return ( 
            <footer class="footer-distributed" style={{ marginTop: "0" }}>
				<div class="footer-left">
					<h3>ONE <span>Tech</span></h3>
					<p class="footer-links">
						<Link to="/">Home</Link>
						 · 
						<Link to={`/allproductpage?search=`}>Product List</Link>
						·
						<Link to="/">Pricing</Link>
						.
						<Link to="/">Contact</Link>
					</p>
					<p class="footer-company-name">ONE Tech &copy; 2018</p>
				</div>

				<div class="footer-center">
					<div>
						<i class="fa fa-map-marker"></i>
						<p><span>Bumi Serpong Damai (BSD City)</span> Tangerang, Banten</p>
					</div>

					<div>
						<i class="fa fa-phone"></i>
						<p>(021) 123456789</p>
					</div>

					<div>
						<i class="fa fa-envelope"></i>
						<p><a href="mailto:support@company.com">one.tech@gmail.com</a></p>
					</div>
				</div>

				<div class="footer-right">
					<p class="footer-company-about">
						<span>About the company</span>
						ONE Tech is the leading e-commerce for elecetronic products which is providing customers with an easy, secure and fast online shopping experience. 

					</p>

					<div class="footer-icons">
						<a href="#"><i class="fa fa-facebook"></i></a>
						<a href="#"><i class="fa fa-twitter"></i></a>
						<a href="#"><i class="fa fa-linkedin"></i></a>
						<a href="#"><i class="fa fa-github"></i></a>
					</div>
				</div>
			</footer>
        );
    }
}
 
export default Footer;