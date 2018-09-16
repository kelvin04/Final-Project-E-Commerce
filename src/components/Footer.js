import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import facebookIcon from '../images/facebook.png';
import '../supports/css/components/footer-distributeds.css';

class Footer extends Component {
    render() { 
        return ( 
            <footer class="footer-distributed" style={{ paddingBottom:"0px"}}>
				<div class="footer-left">
					<h3>ONE <span>Tech</span></h3>
					<p class="footer-links">
					<Link to="/">Home</Link>
						·
						<a href="#">Blog</a>
						·
						<a href="#">Pricing</a>
						·
						<a href="#">About</a>
						·
						<a href="#">Faq</a>
						·
						<a href="#">Contact</a>
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
						ONE Tech is the leading e-commerce for elecetronic products which is providing customers with an easy, secure and fast online shopping experience through strong payment and logistical support. 

					</p>

					<div class="footer-icons">
						<a href="#"><i class="fa fa-facebook"><img src={facebookIcon} id="social-media-icon"/></i></a>
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